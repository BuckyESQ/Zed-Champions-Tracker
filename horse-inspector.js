const fs = require('fs');

// Create an HTML file that will check localStorage
const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Horse Data Recovery</title>
  <style>
    body { font-family: Arial; background: #111; color: white; padding: 20px; }
    .horses { background: #222; padding: 15px; border-radius: 8px; margin: 10px 0; }
    .success { color: #4ecdc4; }
    .error { color: #ff6b6b; }
    button { padding: 10px 15px; background: #03dac6; color: black; border: none; border-radius: 4px; margin: 5px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>🐎 Emergency Horse Data Recovery</h1>
  <div>
    <button onclick="checkHorses()">Check Horses in localStorage</button>
    <button onclick="exportHorses()">Export Horses to JSON</button>
    <button onclick="copyToClipboard()">Copy Data to Clipboard</button>
    <button onclick="fixLocalStorageKey()">Fix Storage Key</button>
  </div>
  <div id="results"></div>
  <pre id="horse-data"></pre>

  <script>
    function checkHorses() {
      const results = document.getElementById('results');
      const horsesData = document.getElementById('horse-data');
      
      // Check all possible localStorage keys
      const possibleKeys = ['horses', 'myHorses', 'stableHorses', 'racingHorses'];
      let foundHorses = false;
      
      results.innerHTML = '<h2>Checking localStorage...</h2>';
      let resultsHtml = '';
      
      possibleKeys.forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const horses = JSON.parse(data);
            resultsHtml += \`<div class="horses">
              <p class="success">✅ Found \${horses.length} horses with key "\${key}"</p>
            </div>\`;
            
            if (key === 'horses') {
              horsesData.textContent = JSON.stringify(horses, null, 2);
            }
            
            foundHorses = true;
          } catch (e) {
            resultsHtml += \`<div class="horses">
              <p class="error">❌ Error parsing data in key "\${key}": \${e.message}</p>
            </div>\`;
          }
        } else {
          resultsHtml += \`<div class="horses">
            <p class="error">❌ No data found with key "\${key}"</p>
          </div>\`;
        }
      });
      
      if (!foundHorses) {
        resultsHtml += \`<div class="horses">
          <p class="error">❌ No horses found in any localStorage key!</p>
        </div>\`;
      }
      
      results.innerHTML += resultsHtml;
    }
    
    function exportHorses() {
      const horsesData = document.getElementById('horse-data');
      const keys = ['horses', 'myHorses', 'stableHorses', 'racingHorses'];
      const allData = {};
      
      keys.forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            allData[key] = JSON.parse(data);
          } catch (e) {
            allData[key] = \`Error parsing: \${e.message}\`;
          }
        } else {
          allData[key] = null;
        }
      });
      
      horsesData.textContent = JSON.stringify(allData, null, 2);
    }
    
    function copyToClipboard() {
      const horsesData = document.getElementById('horse-data');
      navigator.clipboard.writeText(horsesData.textContent)
        .then(() => {
          alert('Horse data copied to clipboard!');
        })
        .catch(err => {
          alert('Error copying data: ' + err);
        });
    }
    
    function fixLocalStorageKey() {
      // Attempt to find horses in any key and consolidate to 'horses'
      const keys = ['myHorses', 'stableHorses', 'racingHorses'];
      let foundHorses = JSON.parse(localStorage.getItem('horses') || '[]');
      let recovered = false;
      
      keys.forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const horses = JSON.parse(data);
            if (horses && Array.isArray(horses) && horses.length > 0) {
              // Add horses if they don't exist in main array
              horses.forEach(horse => {
                if (!foundHorses.some(h => h.id === horse.id)) {
                  foundHorses.push(horse);
                  recovered = true;
                }
              });
            }
          } catch (e) {
            console.error(\`Error parsing \${key}:\`, e);
          }
        }
      });
      
      if (recovered) {
        localStorage.setItem('horses', JSON.stringify(foundHorses));
        document.getElementById('results').innerHTML += \`
          <div class="horses">
            <p class="success">✅ Fixed! Consolidated \${foundHorses.length} horses into the 'horses' key</p>
          </div>\`;
      } else {
        document.getElementById('results').innerHTML += \`
          <div class="horses">
            <p class="error">❌ No additional horses found in other keys</p>
          </div>\`;
      }
    }
    
    // Run check on load
    window.addEventListener('load', checkHorses);
  </script>
</body>
</html>`;

fs.writeFileSync('public/horse-data-recovery.html', html);
console.log('Created horse-data-recovery.html in public folder');
