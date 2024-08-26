
import React, { useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import CoinFlipABI from './CoinFlipABI.json';

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

function App() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [status, setStatus] = useState('');

    const connectWallet = async () => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CoinFlipABI, signer);

        setProvider(provider);
        setSigner(signer);
        setContract(contract);
        setStatus('Wallet connected!');
    };

    const flipCoin = async (guess) => {
        try {
            const tx = await contract.flip(guess, { value: ethers.utils.parseEther("0.01") });
            await tx.wait();
            setStatus('Flip successful!');
        } catch (error) {
            setStatus('Flip failed: ' + error.message);
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            <button onClick={() => flipCoin(true)}>Flip Heads</button>
            <button onClick={() => flipCoin(false)}>Flip Tails</button>
            <p>{status}</p>
        </div>
    );
}

export default App;
