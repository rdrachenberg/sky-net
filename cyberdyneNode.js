require('dotenv').config();
const crypto = require('crypto'), SHA256 = data => crypto.createHash('sha256').update(data).digest('hex');
// const socketIo = require('socket.io');
const EC = require('elliptic').ec, ec = new EC('secp256k1');
const { fork } = require('child_process');
const Terminator = require('./block');
const Transaction = require('./transactions');
const CyberDyneChain = require('./cyberdyneBlockChain.js');
const About = require('./cyberdyneAbout')

// Require Express and socketio for hybrid server setup
const express = require('express');
const socketIo = require('socket.io');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const favicon = require('express-favicon');
const {v4: uuidv4} = require('uuid');
const {generateKeys} = require('./keygen.js');
const { addressGenerator } = require('./addressGenerator');




const startCyberDyneChain = new CyberDyneChain();

// PORT Assignment local dev
let http_port = process.env.PORT || 8000;
let ptp_port = process.env.HTTP_PORT || 6010;
let addressOne = `http://localhost:${http_port}`;
let addressTwo = `http://localhost:${ptp_port}`;
let startPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];

let blockchain = startCyberDyneChain.getChain();
let last = startCyberDyneChain.getLastBlock();

let idHolder = last.id + 1;

let faucetRequestAddress = [];

const privateKey = process.env.NODE_PRIVATE_KEY || ec.genKeyPair().getPrivate('hex');
const keyPair = ec.keyFromPrivate(privateKey, 'hex');
const publicKey = keyPair.getPublic('hex');
// console.log('here is the Private Key:',privateKey);
console.log('here is hte public key',publicKey);

const MINT_PRIVATE_ADDRESS = process.env.MINT_PRIVATE_ADDRESS;
const MINT_KEY_PAIR = ec.keyFromPrivate(MINT_PRIVATE_ADDRESS, 'hex');
const MINT_PUBLIC_ADDRESS = MINT_KEY_PAIR.getPublic('hex');

class Node {
    constructor(nodeId, selfUrl, peers, chain, server){
        this.nodeId = nodeId;
        this.selfUrl = process.env.PORT || 'http://localhost:' + http_port;
        this.peers = [];
        this.chain = blockchain;
        this.server = server;
    }
}

const node = new Node(uuidv4());


const confirmed = () => {
    return startCyberDyneChain.getBalanceOfAllAddress();
}

const about = new About(node.nodeId, 20713, node.selfUrl, node.peers, startCyberDyneChain.difficulty, confirmed(), startCyberDyneChain.pendingTransactions)
// console.log(node);
// console.log(about);
// startCyberDyneChain.getBalanceOfAllAddress();

setInterval(() => {
    let prevBlockTime = startCyberDyneChain.getLastBlock().timestamp;
    let amounts = 1;
    
    while(prevBlockTime < (Date.now() + 10000)) {
        break;
    }
    
    console.log('Terminator patrol\n\n', prevBlockTime + '\n');
}, 10000)

app.use(express.static(path.join(__dirname, './frontend/build')));

app.use(express.static(path.resolve(__dirname, './frontend/build')));

// app.use(favicon(__dirname + './frontend/build/favicon.ico'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
    res.sendFile(path.resolve(__dirname, './frontend/build', 'favicon.ico'));
})
// app.use(express.static(path.join(__dirname, './frontend/build')));
    
    // app.get('*', (res, req) => {
    //     res.sendFile(path.join(__dirname + './frontend/build/index.html'));
    // })

let initHttpServer = (server) => {

    // app.use(express.static(path.join(__dirname, 'public')));
    // app.use(express.static(path.join(__dirname, './frontend/public')));
    

   const io = socketIo(server, {
       cors: {
           origin: 'http://localhost:3000'
       },
       pingTimeout: 180000, pingInterval: 25000
    })

    node.server = process.env.PORT || 'http://localhost:' + http_port;

    app.set('socketio', io);
    
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

        socket.on('debugrequest', () => {
            console.log(node);

            socket.emit('debug', node);
        })

        socket.on('aboutrequest', () => {
            let temp = about
            console.log(temp);
            socket.emit('about', about);
            
        })

        socket.on('confirmed', () => {
            console.log(confirmed);
            socket.emit('confirmedtransactions', confirmed());
        })

        socket.on('requestcoin', (address) => {
            const timeCheck = new Date(Date.now());
            const from = addressGenerator(MINT_PRIVATE_ADDRESS);
            const to = address;
            const amount = 1;
            const privateKey = MINT_PRIVATE_ADDRESS
            const transaction = {from, to, amount, privateKey};

            

            for(i=0; i < faucetRequestAddress.length; i++) {
                if(faucetRequestAddress[i] === address){
                    if(faucetRequestAddress[i+1] <= (timeCheck - 60000)) {

                        startCyberDyneChain.addTransaction(transaction);
                        startCyberDyneChain.minePendingTransactions(publicKey)
            
                        balance = startCyberDyneChain.getBalanceOfAddress(address)
                        // io.to("data-room").emit("data", JSON.stringify(blockchain));
                        socket.emit('sendcoin', balance)
                        
                        return;

                    } else {
                        let message = 'You have to wait 1 hour\n to get more faucet coin'
                        socket.emit('requestmessage', message)
                        console.log('sorry sucker; you already requested this hour');
                        
                        return; 
                    }   
                }
            }

            console.log(faucetRequestAddress);
            faucetRequestAddress.push(to,new Date(Date.now()));

            startCyberDyneChain.addTransaction(transaction);
            startCyberDyneChain.minePendingTransactions(publicKey)

            balance = startCyberDyneChain.getBalanceOfAddress(address)
            // io.to("data-room").emit("data", JSON.stringify(blockchain));
            socket.emit('requestmessage', '');
            socket.emit('sendcoin', balance)
           
        })
    })

    setInterval(() => {
        io.to("data-room").emit("data", JSON.stringify(blockchain));
       
    }, 5000);

    let counter = 0;

    const initMess = setInterval(() => {
        io.to("data-room").emit("debug", startCyberDyneChain.initMessages(counter))
        counter++;
        if(counter >= 8) {
            counter = 7;

            io.to("data-room").emit('showtable')
            clearInterval(initMess)
        }
    }, 3000)


    
   
   server.listen(process.env.PORT || http_port, (err) => {
    if(err) {
        console.log(err);
    }

    console.log("skynet running on port: ", http_port);
    console.log(node);
   })
}

initHttpServer(server);
// console.log(node);

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

    // let from = null;
            // let to = null;
            // let value = null;
            // idHolder = startCyberDyneChain.getLastBlock().id + 1;
            // startCyberDyneChain.addBlock(new Terminator(idHolder, new Date(Date.now()), new Transaction(from, to, value, new Date(Date.now()), 5, 'manual block added')));
            // io.to("data-room").emit("data", JSON.stringify(blockchain));