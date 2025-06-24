const { Blockchain, Transaction } = require('./blockchain');

let mintoCoin = new Blockchain();


mintoCoin.createTransaction(new Transaction('address1', 'address2', 100)); // address1 would be the public key of someones wallet
mintoCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the Mining...');
mintoCoin.minePendingTransactions("Misbah's Address");
console.log('\nBalance of Misbah is', mintoCoin.getBalanceOfAddress("Misbah's Address"));


console.log('\n Starting the Mining again...');
mintoCoin.minePendingTransactions("Misbah's Address");

console.log('\nBalance of Misbah is', mintoCoin.getBalanceOfAddress("Misbah's Address"));
