require('dotenv').config();
const crypto = require('crypto'), SHA256 = data => crypto.createHash('sha256').update(data).digest('hex');
// const socketIo = require('socket.io');
const EC = require('elliptic').ec, ec = new EC('secp256k1');
const { fork } = require('child_process');
const Terminator = require('./block');
const Transaction = require('./transactions');
const CyberDyneChain = require('./cyberdyneBlockChain.js');

// Require Express and socketio for hybrid server setup
const express = require('express');
const socketIo = require('socket.io');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {generateKeys} = require('./keygen.js');

const startCyberDyneChain = new CyberDyneChain();

// PORT Assignment local dev
let http_port = process.env.HTTP_PORT || 8000;
let ptp_port = process.env.HTTP_PORT || 6010;
let addressOne = `http://localhost:${http_port}`;
let addressTwo = `http://localhost:${ptp_port}`;
let startPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];

let blockchain = startCyberDyneChain.getChain();
let last = startCyberDyneChain.getLastBlock();

let idHolder = last.id + 1;

const privateKey = process.env.NODE_PRIVATE_KEY || ec.genKeyPair().getPrivate('hex');
const keyPair = ec.keyFromPrivate(privateKey, 'hex');
const publicKey = keyPair.getPublic('hex');
console.log('here is the Private Key:',privateKey);
console.log('here is hte public key',publicKey);

const MINT_PRIVATE_ADDRESS = process.env.MINT_PRIVATE_ADDRESS;
const MINT_KEY_PAIR = ec.keyFromPrivate(MINT_PRIVATE_ADDRESS, 'hex');
const MINT_PUBLIC_ADDRESS = MINT_KEY_PAIR.getPublic('hex');

class Node {
    constructor(nodeId, selfUrl, peers, chain, server){
        this.nodeId = nodeId;
        this.selfUrl = 'http://localhost:' + http_port;
        this.peers = [];
        this.chain = blockchain;
        this.server = server;
    }
}

const node = new Node();

// console.log(node);



setInterval(() => {
    let prevBlockTime = startCyberDyneChain.getLastBlock().timestamp;
    let amounts = 1;
    
    while(prevBlockTime < (Date.now() + 10000)) {
        break;
    }

    console.log('Terminator patrol\n\n', prevBlockTime + '\n');
}, 10000)

// setTimeout(() => { // here is where we set the first message delays and mint the first block
//     let i = 2;
//     let amounts = 1;
    
//     setTimeout(() => {
//         console.log(startCyberDyneChain.getChain()); // returns full chain 
//         // connectToPeers(startPeers) //need to uncomment 
//         setTimeout(() => {
//             // initHttpServer(server);
            
//             setTimeout(() => {
//                 // initP2PServer(); 

//                 // const bobWallet = createWallet();
//                 // const aliceWallet = createWallet();
//             }, 500); // 2000

//         }, 500); // 2000
        
//     }, 500); // 5000

// }, 500); // 20000

// console.log(JSON.stringify(startCyberDyneChain, null, 15));






// let addOneBlock = startCyberDyneChain.addBlock(new Terminator(idHolder, Date.now(), {sender: `JoMama${idHolder}`, receiver: "Ryan of course", amount: 5}));

let initHttpServer = (server) => {
   const io = socketIo(server, {
       cors: {
           origin: 'http://localhost:3000'
       },
       pingTimeout: 180000, pingInterval: 25000
    })

    node.server = 'http://localhost:' + http_port;
    
    let idAssign;

    io.on("connection", socket => {
        // console.log("client connected: ", socket.id);
        // console.log(blockchain);
        socket.join("data-room");
        // node.nodeId = socket.id
        // console.log(node);
        
        socket.on("disconnect", (reason) => {
           console.log(reason);
        })

        socket.on("add-block", async () => {
            startCyberDyneChain.minePendingTransactions(publicKey)
            // let from = null;
            // let to = null;
            // let value = null;
            // idHolder = startCyberDyneChain.getLastBlock().id + 1;
            // startCyberDyneChain.addBlock(new Terminator(idHolder, new Date(Date.now()), new Transaction(from, to, value, new Date(Date.now()), 5, 'manual block added')));
            // io.to("data-room").emit("data", JSON.stringify(blockchain));
        })

        socket.on('transaction', (transaction) => {
            const {from, to, amount, data} = transaction;
            const numAmount = Number(amount);

            idHolder = startCyberDyneChain.getLastBlock().id + 1;
            
            
            
            if(from != '' && to != '' && numAmount != NaN && data != 'Genisis transaction' ){
                startCyberDyneChain.addTransaction(transaction)
                
                io.to("data-room").emit("data", JSON.stringify(blockchain));
            }else {
                console.log('transaction error detected')
                new Errror('This is error in the node')
            }
            
        })

        socket.on('keygen', () => {
            let keys = generateKeys();
            socket.emit('keygeneration', keys);
        })

        socket.on('balance', (address) => {
            let balance = startCyberDyneChain.getBalanceOfAddress(address);

            socket.emit('sendbalance', balance);
        })
    })
    
    setInterval(() => {
        io.to("data-room").emit("data", JSON.stringify(blockchain));
    }, 5000);
   
   server.listen(http_port, (err) => {
    if(err) {
        console.log(err);
    }

    console.log("skynet running on port: ", http_port);
    console.log(node);
   })
}

initHttpServer(server);

