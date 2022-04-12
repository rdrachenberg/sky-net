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
// console.log('here is the Private Key:',privateKey);
// console.log('here is hte public key',publicKey);

const MINT_PRIVATE_ADDRESS = process.env.MINT_PRIVATE_ADDRESS;
const MINT_KEY_PAIR = ec.keyFromPrivate(MINT_PRIVATE_ADDRESS, 'hex');
const MINT_PUBLIC_ADDRESS = MINT_KEY_PAIR.getPublic('hex');




setInterval(() => {
    let prevBlockTime = startCyberDyneChain.getLastBlock().timestamp;
    let amounts = 1;
    
    while(prevBlockTime < (Date.now() + 10000)) {
        break;
    }

    let i = startCyberDyneChain.getLastBlock().id + 1;
    amounts += i;

    let date = new Date(Date.now());
    startCyberDyneChain.addBlock(new Terminator(i, date, {sender: null, receiver: null, amount: null}));
    
    i++;

    console.log(prevBlockTime);
    console.log('New Terminator Block made');
}, 10000)

setTimeout(() => { // here is where we set the first message delays and mint the first block
    let i = 2;
    let amounts = 1;
    
    setTimeout(() => {
        console.log(startCyberDyneChain.getChain()); // returns full chain 
        // connectToPeers(startPeers) //need to uncomment 
        setTimeout(() => {
            // initHttpServer(server);
            
            setTimeout(() => {
                // initP2PServer(); 

                // const bobWallet = createWallet();
                // const aliceWallet = createWallet();
            }, 500); // 2000

        }, 500); // 2000
        
    }, 500); // 5000

}, 500); // 20000

// console.log(JSON.stringify(startCyberDyneChain, null, 15));






// let addOneBlock = startCyberDyneChain.addBlock(new Terminator(idHolder, Date.now(), {sender: `JoMama${idHolder}`, receiver: "Ryan of course", amount: 5}));

let initHttpServer = (server) => {
   const io = socketIo(server, {
       cors: {
           origin: 'http://localhost:3000'
       }
    })

    io.on("connection", socket => {
        console.log("client connected: ", socket.id);
    //    console.log(blockchain);
        socket.join("data-room");
        
        socket.on("disconnect", (reason) => {
           console.log(reason);
        })

        socket.on("add-block", async () => {
            idHolder = startCyberDyneChain.getLastBlock().id + 1;
            startCyberDyneChain.addBlock(new Terminator(idHolder, new Date(Date.now()), {sender: `JoMama${idHolder}`, receiver: "Ryan of course", amount: 5}));
            io.to("data-room").emit("data", JSON.stringify(blockchain));
        })

        socket.on('transaction', (transaction) => {
            const {from, to, amount} = transaction;
            const numAmount = Number(amount);

            idHolder = startCyberDyneChain.getLastBlock().id + 1;

            startCyberDyneChain.addBlock(new Terminator(idHolder, new Date(Date.now()), {sender: from, receiver: to, amount: numAmount}));
            io.to("data-room").emit("data", JSON.stringify(blockchain));
        })

        socket.on('keygen', () => {
            let keys = generateKeys();
            socket.emit('keygeneration', keys);
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
   })
}

initHttpServer(server);

