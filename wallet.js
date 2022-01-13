import {ec as EC } from 'elliptic';

const ec = new EC('secp256k1');

export function createWallet() {
    const keyPair = ec.genKeyPair();
    const publicKey = keyPair.getPublic('hex');
    const privateKey = keyPair.getPrivate('hex');

    console.log(publicKey, privateKey, keyPair);

    return {
        publicKey,
        privateKey,
        keyPair
    }
}

export function validateWallet(privateKey, publicKey) {
    
    const key = ec.keyFromPrivate(privateKey);
    const publicKeyFromPrivate = key.getPublic('hex');

    return publicKeyFromPrivate === publicKey;

}