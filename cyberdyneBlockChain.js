require('dotenv').config();
const Transaction = require('./transactions');
const GENESIS_BLOCK = require('./genesis');
const crypto = require('crypto'), SHA256 = message => crypto.createHash('sha256').update(message).digest('hex');
const express = require('express');
const bodyParser = require('body-parser');
// const { createWallet } = require('./wallet');
const {createWallet, validateWallet} = require('./wallet');
const Terminator = require('./block');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);

class CyberDyneChain {
    constructor() {
        this.skynet_chain = [this.mineGenesisBlock()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.miningReward = 1000;
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
        console.log(firstHash);
        // new Terminator(i, date, {sender: `JoMama${i}`, receiver: "Ryan of course", amount: amounts}));
        return new Terminator(1, new Date(Date.now()), {sender: 'Dev', receiver: 'Cyberdyne Systems', amount: 1}, firstHash);
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

    addTransaction(transaction) {
        if(!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('The transaction must include a To and From address(s). Please properly format your data!')
        }

        if(!transaction.isValid()) {
            throw new Error('You cannot add an invalid Terminator to Skynet(s) chain!! Check yourself! ')
        }

        this.pendingTransactions.push(transaction); //* this is the mempool
    }

    minePendingTransactions(miningRewardAddress) {
        const latestBlock = this.getLastBlock(this.getHeight());
        let i = startCyberdyneChain.this.nonce;
        let date = new Date(Date.now());
        let block = new Terminator(i, date, this.pendingTransactions, latestBlock.blockHash);

        block.mineBlock(this.difficulty);

        console.log('New Terminator mined! Skynet is growing!');
        this.skynet_chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for(const terminator of this.skynet_chain) {
            for(const transaction of terminator.data){

                if(terminator.addressFrom === address){
                    balance -= amount;
                }

                if(transaction.addressTo === address) {
                    balance += amount;
                }
            }
        }

        return balance
    }

    isValid() {
        for(let i = 1; i < this.skynet_chain.length; i++) {
            const currentBlock = this.skynet_chain[i];
            const previousBlock = this.skynet_chain[i -1];

            if(!currentBlock.transactionIsValid()) {
                return false;
            }

            if(currentBlock.blockHash !== currentBlock.makeHash()) {
                console.log('Hash does not compute: ', JSON.stringify(currentBlock));
                return false;
            }

            if(currentBlock.prevHash !== previousBlock.makeHash()) {
                console.log('The previous hash does not match. Check yoself! ', JSON.stringify(currentBlock));
                return false;
            }
        }
        return true;
    }
}

module.exports = CyberDyneChain;

/*
 const app = express();
    const server = createServer(app);
   
    const corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200
    };

    app.use(cors(corsOptions));
    app.disable('x-powered-by');

    app.use(function (req, res, next, err) {
        // Website to allow to connect  || 'http://localhost:3000' 'https://ryan-react-app.herokuapp.com' || 
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // True if the website needs to include cookies in the requests sent
        // to the API (e.g. in case of sessions use)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.status(200).send(blockchain);

    });

    app.get('/blocks', (req, res) => {
        res.send(blockchain);
        
    });

    app.post('/mine-new-block', (req, res) => {
        let newBlock = req.body.data;
        let id = blockchain[blockchain.length -1].id + 1;
        startCyberDyneChain.addBlock(new Terminator(id, new Date(Date.now()), newBlock))
        
        console.log('block addded: ', JSON.stringify(startCyberDyneChain.getLastBlock()));
        res.send(JSON.stringify(newBlock));
    });

    app.get('/latest-block', (req, res) => {
        let latest =  blockchain[blockchain.length -1];
        
        res.send(latest);
        
        console.log('Here is the latest transaction ---> : ', latest);
    })

    app.get('/peers', (req, res) => {
        res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
    });

    app.post('/add-peer', (req, res) => {
        connectToPeers([req.body.peer]);
        res.send(req.body.peer); 
    })

    app.listen(http_port, () => console.log('Skynet is alive! \nPort listening on : ', http_port));
    initP2PServer(server)

    const initP2PServer = (server) => {
    // var server = createServer()
    const wss1 = new WebSocketServer({noServer: true});
    
    wss1.on('connection', function connection(){
        ws.send(blockchain);
    });

    server.on('upgrade', function upgrade(request, socket, head) {
        const {pathname} = parse(request.url);
        
        if(pathname === '/latest-block') {
            ws.handleUpgrade(requeswt, socket, head, function done(ws) {
                ws.emit('connection', ws, request);
            })

        } else {
            socket.destroy();
        }     
    })
    // server.listen(6010);
    console.log('Also listening on p2p port: ', ptp_port);


};

const connectToPeers = (newPeers) => {
    console.log(newPeers);
    newPeers.forEach(e => {
        const ws = new WebSocket(e);
        ws.on('open', () => initConnection(ws));
        ws.on('open', () => {
            console.log('Connected peer hit: ');
            ws.send(blockchain);
        });
        ws.on('error', () => {
            console.log('Connection to Skynet failed! \n Please restart T1 Specs')
        })
    });
}
const initConnection = (ws) => {
    const server = createServer();
    
    console.log('This was freaking hit');

};

const responseLatestMsg = () => ({
    'type': MessageType.RESPONSE_BLOCKCHAIN,
    'data': JSON.stringify(blockchain)
});

const initMessageHandler = (ws) => {
   ws.on('connection', function connection(ws){
       ws.on('message', function message(data) {
           console.log('Got the following WS data: ', data);
       });
       ws.send(blockchain);
   })
};

const initErrorHandler = (ws) => {
    var closeConnection = (ws) => {
        console.log('Connection to Peer Failed: ' + ws.url);
        sockets.splice(sockets.indexOf(ws), 1);
    };
    ws.on('close', () => closeConnection(ws));
    ws.on('error', () => closeConnection(ws));
};

var handleBlockchainResponse = (message) => {
    // console.log('here is the message being passed in:', message)
    const receivedBlocks = JSON.parse(message.data).sort((b1, b2) => (b1.id - b2.id));
    var latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];
    var latestBlockHeld = blockchain[blockchain.length -1];
    if (latestBlockReceived.index > latestBlockHeld.index) {
        console.log('blockchain possibly behind. We got: ' + latestBlockHeld.index + ' Peer got: ' + latestBlockReceived.index);
        if (latestBlockHeld.hash === latestBlockReceived.previousHash) {
            console.log("We can append the received block to our chain");
            blockchain.push(latestBlockReceived);
            broadcast(responseLatestMsg());
        } else if (receivedBlocks.length === 1) {
            console.log("We have to query the chain from our peer");
            broadcast(queryAllMsg());
        } else {
            console.log("Received blockchain is longer than current blockchain");
            replaceChain(receivedBlocks);
        }
    } else {
        console.log('Received blockchain is same length as the current blockchain. Do nothing');
    }
};

const write = (ws, message) => ws.send(JSON.stringify(message));
const broadcast = (message) => sockets.forEach(socket => write(socket, message));

// let generateNextBlock = (blockData) => {
//     var previousBlock = startCyberDyneChain.getLastBlock();
//     var nextIndex = previousBlock.id + 1;
//     var nextTimestamp = new Date().getTime() / 1000;
//     var nextHash = startCyberDyneChain.makeHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
//     return new Terminator(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
// };
var queryChainLengthMsg = () => ({'type': MessageType.QUERY_LATEST});

// connectToPeers(startPeers)
// initHttpServer();
// initP2PServer(); 
*/