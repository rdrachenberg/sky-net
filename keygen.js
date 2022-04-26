const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

let keyGenerator = []; // used let vs const to allow clearing in the function execution 

const generateKeys = () => {
    
    const key = ec.genKeyPair();
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');
    
    keyGenerator = [];
    
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




