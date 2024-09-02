import React from 'react';
import './App.css';
import TopVolumeAssets from './components/TopVolumeAssets';
import TopGainers from './components/TopGainers';
import TransactionList from './components/TransactionList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DEX UI for Pump.fun</h1>
      </header>
      <main>
        <TopVolumeAssets />
        <TopGainers />
        <TransactionList />
      </main>
    </div>
  );
}

export default App;
