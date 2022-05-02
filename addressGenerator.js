require('dotenv').config();
const Elliptic = require( 'elliptic');
const ec = new Elliptic.ec('secp256k1');
const keccak256 = require('js-sha3').keccak256;

let keyPair;

function addressGenerator(privateKey) {

    keyPair = ec.keyFromPrivate(privateKey, 'hex');

    const generatorPoint = keyPair.ec.g; // sep256k1 generator point generation
        const pubKeyCoordinates = generatorPoint.mul(privateKey);
    // console.log(pubKeyCoordinates);

    const x = pubKeyCoordinates.getX().toString('hex');
    const y = pubKeyCoordinates.getY().toString('hex');

    const concatPublicKey = x + y;

    console.log('concat is here ---> ', concatPublicKey)
    const hashOfPublicKey = keccak256(Buffer.from(concatPublicKey, 'hex'))

    console.log('here is the hash of the Public Key: ',hashOfPublicKey);

    const ethAddressBuffer = Buffer.from(hashOfPublicKey);

    const addressBuffer = ethAddressBuffer.slice(-20).toString('hex');

    const address = '0x'+ addressBuffer;

    // console.log('HERE IS YOUR FORMATTED ADDRESS', address);

    return address;
}

module.exports = {addressGenerator}