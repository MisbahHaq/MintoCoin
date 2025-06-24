const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, DataTransfer, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.DataTransfer = DataTransfer;
        this.previousHash = previousHash;
        this.hash = this.CalculateHash();

    }
    CalculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new Block(0, "01/01/2025", "Genesis Block", "0")
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.CalculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
        }
    }
}

let mintoCoin = new Blockchain();
mintoCoin.addBlock(new Block(1, "20-06-2025", { amount: 4 }));
mintoCoin.addBlock(new Block(2, "24-06-2025", { amount: 10 }));

console.log(JSON.stringify(mintoCoin, null, 4));