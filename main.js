class Block {
    constructor(index, timestamp, DataTransfer, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.DataTransfer = DataTransfer;
        this.previousHash = previousHash;

    }
}