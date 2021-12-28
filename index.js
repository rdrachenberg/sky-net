const Blockchain = require('./blockchain');

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
        return new Block(`Skynet start time: `, Date.now(), "Skynet starting hash: ", []);
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

block.startSkynet();
block.toString();
// const {Blockchain, Transaction} = require('./blockchain')
// const {generateKeys} = require('./keygen')
// const EC = require('elliptic').ec;
// const ec = new EC('secp256k1');

// let kp1 = generateKeys()[0];
// console.log(kp1)
// const privKey = kp1.keys.privateKey.toString();
// const pubKey = kp1.keys.publicKey.toString();
// console.log(privKey)
// const myKey = privKey;

// const myWalletAddress = pubKey;
// console.log('Here is the myWalletAddress var: =====> ', myWalletAddress);

// let dracCoin = new Blockchain();

// const tx1 = new Transaction(privKey, 'this is where the public key should go', 15);
// tx1.signTransaction(myKey);
// dracCoin.addTransaction(tx1);

// // console.log('Mining block 1...');
// // dracCoin.addBlock(new Block(1,'11/30/2021', {amount: 5}));
// // console.log('Mining block 2...');
// // dracCoin.addBlock(new Block(2,'12/01/2021', {amount: 15}));
// // console.log('Mining block 3...');
// // dracCoin.addBlock(new Block(3,'12/02/2021', {amount: 30}));
// // console.log('Mining block 4...');
// // dracCoin.addBlock(new Block(4,'12/03/2021', {amount: 60}));

// // console.log('Is this blockchain valid? ' + '\n' + dracCoin.isValidChain());
// // console.log(JSON.stringify(dracCoin, null, 4))

// dracCoin.addTransaction(new Transaction('address1', myWalletAddress, 100));
// dracCoin.addTransaction(new Transaction('address2', 'address1', 40));
// dracCoin.addTransaction(new Transaction('address2', 'address1', 2));

// console.log('\n Starting the miner... ');
// dracCoin.mineThePendingTransactions(myWalletAddress );

// console.log('\nBalance of Ryan Drac Wallet is: ', dracCoin.getBalanceOfAddress(myWalletAddress));

// (function runWild() {
//     console.log('Miner is mining ... ')
// dracCoin.mineThePendingTransactions(myWalletAddress);

// console.log('\nBalance of Ryan Drac Wallet is: ', dracCoin.getBalanceOfAddress(myWalletAddress));
// })();


