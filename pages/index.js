import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the static HTML page
    window.location.href = '/index.html';
  }, []);
  
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      justifyContent: 'center', 
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <h1>ZED Champions Tracker</h1>
      <p>Redirecting to application...</p>
    </div>
  );
}

