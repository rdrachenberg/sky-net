const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, prevHash, hash, data, validator, signature) {
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.validator = validator;
        this.signature = signature;
    }

    toString() {
        reutrn `Block - 
            Timestamp: ${this.timestamp}
            Previous Hash: ${this.prevHash}
            Current Hash: ${this.hash}
            The Data: ${this.data}
            Block Validator: ${this.validator}
            Signature: ${this.signature}`;
    }

    static startSkynet() {
        return new this(`Skynet start time: `, Date.now(), "Skynet starting hash: ", []);
    }

    static hash(timestamp, prevHash, data) {
        return SHA256(`${timestamp}${prevHash}${data}`).toString();
    }

    static createBlock(lastBlock, data) {
        let hash;
        let timestamp = Date.now();
        const prevHash = lastBlock.hash;
        hash = Block.hash(timestamp, prevHash, data);

        return new this(timestamp, prevHash, hash, data);
    }
}