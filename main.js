const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, DataTransfer, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.DataTransfer = DataTransfer;
        this.previousHash = previousHash;
        this.Hash = this.CalculateHash();

    }
    CalculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [];
    }
}