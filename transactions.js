require('dotenv').config();
const crypto = require('crypto'), SHA256 = message => crypto.createHash('sha256').update(message).digest('hex');
const Elliptic = require( 'elliptic');

const ec = new Elliptic.ec('secp256k1');
const keccak256 = require('js-sha3').keccak256;
// const MINT_PRIVATE_KEY = process.env.MINT_PRIVATE_ADDRESS;
// const MINT_KEY_PAIR = ec.keyFromPrivate(MINT_PRIVATE_KEY, 'hex');
let address;

class Transaction { // define and export class with a constructor 
    constructor(from, to, value, fee, dateCreated, data) { // when class is initiated, it will take in from address, to address, and value
        this.from = from; // make this.from equal to the passed in value of from
        this.to = to; // make this.to equal to the passed in value of to
        this.value = value; // make this.value equal to the passed in value of value
        this.fee = fee;
        this.dateCreated = dateCreated;
        this.data = data;
        this.senderPubKey = '';
        this.transactionDataHash = this.makeHash();
        this.senderSignature = [this.mintTransactionSignature(this.data)];
    }

    makeHash() {
        return SHA256(this.from + this.to + this.value + this.fee + JSON.stringify(this.data)) // return a sha256 hash value using the SHA256 library from crypto-js
    }

    mintTransactionSignature(data) {
        if(data === 'Genisis transaction' || data === undefined) {
            this.signature = '0000000000000000000000000000000000000000000000000000000000000000';
            // this.senderSignature.push(this.signature);
            return this.signature;
        } else {
            // console.log('IS THIS DATA EVER BEING HIT? -->  ',this.data)   
            let sig = this.signTransaction(this.data);
            let validateSignature = this.isValid();

            console.log('Valid signature? ', validateSignature);

            if(validateSignature){
                this.signature = sig;
                return sig;
            } else {
                throw new Error('Your signature is not valid in this transaction')
            }

            
        }
    }

    signTransaction(signingKey) { // define a class function to sign the transaction. Will take as a parameter a signingKey
        
        // console.log('here is the signing key -->\n ', signingKey)
        // console.log('Here is the this.data --->>>> \n')
            
            let passedInPKey = ec.keyFromPrivate(signingKey, 'hex');

            const privateKey = passedInPKey.getPrivate('hex');

            const generatorPoint = passedInPKey.ec.g; // sep256k1 generator point generation
            const pubKeyCoordinates = generatorPoint.mul(privateKey);

            const x = pubKeyCoordinates.getX().toString('hex');
            const y = pubKeyCoordinates.getY().toString('hex');

            const concatPublicKey = x + y;

            // console.log('concat is here ---> ', concatPublicKey)
            const hashOfPublicKey = keccak256(Buffer.from(concatPublicKey, 'hex'))

            console.log('here is the hash of the Public Key: ',hashOfPublicKey);

            const ethAddressBuffer = Buffer.from(hashOfPublicKey);

            const addressBuffer = ethAddressBuffer.slice(-20).toString('hex');

            address = '0x'+ addressBuffer;

            console.log('address transactions', address);
            console.log('this.from transactions', this.from);

            if(address !== this.from && this.data != 'Genisis transaction') { // if the public signing key is NOT the same as the senders address
                throw new Error('You must own the wallet to sign for it!'); // Throw error and pass message 
                
            }

            this.data = '';
    
            this.hash = this.makeHash(); // make this.hash eqaul to function makeHash

            const sign = passedInPKey.sign(this.hash, 'base64'); // create var sign equal to the cryptographic signature of this.hash base64 encoding

            this.signature = sign.toDER('hex');

            console.log('Signature: ', this.signature);

            this.senderPubKey = passedInPKey.getPublic('hex');

            return this.signature
        // }
        
        
        
    }

    isValid() {
        if(this.from === null){
            return true;
        }
        const signingKey = this.data;

        if(address !== this.from) {
            throw new Error('You must own the wallet to sign for it!'); // Throw error and pass message 
        }

        const publicKey = ec.keyFromPublic(this.senderPubKey, 'hex');

        console.log('Here is the signature: ', this.signature);

        return publicKey.verify(this.hash, this.signature);
    }
}

module.exports = Transaction;