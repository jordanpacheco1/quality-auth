import React from 'react';
import { AuthProvider } from './contexts/auth'
import Routes from './routes';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes />;
      </AuthProvider>
    </div>
  );
}

export default App;
