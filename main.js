const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, DataTransfer, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.DataTransfer = DataTransfer;
        this.previousHash = previousHash;
        this.hash = this.CalculateHash();
        this.nonce = 0;

    }
    CalculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.CalculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }
    createGenesisBlock() {
        return new Block(0, "01/01/2025", "Genesis Block", "0")
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.CalculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let mintoCoin = new Blockchain();

console.log("Mining Block 1");
mintoCoin.addBlock(new Block(1, "20-06-2025", { amount: 4 }));

console.log("Mining Block 2");
mintoCoin.addBlock(new Block(2, "24-06-2025", { amount: 10 }));

