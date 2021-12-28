const bcrypt = require('bcrypt');
const GENESIS_BLOCK = require('./genesis');
const SHA256 = require('crypto-js/sha256');
const CryptoJS = require('crypto-js');
const express = require('express');
const bodyParser = require('body-parser');
const WebSoket = require('ws');

// PORT Assignment local dev

let http_port = process.env.HTTP_PORT || 3010;
let ptp_port = process.env.HTTP_PORT || 6010;
let startPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];


let sockets = [];
let MessageType = {
    QUERY_LATEST : 0,
    QUERY_ALL : 1,
    RESPONSE_BLOCKCHAIN : 2
};


// const Block = require('./block');


class Block {
    constructor(id, timestamp, data, prevHash) {
        this.id = id;
        this.timestamp =timestamp;
        this.blockHash = this.makeHash(); 
        this.prevHash = prevHash;
        this.data = data; 
        this.nonce = id;
    }

    makeHash() {
        // console.log('this is the freaking Cyberdyne Hash ------> ', SHA256(this.id + this.timestamp + this.prevHash + JSON.stringify(this.data) + this.nonce).toString());
        this.nonce = this.id; // set nonce equal to id. This will be used as a security check
        return SHA256(this.id + this.timestamp + this.prevHash + JSON.stringify(this.data) + this.nonce).toString(); // return hash using SHA256 imported library
    }
}

class CyberDyneChain {
    constructor() {
        this.skynet_chain = [this.mineGenesisBlock()];
    }
    initMessages() {
        setTimeout(() => {
            console.log('Initiating Cyberdyne Systems...\n');
        }, 1000);
        setTimeout(() => {
            console.log('⚙️⚙️⚙️ Starting T1 Project...\n');
        }, 3500); 
        setTimeout(() => {
            console.log(' 🔗🔗 Creating Cyberdyne Chain 🔗🔗\n');
            
        }, 5500);
        setTimeout(() => {
            console.log(' 🚧🚧🚧🚧🚧 Minting new T1 Block...🚧🚧🚧🚧🚧 \n');        
        }, 5500); 
        setTimeout(() => {
            console.log('⛓️⛓️⛓️ Cyberdyne Chain created ⛓️⛓️⛓️\n');
        }, 7600);
        setTimeout(() => {
            console.log('💀 T1 Minted... 💀\n'); 
        }, 7600);
        setTimeout(() => {
            console.log('🦾 Cyberdyne Systems online 🦾\n');
        }, 10000);
        setTimeout(() => {
            console.log('🤖🤖 Welcome to Skynet 🤖🤖\n');
        }, 11000);
    }

    mineGenesisBlock() {
        this.initMessages();
        let firstHash = this.createHash('starting T1 Models');
        
        return new Block(1, Date.now(), 'Initiating Cyberdyne Systems...', firstHash);
        
        
    }
    
    createHash(toHash) {
        return SHA256(toHash);
    }

    getLastBlock() {
        return this.skynet_chain[this.skynet_chain.length -1];
    }

    getChain() {
        return this.skynet_chain;
    }

    addBlock(newBlock) {
        newBlock.prevHash = this.getLastBlock().blockHash;
        newBlock.blockHash = newBlock.makeHash();
        // console.log('this.skynet_chain[this.skynet_chain.length -1].blockHash: this ---->',this.skynet_chain[this.skynet_chain.length -1].blockHash)

        this.nonce++;
        // let previousHash = this.skynet_chain.length !== 0 ? this.skynet_chain[this.skynet_chain.length -1].blockHash : '';  test for previous has or make empty string 

        this.skynet_chain.push(newBlock); 
    }
}



const startCyberDyneChain = new CyberDyneChain();

// startCyberDyneChain.addBlock(this.id, Date.now(), {sender: "JoMama", receiver: "Ryan of course", amount: 29000});
setTimeout(() => {
    let i = 2;
    let amounts = 1;

    while(i <= 103) {
        amounts += i;
     
        
        startCyberDyneChain.addBlock(new Block(i, Date.now(), {sender: `JoMama${i}`, receiver: "Ryan of course", amount: amounts}));
    // startCyberDyneChain.addBlock(new Block(3, Date.now(), {sender: "JoMama", receiver: "Ryan of course", amount: 29000}));
        // if(i == 98) {
        //     console.log(startCyberDyneChain.getChain());
        // }
        i++
    }
    setTimeout(() => {
        console.log(startCyberDyneChain.getChain()); // returns full chain string 
    }, 5000);
// startCyberDyneChain.addBlock(new Block(2, Date.now(), {sender: "JoMama", receiver: "Ryan of course", amount: 29000}));
// startCyberDyneChain.addBlock(new Block(3, Date.now(), {sender: "JoMama", receiver: "Ryan of course", amount: 29000}));
// console.log(startCyberDyneChain.getChain());
}, 20000);
// startCyberDyneChain.addBlock(new Block(this.id, Date.now(), {sender: "JoMama", receiver: "Ryan of course", amount: 29000}));
// startCyberDyneChain.addBlock(this.skynet_chain);
// startCyberDyneChain.addBlock(new Block(this.id, Date.now(), {sender: "JoMama3", receiver: "Ryan of course", amount: 29000}));
// startCyberDyneChain.addBlock(new Block(this.id, Date.now(), {sender: "JoMama4", receiver: "Ryan of course", amount: 29000}));
// startCyberDyneChain.addBlock({sender: "YoMoma", receiver: "Ryan of course again", amount: 10000});
// startCyberDyneChain.addBlock({sender: "Your friend", receiver: "Ryan of course again, again", amount: 10000});
// startCyberDyneChain.addBlock({sender: "Your friend's friend", receiver: "Ry got it all! ", amount: 120000});
console.log(JSON.stringify(startCyberDyneChain, null, 15));