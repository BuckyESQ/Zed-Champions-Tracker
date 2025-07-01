import { useEffect } from 'react';

export default function Status() {
  useEffect(() => {
    // Redirect to the status page
    window.location.href = '/api-status.html';
  }, []);
  
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      justifyContent: 'center', 
      alignItems: 'center',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%)',
      color: 'white'
    }}>
      <h1 style={{ color: '#03dac6', marginBottom: '1rem' }}>🏇 ZED Champions Status</h1>
      <p>Loading status dashboard...</p>
      <div style={{ marginTop: '20px' }}>
        <p><a href="/api-status.html" style={{ color: '#03dac6' }}>Click here if not redirected automatically</a></p>
      </div>
    </div>
  );
}
