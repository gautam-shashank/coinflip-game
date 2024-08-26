import React, { useState } from 'react';
import Web3 from 'web3';
import './App.css';

const App = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [betAmount, setBetAmount] = useState('');
  const [selectedSide, setSelectedSide] = useState('heads');
  const [result, setResult] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      const balance = await web3.eth.getBalance(accounts[0]);
      setBalance(web3.utils.fromWei(balance, 'ether'));
    }
  };

  const flipCoin = async () => {
    if (!account) return;

    const web3 = new Web3(window.ethereum);
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const contractABI = [
      // Add your contract ABI here
    ];
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
      const flipResult = await contract.methods.flipCoin(selectedSide === 'heads').send({
        from: account,
        value: web3.utils.toWei(betAmount, 'ether')
      });

      setResult(flipResult ? 'win' : 'lose');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Coin Flip Game</h1>
        <button onClick={connectWallet}>Connect Wallet</button>
        <div>
          <p>Account: {account}</p>
          <p>Balance: {balance} ETH</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Bet amount in ETH"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
          />
          <select value={selectedSide} onChange={(e) => setSelectedSide(e.target.value)}>
            <option value="heads">Heads</option>
            <option value="tails">Tails</option>
          </select>
          <button onClick={flipCoin}>Flip Coin</button>
        </div>
        {result && <p>You {result}!</p>}
      </header>
    </div>
  );
};

export default App;
