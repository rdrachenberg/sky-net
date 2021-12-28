const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

let keyGenerator = [];

let generateKeys = () => {
    for(let i =0; i < 1; i++) {
        const key = ec.genKeyPair();
        const publicKey = key.getPublic('hex');
        const privateKey = key.getPrivate('hex');
    
        keyGenerator.push({
            keys:{
                    privateKey: privateKey,
                    publicKey: publicKey
                }
        });
    }
    
    // console.log(...[...keyGenerator]);
    return keyGenerator
}


module.exports = { generateKeys };

// console.log('Private Key: ', privateKey);
// console.log('Public Key: ', publicKey);


