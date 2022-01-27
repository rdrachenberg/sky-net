const EC = require('elliptic').ec

const ec = new EC('secp256k1');

function createWallet() {
    const keyPair = ec.genKeyPair();
    const publicKey = keyPair.getPublic('hex');
    const privateKey = keyPair.getPrivate('hex');

    // console.log(publicKey, privateKey, keyPair);

    return {
        publicKey,
        privateKey,
        keyPair
    }
}

function validateWallet(privateKey, publicKey) {
    
    const key = ec.keyFromPrivate(privateKey);
    const publicKeyFromPrivate = key.getPublic('hex');

    return publicKeyFromPrivate === publicKey;

}

module.exports = {createWallet, validateWallet};