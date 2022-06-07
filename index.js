//* ONLY UTILIZED FOR TESTING
// const Terminator = require('./terminator');
// const Transaction = require('./transactions').Transaction
// const CyberDyneChain = require('./cyberdyneBlockChain').CyberDyneChain;
// const {createWallet, validateWallet} = require('./wallet');

// const cyberDyneSystems = new CyberDyneChain();

// const bobWallet = createWallet();
// const aliceWallet = createWallet();

// console.log('Wallet validation in progress... \nWallet Validated: ', validateWallet(bobWallet.privateKey, bobWallet.publicKey));

// // make transactions

// const tx1 = new Transaction(bobWallet.publicKey, aliceWallet.publicKey, 110);
// console.log(tx1);
// tx1.signTransaction(bobWallet.keyPair);

// cyberDyneSystems.addTransaction(tx1);

// console.log('mining Terminator :\n', cyberDyneSystems.this.nonce);
// cyberDyneSystems.minePendingTransactions(bobWallet.publicKey);

// const tx2 = new Transaction(bobWallet.publicKey, aliceWallet.publicKey, 190);
// tx2.signTransaction(bobWallet.keyPair);

// cyberDyneSystems.addTransaction(tx2);
// console.log('mining Terminator :\n', cyberDyneSystems.this.nonce);
// cyberDyneSystems.minePendingTransactions(bobWallet.publicKey);

// const tx3 = new Transaction(bobWallet.publicKey, aliceWallet.publicKey, 190);
// tx3.signTransaction(bobWallet.keyPair);

// cyberDyneSystems.addTransaction(tx3);
// console.log('mining Terminator :\n', cyberDyneSystems.this.nonce);
// cyberDyneSystems.minePendingTransactions(bobWallet.publicKey);

// console.log('The balance of Alice(s) account is : \n', cyberDyneSystems.getBalanceOfAddress(aliceWallet.publicKey));

// // validation test

// console.log('Is the CyberDyne Chain valid? : \n', cyberDyneSystems.isValid()); // returns bool if chain is valid

// // cyberDyneSystems.skynet_chain[1].data[0].amount = 260;

// console.log(JSON.stringify(cyberDyneSystems, null, 4)); // log whole chain fingers crossed

