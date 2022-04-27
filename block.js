const crypto = require('crypto'), SHA256 = message => crypto.createHash('sha256').update(message).digest('hex');
const EC = require('elliptic').ec, ec = new EC('secp256k1');
const Transaction = require('./transactions');

const MINT_PRIVATE_ADDRESS = process.env.MINT_PRIVATE_ADDRESS;
const MINT_KEY_PAIR = ec.keyFromPrivate(MINT_PRIVATE_ADDRESS, 'hex');
const MINT_PUBLIC_ADDRESS = MINT_KEY_PAIR.getPublic('hex');


class Terminator {
    constructor(id, timestamp, data, prevHash, difficulty = 4) {
        this.id = id;
        this.timestamp =timestamp;
        this.blockHash = this.makeHash(); 
        this.prevHash = prevHash;
        this.data = data; 
        this.difficulty = difficulty;
        this.nonce = id;
    }

    makeHash() {
        // console.log('this is the freaking Cyberdyne Hash ------> ', SHA256(this.id + this.timestamp + this.prevHash + JSON.stringify(this.data) + this.nonce).toString());
        this.nonce = this.id; // set nonce equal to id. This will be used as a security check
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
        while(this.blockHash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.blockHash = this.makeHash();
        }

        console.log('Skynet mined another Terminator: #', this.nonce + '\n' + this.blockHash); 
    }
}

module.exports = Terminator;