const crypto = require('crypto'), SHA256 = message => crypto.createHash('sha256').update(message).digest('hex');
const Elliptic = require( 'elliptic');

const ec = new Elliptic.ec('secp256k1');
const MINT_PRIVATE_KEY = process.env.MINT_PRIVATE_ADDRESS;
const MINT_KEY_PAIR = ec.keyFromPrivate(MINT_PRIVATE_KEY, 'hex');

class Transaction { // define and export class with a constructor 
    constructor(from, to, value, fee, data, senderSignature) { // when class is initiated, it will take in from address, to address, and value
        this.from = from; // make this.from equal to the passed in value of from
        this.to = to; // make this.to equal to the passed in value of to
        this.value = value; // make this.value equal to the passed in value of value
        this.fee = fee;
        this.dateCreated = new Date(Date.now());
        this.data = data;
        this.senderPubKey = from;
        this.transactionDataHash = this.makeHash();
        this.senderSignature = [senderSignature];
    }

    makeHash() {
        return SHA256(this.from + this.to + this.value + this.fee + JSON.stringify(this.data)) // return a sha256 hash value using the SHA256 library from crypto-js
    }

    signTransaction(signingKey) { // define a class function to sign the transaction. Will take as a parameter a signingKey
        // signingKey = ec.keyFromPrivate(this.from, 'hex');

        if(this.from === null) { // conditional if addresFrom equals null 
            return true // return true
        }
        

        if(signingKey.getPublic('hex') !== this.from) { // if the public signing key is NOT the same as the senders address
            throw new Error('You must own the wallet to sign for it!'); // Throw error and pass message 
        }

        this.hash = this.makeHash(); // make this.hash eqaul to function makeHash

        const sign = signingKey.sign(this.hash, 'base64'); // create var sign equal to the passed in signing key 

        this.signature = sign.toDER('hex');

        console.log('Signature: ', this.signature);
        this.senderSignature.push(this.signature)
    }

    isValid() {
        if(this.from === null){
            return true;
        }

        if(signingKey.getPublic('hex') !== this.from) {
            throw new Error('You must own the wallet to sign for it!'); // Throw error and pass message 
        }

        const publicKey = ec.keyFromPublic(this.from, 'hex');

        console.log('Here is the signature: ', this.signature);

        return publicKey.verify(this.makeHash(), this.signature);
    }
}

module.exports = Transaction;