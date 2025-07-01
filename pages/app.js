import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // Redirect to the main tracker
    window.location.href = '/stablefields-tracker.html';
  }, []);
  
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      justifyContent: 'center', 
      alignItems: 'center',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>ZED Champions Tracker</h1>
      <p>Loading full application...</p>
      <div style={{ marginTop: '20px' }}>
        <p><a href="/largeindex.html" style={{ color: '#0070f3' }}>Click here if not redirected automatically</a></p>
      </div>
    </div>
  );
}
