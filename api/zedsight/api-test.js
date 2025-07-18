// This is a debug file to test API endpoints directly
// Not for production use

// Test Direct API
console.log('Testing direct ZedSight API...');
fetch('https://pqchju22ku.us-east-1.awsapprunner.com/api/search-horse?name=test')
    .then(response => {
        console.log('Direct API Status:', response.status);
        return response.text();
    })
    .then(data => {
        console.log('Direct API Response:', data);
    })
    .catch(error => {
        console.error('Direct API Error:', error);
    });

// Test Proxy API
console.log('Testing PHP proxy...');
fetch('/api/zedsight/proxy.php')
    .then(response => {
        console.log('Proxy Status:', response.status);
        return response.text();
    })
    .then(data => {
        console.log('Proxy Response:', data);
    })
    .catch(error => {
        console.error('Proxy Error:', error);
    });

// Test Simple Proxy API
console.log('Testing Simple PHP proxy...');
fetch('/api/zedsight/simple-proxy.php?endpoint=search-horse&name=test')
    .then(response => {
        console.log('Simple Proxy Status:', response.status);
        return response.text();
    })
    .then(data => {
        console.log('Simple Proxy Response:', data);
    })
    .catch(error => {
        console.error('Simple Proxy Error:', error);
    });
