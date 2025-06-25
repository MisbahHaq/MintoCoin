import express from 'express';
import { Blockchain, Transaction, ec } from './blockchain.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('frontend'));

const mintoCoin = new Blockchain();

// API: Generate Keys
app.get('/api/generate-keys', (req, res) => {
    const key = ec.genKeyPair();
    res.json({
        privateKey: key.getPrivate('hex'),
        publicKey: key.getPublic('hex')
    });
});

// API: Add transaction
app.post('/api/transaction', (req, res) => {
    try {
        const { from, to, amount, privateKey } = req.body;
        const key = ec.keyFromPrivate(privateKey);
        const tx = new Transaction(from, to, amount);
        tx.signTransaction(key);
        mintoCoin.addTransaction(tx);
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// API: Mine block
app.post('/api/mine', (req, res) => {
    const { minerAddress } = req.body;
    mintoCoin.minePendingTransactions(minerAddress);
    res.json({ message: 'Block mined!' });
});

// API: Check balance
app.get('/api/balance/:address', (req, res) => {
    const balance = mintoCoin.getBalanceOfAddress(req.params.address);
    res.json({ balance });
});

// API: Full blockchain
app.get('/api/chain', (req, res) => {
    res.json(mintoCoin.chain);
});

// API: Demo script
app.get('/api/demo', (req, res) => {
    const key = ec.keyFromPrivate('658156665e35e3c74be323bc0cdc40aa14b55fb9a370bddb4ddaa08bf785f70b');
    const wallet = key.getPublic('hex');

    const chain = new Blockchain();
    const tx = new Transaction(wallet, 'demo-public-key', 10);
    tx.signTransaction(key);
    chain.addTransaction(tx);
    chain.minePendingTransactions(wallet);
    const balance = chain.getBalanceOfAddress(wallet);

    res.json({
        output: `From: ${wallet}\nSent: 10 coins\nNew Balance: ${balance}`
    });
});

app.listen(port, () => {
    console.log(`MintoCoin backend running at http://localhost:${port}`);
});
