// ZED Champions Tracker
console.log("ZED Champions Tracker loading...", new Date().toISOString());

// ------------- Global State -------------
window.horses = JSON.parse(localStorage.getItem('horses') || '[]');
window.races = JSON.parse(localStorage.getItem('races') || '[]');
window.breedingHorses = JSON.parse(localStorage.getItem('breedingHorses') || '[]');
window.transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

// ------------- Tab Navigation -------------
function activateTab(tabId) {
  console.log("Activating tab:", tabId);
  
  // Update button states
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
  
  // Update content visibility
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-content-${tabId}`);
  });
  
  // Store active tab
  localStorage.setItem('activeTab', tabId);
}

// ------------- API Authentication -------------
class ZedAuthManager {
  constructor() {
    this.tokenKey = 'zedAuthToken';
  }
  
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
  
  setToken(token) {
    if (!token) return false;
    
    // Clean token if it starts with "Bearer "
    if (token.startsWith('Bearer ')) {
      token = token.substring(7).trim();
    }
    
    localStorage.setItem(this.tokenKey, token);
    return true;
  }
  
  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }
}

// ------------- API Service -------------
class ZedApiService {
  constructor(authManager) {
    this.authManager = authManager;
    
    // Dynamic API base URL - make sure the path matches our serverless function
    const host = window.location.hostname;
    const isDev = host === 'localhost' || host === '127.0.0.1';
    this.apiBase = '/api/zed'; // Works in both dev and prod
    
    console.log(`ZED API initialized with base URL: ${this.apiBase}`);
  }
  
  async fetchFromApi(endpoint, method = 'GET', data = null) {
    if (!endpoint.startsWith('/')) endpoint = '/' + endpoint;
    
    const url = `${this.apiBase}${endpoint}`;
    console.log(`API Request: ${method} ${url}`);
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    
    // Add authentication if available
    const token = this.authManager.getToken();
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Add body data for non-GET requests
    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }
    
    // Make the request with retries and better error handling
    let lastError = null;
    const maxRetries = 2;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`API attempt ${attempt}/${maxRetries}: ${url}`);
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
          let errorMessage = `HTTP error: ${response.status}`;
          let errorData = null;
          
          try {
            // Try to get more details from the error response
            errorData = await response.json();
            if (errorData && errorData.error) {
              errorMessage = `API error: ${errorData.error}`;
              
              // Check for DNS-specific errors
              if (errorData.error.includes('DNS') || 
                  errorData.error.includes('getaddrinfo') || 
                  errorData.error.includes('ENOTFOUND') ||
                  errorData.diagnostic) {
                
                console.warn('DNS failure detected:', errorData);
                
                // Show user-friendly DNS error message
                if (attempt === maxRetries) {
                  throw new Error(`🌐 Connection Issue: Unable to reach ZED Champions API. This appears to be a temporary DNS issue on Vercel's end. Please try again in a few minutes, or check if ZED Champions API is accessible from your location.`);
                }
                
                // Wait before retry
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
                continue;
              }
            }
          } catch (e) {
            // If parsing fails, use the response text
            try {
              errorMessage = await response.text();
            } catch (textError) {
              // Fallback to status
              errorMessage = `HTTP error: ${response.status}`;
            }
          }
          
          if (attempt === maxRetries) {
            throw new Error(errorMessage);
          }
          continue;
        }
        
        // Get response as text first
        const text = await response.text();
        
        // Try to parse as JSON
        try {
          return text ? JSON.parse(text) : {};
        } catch (e) {
          console.error("Error parsing JSON:", e);
          throw new Error(`Invalid JSON response: ${text.substring(0, 100)}...`);
        }
        
      } catch (error) {
        lastError = error;
        
        // Check for network-level DNS errors
        if (error.message.includes('Failed to fetch') || 
            error.message.includes('NetworkError') ||
            error.message.includes('ERR_NAME_NOT_RESOLVED')) {
          
          console.warn(`Network error on attempt ${attempt}:`, error.message);
          
          if (attempt === maxRetries) {
            throw new Error(`🌐 Network Issue: Cannot connect to the API. This might be a temporary DNS or network problem. Please check your internet connection and try again.`);
          }
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          continue;
        }
        
        // For other errors, don't retry
        break;
      }
    }
    
    console.error(`API request failed after ${maxRetries} attempts: ${endpoint}`, lastError);
    throw lastError;
  }
  
  async testConnection() {
    try {
      if (!this.authManager.getToken()) {
        return { success: false, message: "No API token set. Please set your token first." };
      }
      
      const data = await this.fetchFromApi('/me');
      return {
        success: true,
        message: `Connected successfully. Welcome, ${data.username || 'racer'}!`,
        data
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  
  async fetchHorse(horseId) {
    try {
      // Extract just the ID if a full URL or other format is provided
      let cleanId = horseId;
      
      // Check if it's a URL or has the URL embedded
      if (typeof horseId === 'string') {
        // Case: Full URL like https://app.zedchampions.com/horse/96b9b9c8-45a5-4cf7-bb9f-3812e6bf59ad
        if (horseId.includes('app.zedchampions.com/horse/')) {
          const parts = horseId.split('horse/');
          cleanId = parts[parts.length - 1].split('/')[0].trim();
        } 
        // Case: Just an ID - leave as is
      }
      
      console.log(`Original horse ID: ${horseId}`);
      console.log(`Cleaned horse ID: ${cleanId}`);
      
      const data = await this.fetchFromApi(`/horses/${cleanId}`);
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  
  async fetchAllHorses(type = 'racing') {
    try {
      // We use a different endpoint based on the type
      const endpoint = type === 'racing' ? '/stable/racing' : '/stable/breeding';
      const data = await this.fetchFromApi(endpoint);
      return { success: true, data: data.horses || [] };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  
  async fetchHorseRaces(horseId) {
    try {
      // Clean the horse ID
      let cleanId = cleanHorseId(horseId);
      
      // First get the horse details
      const horseData = await this.fetchFromApi(`/horses/${cleanId}`);
      
      // Then fetch race history
      const raceData = await this.fetchFromApi(`/horses/${cleanId}/races`);
      
      // Process and enhance the race data
      const races = raceData.races || [];
      
      // Calculate additional metrics like ZedSight does
      let balance = 0;
      let mmPoints = 0;
      
      const processedRaces = races.map(race => {
        // Calculate balance changes
        const startBalance = balance;
        const prize = parseFloat(race.prize || 0);
        const position = parseInt(race.position);
        
        // Update balance based on position and prize
        if (position === 1) balance += prize;
        else if (position === 2) balance += prize * 0.3;
        else if (position === 3) balance += prize * 0.1;
        
        // Track MM points changes
        const startPoints = mmPoints;
        mmPoints = parseInt(race.mm_points_after || mmPoints);
        const pointsDelta = mmPoints - startPoints;
        
        return {
          ...race,
          starting_balance: startBalance,
          ending_balance: balance,
          balance_change: balance - startBalance,
          starting_points: startPoints,
          points_delta: pointsDelta,
          ending_points: mmPoints
        };
      });
      
      return {
        success: true,
        horse: horseData,
        races: processedRaces
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

// ------------- Utility Functions -------------
function showStatus(element, message, isSuccess = null) {
  if (!element) return;
  
  element.style.display = 'block';
  element.innerHTML = message;
  
  if (isSuccess === true) {
    element.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
    element.style.color = '#4CAF50';
  } else if (isSuccess === false) {
    element.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
    element.style.color = '#F44336';
  } else {
    element.style.backgroundColor = 'rgba(33, 150, 243, 0.2)';
    element.style.color = '#2196F3';
  }
  
  element.style.padding = '10px';
  element.style.borderRadius = '4px';
  element.style.marginTop = '10px';
}

/**
 * Displays import status messages with appropriate styling
 */
function showImportStatus(element, message, isSuccess = null) {
  if (!element) return;
  
  element.style.display = 'block';
  element.innerHTML = message;
  
  if (isSuccess === true) {
    element.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
    element.style.color = '#4CAF50';
    element.style.padding = '10px 15px';
    element.style.borderRadius = '4px';
    element.style.marginTop = '10px';
  } else if (isSuccess === false) {
    element.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
    element.style.color = '#F44336';
    element.style.padding = '10px 15px';
    element.style.borderRadius = '4px';
    element.style.marginTop = '10px';
  } else {
    element.style.backgroundColor = 'rgba(33, 150, 243, 0.2)';
    element.style.color = '#2196F3';
    element.style.padding = '10px 15px';
    element.style.borderRadius = '4px';
    element.style.marginTop = '10px';
  }
}

function saveData() {
  localStorage.setItem('horses', JSON.stringify(window.horses || []));
  localStorage.setItem('races', JSON.stringify(window.races || []));
  localStorage.setItem('breedingHorses', JSON.stringify(window.breedingHorses || []));
  localStorage.setItem('transactions', JSON.stringify(window.transactions || []));
  console.log("Data saved to localStorage");
}

// Horse ID helper function - Update this function in your app.js
function cleanHorseId(input) {
  if (!input) return '';
  
  // Case 1: Full URL pattern
  if (typeof input === 'string' && input.includes('horse/')) {
    const parts = input.split('horse/');
    if (parts.length > 1) {
      // Extract the ID from the last part, handling any trailing slashes or params
      return parts[parts.length - 1].split(/[\/\?#]/)[0].trim();
    }
  }
  
  // Case 2: Just the ID - but ensure it's a valid format
  // A ZED horse ID is typically a UUID
  const idPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const trimmedInput = input.trim();
  if (idPattern.test(trimmedInput)) {
    return trimmedInput;
  }
  
  // If we're here, it's not a recognized format
  // Just return the trimmed input and let the API handle errors
  return trimmedInput;
}

// ------------- Initialize Services -------------
const zedAuth = new ZedAuthManager();
const zedApi = new ZedApiService(zedAuth);

// ------------- Setup Event Handlers -------------
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded, initializing app...");
  
  // Setup tab navigation
  const tabButtons = document.querySelectorAll('[data-tab]');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      activateTab(tabId);
    });
  });
  
  // Activate last used tab or default
  const savedTab = localStorage.getItem('activeTab') || 'stable';
  activateTab(savedTab);
  
  // Setup API authentication form
  const saveTokenBtn = document.getElementById('save-api-token-btn');
  if (saveTokenBtn) {
    saveTokenBtn.addEventListener('click', function() {
      const tokenInput = document.getElementById('zed-api-token');
      const token = tokenInput?.value.trim();
      
      if (token) {
        if (zedAuth.setToken(token)) {
          showStatus(
            document.getElementById('test-api-connection-status'),
            'Token saved successfully! Please test your connection.',
            true
          );
        } else {
          showStatus(
            document.getElementById('test-api-connection-status'),
            'Failed to save token.',
            false
          );
        }
      } else {
        showStatus(
          document.getElementById('test-api-connection-status'),
          'Please enter a valid API token.',
          false
        );
      }
    });
  }
  
  // Setup test connection button
  const testConnectionBtn = document.getElementById('test-api-connection-btn');
  if (testConnectionBtn) {
    testConnectionBtn.addEventListener('click', async function() {
      const statusEl = document.getElementById('test-api-connection-status');
      showStatus(statusEl, 'Testing connection...', null);
      
      try {
        const result = await zedApi.testConnection();
        showStatus(statusEl, result.message, result.success);
      } catch (error) {
        showStatus(statusEl, `Connection error: ${error.message}`, false);
      }
    });
  }
  
  // Setup import racing stable button
  const importRacingBtn = document.getElementById('import-racing-stable-btn');
  if (importRacingBtn) {
    importRacingBtn.addEventListener('click', async function() {
      const statusEl = document.getElementById('import-status');
      
      if (!zedAuth.getToken()) {
        showStatus(statusEl, 'Please set your API token first.', false);
        return;
      }
      
      showStatus(statusEl, 'Importing racing horses... Please wait.', null);
      
      try {
        const result = await zedApi.fetchAllHorses('racing');
        
        if (result.success) {
          // Process the imported horses
          const horses = result.data;
          if (horses.length === 0) {
            showStatus(statusEl, 'No racing horses found in your stable.', false);
            return;
          }
          
          let newHorses = 0;
          let updatedHorses = 0;
          
          horses.forEach(horse => {
            // Check if we already have this horse
            const existingIndex = window.horses.findIndex(h => h.zedId === horse.id);
            
            // Prepare horse data
            const horseData = {
              name: horse.name,
              bloodline: horse.bloodline,
              gender: horse.gender,
              color: horse.color || '#CCCCCC',
              stars: horse.overall_rating || 0,
              zedId: horse.id,
              importDate: new Date().toISOString()
            };
            
            // Add or update the horse
            if (existingIndex >= 0) {
              // Update existing horse
              window.horses[existingIndex] = {
                ...window.horses[existingIndex],
                ...horseData
              };
              updatedHorses++;
            } else {
              // Add new horse
              window.horses.push({
                id: crypto.randomUUID(), // Generate a unique local ID
                ...horseData
              });
              newHorses++;
            }
          });
          
          // Save the updated data
          saveData();
          
          // Show success message
          showStatus(
            statusEl,
            `Successfully imported ${horses.length} racing horses! (${newHorses} new, ${updatedHorses} updated)`,
            true
          );
          
          // Switch to racing tab
          activateTab('racing');
        } else {
          showStatus(statusEl, `Import failed: ${result.message}`, false);
        }
      } catch (error) {
        showStatus(statusEl, `Import error: ${error.message}`, false);
      }
    });
  }
  
  // Setup import breeding stable button
  const importBreedingBtn = document.getElementById('import-breeding-stable-btn');
  if (importBreedingBtn) {
    importBreedingBtn.addEventListener('click', async function() {
      const statusEl = document.getElementById('import-status');
      
      if (!zedAuth.getToken()) {
        showStatus(statusEl, 'Please set your API token first.', false);
        return;
      }
      
      showStatus(statusEl, 'Importing breeding horses... Please wait.', null);
      
      try {
        const result = await zedApi.fetchAllHorses('breeding');
        
        if (result.success) {
          // Process the imported horses
          const horses = result.data;
          if (horses.length === 0) {
            showStatus(statusEl, 'No breeding horses found in your stable.', false);
            return;
          }
          
          let newHorses = 0;
          let updatedHorses = 0;
          
          horses.forEach(horse => {
            // Check if we already have this horse
            const existingIndex = window.breedingHorses.findIndex(h => h.zedId === horse.id);
            
            // Prepare horse data
            const horseData = {
              name: horse.name,
              bloodline: horse.bloodline,
              gender: horse.gender,
              color: horse.color || '#CCCCCC',
              stars: horse.overall_rating || 0,
              zedId: horse.id,
              importDate: new Date().toISOString()
            };
            
            // Add or update the horse
            if (existingIndex >= 0) {
              // Update existing horse
              window.breedingHorses[existingIndex] = {
                ...window.breedingHorses[existingIndex],
                ...horseData
              };
              updatedHorses++;
            } else {
              // Add new horse
              window.breedingHorses.push({
                id: crypto.randomUUID(), // Generate a unique local ID
                ...horseData
              });
              newHorses++;
            }
          });
          
          // Save the updated data
          saveData();
          
          // Show success message
          showStatus(
            statusEl,
            `Successfully imported ${horses.length} breeding horses! (${newHorses} new, ${updatedHorses} updated)`,
            true
          );
          
          // Switch to breeding tab
          activateTab('breeding');
        } else {
          showStatus(statusEl, `Import failed: ${result.message}`, false);
        }
      } catch (error) {
        showStatus(statusEl, `Import error: ${error.message}`, false);
      }
    });
  }
  
  // Setup import single horse button
  const importSingleHorseBtn = document.getElementById('import-single-horse-btn');
  if (importSingleHorseBtn) {
    importSingleHorseBtn.addEventListener('click', async function() {
      const rawHorseId = document.getElementById('zed-horse-id').value.trim();
      const cleanedId = cleanHorseId(rawHorseId); // Use the helper function
      const importType = document.getElementById('import-horse-type').value;
      const statusEl = document.getElementById('single-import-status');
      
      if (!cleanedId) {
        showStatus(statusEl, 'Please enter a valid horse ID or URL.', false);
        return;
      }
      
      if (!zedAuth.getToken()) {
        showStatus(statusEl, 'Please set your API token first.', false);
        return;
      }
      
      showStatus(statusEl, `Importing horse ${cleanedId}... Please wait.`, null);
      
      try {
        const result = await zedApi.fetchHorse(cleanedId);
        
        if (result.success) {
          const horse = result.data;
          
          // Prepare horse data
          const horseData = {
            id: crypto.randomUUID(), // Generate a unique local ID
            name: horse.name,
            bloodline: horse.bloodline,
            gender: horse.gender,
            color: horse.color || '#CCCCCC',
            stars: horse.overall_rating || 0,
            zedId: horse.id,
            importDate: new Date().toISOString()
          };
          
          if (importType === 'racing') {
            // Check if we already have this horse
            const existingIndex = window.horses.findIndex(h => h.zedId === horse.id);
            
            if (existingIndex >= 0) {
              // Update existing horse
              window.horses[existingIndex] = {
                ...window.horses[existingIndex],
                ...horseData
              };
              showStatus(statusEl, `Updated racing horse: ${horse.name}`, true);
            } else {
              // Add new horse
              window.horses.push(horseData);
              showStatus(statusEl, `Imported new racing horse: ${horse.name}`, true);
            }
            
            // Switch to racing tab
            activateTab('racing');
          } else {
            // Check if we already have this horse
            const existingIndex = window.breedingHorses.findIndex(h => h.zedId === horse.id);
            
            if (existingIndex >= 0) {
              // Update existing horse
              window.breedingHorses[existingIndex] = {
                ...window.breedingHorses[existingIndex],
                ...horseData
              };
              showStatus(statusEl, `Updated breeding horse: ${horse.name}`, true);
            } else {
              // Add new horse
              window.breedingHorses.push(horseData);
              showStatus(statusEl, `Imported new breeding horse: ${horse.name}`, true);
            }
            
            // Switch to breeding tab
            activateTab('breeding');
          }
          
          // Save the updated data
          saveData();
        } else {
          showStatus(statusEl, `Import failed: ${result.message}`, false);
        }
      } catch (error) {
        showStatus(statusEl, `Import error: ${error.message}`, false);
      }
    });
  }
  
  // Add this to your event handlers section
  const importHorseWithRacesBtn = document.getElementById('import-horse-with-races-btn');
  if (importHorseWithRacesBtn) {
    importHorseWithRacesBtn.addEventListener('click', async function() {
      const rawHorseId = document.getElementById('zed-horse-id').value.trim();
      const cleanedId = cleanHorseId(rawHorseId);
      const importType = document.getElementById('import-horse-type').value;
      const statusEl = document.getElementById('single-import-status');
      
      if (!cleanedId) {
        showStatus(statusEl, 'Please enter a valid horse ID or URL.', false);
        return;
      }
      
      if (!zedAuth.getToken()) {
        showStatus(statusEl, 'Please set your API token first.', false);
        return;
      }
      
      showStatus(statusEl, `Importing horse ${cleanedId} with race history... Please wait.`, null);
      
      try {
        const result = await zedApi.fetchHorseRaces(cleanedId);
        
        if (result.success) {
          const horse = result.horse;
          const races = result.races;
          
          // Prepare horse data
          const horseData = {
            id: crypto.randomUUID(),
            name: horse.name,
            bloodline: horse.bloodline,
            gender: horse.gender,
            color: horse.color || '#CCCCCC',
            stars: horse.overall_rating || 0,
            zedId: horse.id,
            importDate: new Date().toISOString()
          };
          
          // Add race history
          const raceHistory = races.map(race => ({
            id: crypto.randomUUID(),
            horseId: horse.id,
            raceId: race.id,
            date: race.timestamp,
            distance: race.distance,
            position: race.position,
            class: race.class,
            prize: race.prize_pool
          }));
          
          if (importType === 'racing') {
            // Update or add the horse
            const existingIndex = window.horses.findIndex(h => h.zedId === horse.id);
            
            if (existingIndex >= 0) {
              // Update existing horse
              window.horses[existingIndex] = {
                ...window.horses[existingIndex],
                ...horseData,
                races: raceHistory
              };
              showStatus(statusEl, `Updated racing horse: ${horse.name} with ${races.length} races`, true);
            } else {
              // Add new horse
              window.horses.push({
                ...horseData,
                races: raceHistory
              });
              showStatus(statusEl, `Imported new racing horse: ${horse.name} with ${races.length} races`, true);
            }
            
            // Switch to racing tab
            activateTab('racing');
          } else {
            // Update or add the breeding horse
            const existingIndex = window.breedingHorses.findIndex(h => h.zedId === horse.id);
            
            if (existingIndex >= 0) {
              window.breedingHorses[existingIndex] = {
                ...window.breedingHorses[existingIndex],
                ...horseData,
                races: raceHistory
              };
              showStatus(statusEl, `Updated breeding horse: ${horse.name} with ${races.length} races`, true);
            } else {
              window.breedingHorses.push({
                ...horseData,
                races: raceHistory
              });
              showStatus(statusEl, `Imported new breeding horse: ${horse.name} with ${races.length} races`, true);
            }
            
            // Switch to breeding tab
            activateTab('breeding');
          }
          
          // Save the updated data
          saveData();
        } else {
          showStatus(statusEl, `Import failed: ${result.message}`, false);
        }
      } catch (error) {
        showStatus(statusEl, `Import error: ${error.message}`, false);
      }
    });
  }
});

// Make key objects available globally
window.zedAuth = zedAuth;
window.zedApi = zedApi;
window.activateTab = activateTab;
window.showStatus = showStatus;
window.saveData = saveData;
window.showImportStatus = showImportStatus;