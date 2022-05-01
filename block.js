const crypto = require('crypto'), SHA256 = message => crypto.createHash('sha256').update(message).digest('hex');
const EC = require('elliptic').ec, ec = new EC('secp256k1');
const { info } = require('console');
const Transaction = require('./transactions');

const MINT_PRIVATE_ADDRESS = process.env.MINT_PRIVATE_ADDRESS;
const MINT_KEY_PAIR = ec.keyFromPrivate(MINT_PRIVATE_ADDRESS, 'hex');
const MINT_PUBLIC_ADDRESS = MINT_KEY_PAIR.getPublic('hex');

const { log16 } = require('./utils');


class Terminator {
    constructor(id, timestamp, data, prevHash, difficulty) {
        this.id = id;
        this.timestamp =timestamp;
        this.blockHash = this.makeHash(); 
        this.prevHash = prevHash;
        this.data = data; 
        this.difficulty = difficulty;
        this.nonce = id;
    }

    makeHash() {
        return SHA256(this.id.toString() + this.timestamp + this.prevHash + JSON.stringify(this.data) + this.nonce).toString(); // return hash using SHA256 imported library
    }   

    transactionIsValid() {
        for(const data of this.data){
            if(!data.isValid()){
                return false;
            }
        }

        return true;
    }

    mineBlock(difficulty) {
       console.log(difficulty);
       
        this.nonce = difficulty;

        while(this.blockHash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            console.log(this.blockHash.substring(0, difficulty));
            console.log(Array(difficulty + 1).join('0'));
            
            this.nonce++;
            this.blockHash = this.makeHash();
        }

        console.log('Skynet mined another Terminator: #', this.nonce + '\n' + this.blockHash); 
        const infoNeeded = {blockHash:this.blockHash, nonce: this.nonce, prevHash: this.prevHash}
        return infoNeeded;
    }
}

// let block = new Terminator(2, new Date(Date.now()), new Transaction('0x6539306131623561393631346330396530386166', '0x6663636139613138626532306462636231633162', 5000, 5, new Date(Date.now()), MINT_PRIVATE_ADDRESS), '91097d8a03662508ab3cc465c7c9cf86d52d7322258bba6e1a275c0f6eafce61');


// block.mineBlock(4);

module.exports = Terminator;

/*
let terminator = new Terminator(idHolder, new Date(Date.now()), new Transaction(this.pendingTransactions[i].from, this.pendingTransactions[i].to, this.pendingTransactions[i].amount, this.miningReward, new Date(Date.now()), this.pendingTransactions[i].keyPair))
*/