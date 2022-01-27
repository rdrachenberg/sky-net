// const block = require('./index');
// const Blockchain = require('./blockchain');

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
        console.log(`Block - 
        Timestamp: ${this.timestamp}
        Previous Hash: ${this.prevHash}
        Current Hash: ${this.hash}
        The Data: ${this.data}
        Block Validator: ${this.validator}
        Signature: ${this.signature}`);

        return `Block - 
            Timestamp: ${this.timestamp}
            Previous Hash: ${this.prevHash}
            Current Hash: ${this.hash}
            The Data: ${this.data}
            Block Validator: ${this.validator}
            Signature: ${this.signature}`;
    }

    startSkynet() {
        console.log('Welcome Cyberdyne Tech... \nStarting Skynet...')
        return new Block(`Skynet start time: ${Date.now()}`, this.prevHash, this.hash, "Skynet starting hash: ");
    }

    hash(timestamp, prevHash, data) {
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

let block = new Block(Date.now(), '184CDCD5872236B9BFCF581DF25F1E35262175355C1295BEE1AAFB7B038F6DAD', '0753D28F4FF6ACB4B4E7F8F90825D189D87FC81E73D2C5FC1E34C9FAD7F863DB', 1, 'ryan')

// block.startSkynet();
// block.toString();
class Blockchain {
    constructor() {
        this.chain = [block.startSkynet()];
    }

    getLatestBlock() {
        return this.chain[this.chain.length -1];
    }

    addNewBlock(newBlock) {
        newBlock.prevHash = this.getLatestBlock().hash;
        this.chain.push(block);

        console.log(block)

        return block;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            let nowBlock = this.chain[i];
            let previousBlock = this.chain[i -1]; 

            if(nowBlock.hash !== nowBlock.hash()) {
                return false;
            }

            if(nowBlock.prevHash !== previousBlock.hash) {
                return false;
            }
        }
        
        return true
    }
}

let dracCoin = new Blockchain();
console.log('Drac Coin mining in progress ... ');

dracCoin.addNewBlock(
    new Block(1, Date.now(), {
        sender: 'your friend',
        recipient: "Ryan Drachenbrerg",
        quantity: 150
    })
);
dracCoin.addNewBlock(
    new Block(2, Date.now(), {
        sender: 'your girlfriend',
        recipient: "Ryan Drachenbrerg",
        quantity: 250
    })
);

console.log(JSON.stringify(dracCoin, null, 4));



