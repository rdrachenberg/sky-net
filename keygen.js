const { hash } = require('bcrypt');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const keccak256 = require('js-sha3').keccak256;

let keyGenerator = []; // used let vs const to allow clearing in the function execution 

const generateKeys = () => {
    
    const key = ec.genKeyPair();
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');

    const generatorPoint = key.ec.g; // sep256k1 generator point generation
    const pubKeyCoordinates = generatorPoint.mul(privateKey);

    const x = pubKeyCoordinates.getX().toString('hex');
    const y = pubKeyCoordinates.getY().toString('hex');

    const concatPublicKey = x + y;

    // console.log('concat is here ---> ', concatPublicKey)
    const hashOfPublicKey = keccak256(Buffer.from(concatPublicKey, 'hex'))

    console.log('here is the hash of the Public Key: ',hashOfPublicKey);

    const ethAddressBuffer = Buffer.from(hashOfPublicKey);

    const addressBuffer = ethAddressBuffer.slice(-20).toString('hex');

    const address = '0x'+ addressBuffer;


    // console.log(key.ec.g);

    keyGenerator = [];
    
    keyGenerator.push({
        keys:{
                privateKey: privateKey,
                publicKey: address
            }
    });
    
    console.log(...[...keyGenerator]);
    return keyGenerator
}

// console.log('Private Key: ', privateKey);
// console.log('Public Key: ', publicKey);


module.exports = { generateKeys };




