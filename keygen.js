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
    const pubKeyCoordinates = generatorPoint.mul(privateKey); // generatorPoint multiplied by privateKey

    const x = pubKeyCoordinates.getX().toString('hex'); // get x coordinates to string 
    const y = pubKeyCoordinates.getY().toString('hex'); // get y coordinates to string 

    const concatPublicKey = x + y; // concatinate the x & y vars 

    // console.log('concat is here ---> ', concatPublicKey)
    const hashOfPublicKey = keccak256(Buffer.from(concatPublicKey, 'hex')) // create a var to hash the concatPublicKey in a Buffer

    // console.log('here is the hash of the Public Key: ',hashOfPublicKey);

    const ethAddressBuffer = Buffer.from(hashOfPublicKey); // create a var to hold a Buffer of the var hashOfPublicKey

    const addressBuffer = ethAddressBuffer.slice(-20).toString('hex'); // strip ethAddressBuffer of the first 20 characters

    const address = '0x'+ addressBuffer; // add eth '0x' formating to the begining of the account string 


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
 // generateKeys(); // uncomment to use file to generate keys

module.exports = { generateKeys };




