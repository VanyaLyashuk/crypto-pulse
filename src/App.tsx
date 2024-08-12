import React from 'react';
import CryptoTable from './components/cryptoTable/CryptoTable';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

const App: React.FC = () => {
  
  return (
    <div className='py-10'>
      <ErrorBoundary>
        <CryptoTable />
      </ErrorBoundary>
    </div>
  );
}

export default App
