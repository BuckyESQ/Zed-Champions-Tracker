import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the main tracker (in public folder for Vercel)
    window.location.href = '/stablefields-tracker.html';
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

