const crypto = require('crypto'), SHA256 = data => crypto.createHash('sha256').update(data).digest('hex');
const socketIo = require('socket.io');
const EC = require('elliptic').ec, ec = new EC('secp256k1');
const { fork } = require('child_process');
