import { useEffect } from 'react';

export default function Tracker() {
  useEffect(() => {
    // Redirect to the StableFields Pro tracker
    window.location.href = '/stablefields-tracker.html';
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
      <h1 style={{ color: '#03dac6', marginBottom: '1rem' }}>🏇 StableFields ZED Champions Tracker Pro</h1>
      <p>Loading StableFields Pro interface...</p>
      <div style={{ marginTop: '20px' }}>
        <p><a href="/stablefields-tracker.html" style={{ color: '#03dac6' }}>Click here if not redirected automatically</a></p>
      </div>
    </div>
  );
}
