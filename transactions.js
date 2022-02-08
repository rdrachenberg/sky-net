const SHA256 = require('crypto-js/sha256');
const Elliptic = require( 'elliptic');

const ec = new Elliptic.ec('secp256k1');

class Transaction { // define and export class with a constructor 
    constructor(addressFrom, addressTo, amount) { // when class is initiated, it will take in from address, to address, and amount
        this.addressFrom = addressFrom; // make this.addressFrom equal to the passed in value of addressFrom
        this.addressTo = addressTo; // make this.addressTo equal to the passed in value of addressTo
        this.amount = amount; // make this.amount equal to the passed in value of amount
    }

    makeHash() {
        return SHA256(this.addressFrom + this.addressTo + this.amount) // return a sha256 hash value using the SHA256 library from crypto-js
    }

    signTransaction(signingKey) { // define a class function to sign the transaction. Will take as a parameter a signingKey
        if(this.addressFrom === null) { // conditional if addresFrom equals null 
            return true // return true
        }

        if(signingKey.getPublic('hex') !== this.addressFrom) { // if the public signing key is NOT the same as the senders address
            throw new Error('You must own the wallet to sign for it!'); // Throw error and pass message 
        }

        this.hash = this.makeHash(); // make this.hash eqaul to function makeHash

        const sign = signingKey.sign(this.hash, 'base64'); // create var sign equal to the passed in signing key 

        this.signature = sign.toDER('hex');

        console.log('Signature: ', this.signature);
    }

    isValid() {
        if(this.addressFrom === null){
            return true;
        }

        if(signingKey.getPublic('hex') !== this.addressFrom) {
            throw new Error('You must own the wallet to sign for it!'); // Throw error and pass message 
        }

        const publicKey = ec.keyFromPublic(this.addressFrom, 'hex');

        console.log('Here is the signature: ', this.signature);

        return publicKey.verify(this.makeHash(), this.signature);
    }
}

module.exports = {Transaction};