const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const keyGenerator = [];

const generateKeys = () => {
    
    const key = ec.genKeyPair();
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');

    keyGenerator.push({
        keys:{
                privateKey: privateKey,
                publicKey: publicKey
            }
    });
    
    console.log(...[...keyGenerator]);
    return keyGenerator
}

// console.log('Private Key: ', privateKey);
// console.log('Public Key: ', publicKey);


module.exports = { generateKeys };




