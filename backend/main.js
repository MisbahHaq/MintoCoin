const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('658156665e35e3c74be323bc0cdc40aa14b55fb9a370bddb4ddaa08bf785f70b');
const myWalletAddress = myKey.getPublic('hex');

let mintoCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
mintoCoin.addTransaction(tx1);

console.log('\n Starting the Mining...');
mintoCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of Misbah is', mintoCoin.getBalanceOfAddress(myWalletAddress));


