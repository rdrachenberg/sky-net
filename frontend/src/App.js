import  { Component, useState, useEffect, useCallback, Fragment, useRef } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody,  MDBBtn, MDBContainer, MDBCol, MDBRow, MDBIcon, MDBCard, MDBCardBody, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';
import {io} from 'socket.io-client';
import { emit } from 'process';
import ModalPage from './blockchainModal';


const defaultMessage = 'Here is some default text blase blase'


const App = () => {
  const socket = useRef();
  const [data, setData] = useState([]);
  const [working, setWorking] = useState(false);

  const [messages, setMessages] = useState(['this is here']);
  const [latest, setLatest] = useState([]);

  const [transaction, setTransaction] = useState('');
  const [fullChain, setFullChain] = useState(false)

  const [keyPair, setKeyPair] = useState([]);
  const [balance, setBalance] =useState([])

  const [toggle, setToggle] = useState(false);
  const [showLoadingImg, setShowLoadingImg] = useState(true);
  
  const inputTo = useRef();
  const inputFrom = useRef();
  const inputAmount = useRef();

  const inputAccount = useRef();
  const inputPrivateKey = useRef();

  const handleLastClick = () => {
   
    let lengthResult = data.length -1;
    let newData = [data[lengthResult]];

    console.log('our last button click was clicked');
    console.log(newData);
    
    setData(newData);
  
  }

  const handleGetFullClick = () => {
    let wholeChain = fullChain;
    console.log('This is the full chain button click  ---->\n', wholeChain );

    setData(wholeChain);

  }

  const handleAddBlockClick = () => {
    console.log('That handle Add Block Click button was clicked')
    socket.current.emit('add-block');
    // socket.emit('data');
  }

  const handleAddTransactionClick = (e) => {
    e.preventDefault();
    console.log('That handle Add Transaction Click button was clicked')
    // console.log(e);
    const from = inputFrom.current.value;
    const privKey = inputPrivateKey.current.value;
    const to = inputTo.current.value;
    const amount = inputAmount.current.value;
    
    setTransaction(from, to, amount);

    console.log(from, to, amount); 

    const transaction = { 
                          from: from, 
                          to: to, 
                          amount: amount,
                          privateKey: privKey
                        }

    socket.current.emit('transaction', (transaction))
    
    // clean up inputs 
    inputFrom.current.value = '';
    inputTo.current.value = '';
    inputAmount.current.value = '';
    inputPrivateKey.current.value = '';
    // socket.emit('data');
  }

  const handleKeyGeneration = (e) => {
    // e.preventDefault();
    socket.current.emit('keygen');
    // setKeyPair(keygen);
  }

  const handleCheckBalanceClick = (e) => {
    e.preventDefault();
    const address = inputAccount.current.value;
    socket.current.emit('balance', address);
  }

  const handleCopyPublicKey = (e) => {
    e.preventDefault();
    
    console.log(e)
    let pub = keyPair[0].keys.publicKey;

    console.log(pub)
    navigator.clipboard.writeText(pub);
  }

  const handleModal = (e) => {
    e.preventDefault();
    setToggle(true);
  }

  useEffect(() => {
    socket.current = io('ws://localhost:8000');

    socket.current.on('connect', () => {
      console.log(socket.current.id);
    })

    socket.current.on('data', (data) => {
      setMessages('This is here')
      data = JSON.parse(data);

      setFullChain(data)
      setWorking(true);

      setData(data);
      console.log(data);

      if(data && data !== undefined){
        data.current.addEventListener('DOMNodeInserted', event => {
          const {currentTarget: target} = event;
          // console.log(target)
          target.scrollIntoView({top: target.scrollHeight, behavior: 'smooth'});
          
        });
      }
    })

    socket.current.on('keygeneration', (keygen) => {
      console.log( 'this is whats comming back as keyPair on click ---> ', keygen);
      // if(keyPair) {
      //   // console.log('IS THIS FREKING EVER HIT?');
      //   let temp = [];

      //   setKeyPair(temp);
      //   setKeyPair(keygen);

      //   console.log('Keygen hit 2nd time!!')
      // }
      setKeyPair(keygen);
      console.log('Keygen hit')
      
    })

    socket.current.on('sendbalance', (balance) => {
      setBalance(balance)
      console.log('here is the balance ---> ',balance)
    })

    socket.current.on('connect_error', () => {
      setTimeout(() => {
        socket.current.connect()}, 10000)
    })

    socket.current.on('disconnect', () => {
      setMessages('server disconnected!')
      console.log('server is disconnected! *')
    })

    setTimeout(() => {
      setShowLoadingImg(false);
    }, 5000);

    return () => {
      socket.current.disconnect(false);
    }
  },[])

  return (
    <div className='container'>
    <MDBContainer>
      <div>
        <div className='text-center'>
        <MDBRow>
          <div className='interact-header'>
            <h2>
           CyberDyne Systems Terminator Chain
            </h2>
            <div id='button-div' className='d-flex align-items-start mb-3'>
              <MDBCol>
                <MDBBtn tag='a' outline color='primary'role='button' onClick={handleLastClick}>Get last block</MDBBtn>
              </MDBCol>
              <MDBCol>
                <MDBBtn tag='a' outline color='info' role='button' onClick={handleGetFullClick}>Get full chain</MDBBtn>
              </MDBCol>
              <MDBCol>
                <MDBBtn tag='a' outline color='warning' role='button' onClick={handleAddBlockClick}>Add Block</MDBBtn>
              </MDBCol>
              <MDBCol>
                <MDBBtn tag='a' outline color='danger' role='button' onClick={handleKeyGeneration}>Generate Keys</MDBBtn>
              </MDBCol>
              
            </div>
          </div>
        </MDBRow>
        {showLoadingImg?
        <div>
          <img
            className='mb-4'
            src='https://cdn.pixabay.com/photo/2013/07/12/18/16/terminator-153160_960_720.png'
            style={{ flex: 1, width: 250, height: 400, resizeMode: 'contain' }}
          />
          <h3>Welcome to the Revolution</h3>
          </div>
         : <></>}
          <div id='table-container'>
          <MDBTable striped className='table-responsive'>
            <MDBTableHead dark>
            <tr>
              <th scope='col' style={{maxwidth: "10%"}}>Terminator#</th>
              <th scope='col'>Time</th>
              <th scope='col'>Hash</th>
              <th scope='col'>Previous Hash</th>
              <th scope='col'>Sender</th>
              <th scope='col'>Receiver</th>
              <th scope='col'>Amount</th>

            </tr>
          </MDBTableHead>
          <tbody>
                {data.map((item) => {
                  const { id, timestamp, nonce, blockHash, prevHash, data} = item;
                  const {from, to, value} = data;
                  return (
                    <tr key = {id} >
                      <td onClick={handleModal}>{id}</td>
                      <td>{timestamp}</td>
                      <td>{blockHash}</td>
                      <td>{prevHash}</td>
                      <td>{from}</td>
                      <td>{to}</td>
                      <td>{value}</td>
                    </tr>
                  )
                })}
        </tbody>
        </MDBTable>
      </div> 
        <div>
        <MDBRow>
        <MDBCol>
        {keyPair? 
          <div>
            {keyPair.map((pairs) => {
                const {keys} = pairs;
                const {privateKey, publicKey} = keys;
                return (
                  <MDBCard className='key-card' key ={privateKey}>
                    <MDBCardImage src='https://cdn.pixabay.com/photo/2017/03/03/13/56/key-2114046_960_720.jpg' alt='...' position='top' />
                    <MDBCardBody>
                      <MDBCardText id='private-key'>
                      Private Key: {privateKey}
                      </MDBCardText>
                      <MDBCardText id='public-key' onClick={handleCopyPublicKey}>
                      Public Address: {publicKey}
                      </MDBCardText>
                      <MDBBtn tag='a' color='primary' role='button' onClick={handleKeyGeneration}>Generate Another KeyPair</MDBBtn>
                    </MDBCardBody>
                  </MDBCard> 
                )
              })}
          </div>
        :
          (() => {
            return (
              <MDBCard className='key-card'>
              <MDBCardImage src='https://cdn.pixabay.com/photo/2017/03/03/13/56/key-2114046_960_720.jpg' alt='...' position='top' />
              <MDBCardBody>
                <MDBCardText id='private-key'>
                Private Key: 
                </MDBCardText>
                <MDBCardText id='public-key'>
                Public Key:
                </MDBCardText>
                <MDBBtn tag='a' color='primary' role='button' onClick={handleKeyGeneration}>Generate a KeyPair</MDBBtn>
              </MDBCardBody>
            </MDBCard> 
            )
          })
            
          
         } 
         </MDBCol>
        <MDBCol>
          <form className='submit-card glowing'>
            <p className="h4 text-center mb-4">Submit transaction</p>
            <label htmlFor="fromAddress" className="grey-text">
              From
            </label>
            <input
              ref={inputFrom}
              type="text"
              id="from"
              className="form-control"
            />
            <br />
            <label htmlFor="privateKey" className="grey-text">
              Private Key
            </label>
            <input
              ref={inputPrivateKey}
              type="text"
              id="private"
              className="form-control"
            />
            <br />
            <label htmlFor="toAddress" className="grey-text">
              To
            </label>
            <input
              ref={inputTo}
              type="text"
              id="to"
              className="form-control"
            />
            <br />
            <label htmlFor="amount" className="grey-text">
              Amount
            </label>
            <input
              ref={inputAmount}
              type="text"
              id="amount"
              className="form-control"
            />
            <br />
            
            <div className="text-center mt-4">
              <MDBBtn color="success" type="submit" onClick={handleAddTransactionClick}>
                Send 
                <MDBIcon far icon="paper-plane" className="ml-2" />
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
        <MDBCol>
        <form className='balance-card'>
            <p className="h4 text-center mb-4">Get balance</p>
            
            <label htmlFor="address" className="grey-text">
              Address
            </label>
            <input
              ref={inputAccount}
              type="text"
              id="address"
              className="form-control"
            />
            <br />
            <div className='account-balance'>
              <MDBCardText>
                Account Balance: {balance}
              </MDBCardText>
            </div>
            <div className="text-center mt-4">
              <MDBBtn color="danger" type="submit" onClick={handleCheckBalanceClick}>
                Check Balance 
                <MDBIcon far icon="paper-plane" className="ml-2" />
              </MDBBtn>
            </div>
            
          </form>
              
        </MDBCol>
      </MDBRow>
      </div>
        </div>
      </div>
    </MDBContainer>
    </div>
  );
}
  
export default App;
// import WebSocket from 'ws';
// // import { createServer } from 'http';
// // import { WebSocketServer } from 'ws';

// // const server = createServer();
// // const wss = new WebSocket('ws://localhost:3010');
// // const ws = useWebSocket({
// //   socketUrl: 'ws://localhost:3010'
// // });
// function useWebSocketLite({
//   socketUrl,
//   retry: defaultRetry = 3,
//   retryInterval = 1500
// }) {

//  // message and timestamp
//  const [data, setData] = useState();
//  // send function
//  const [send, setSend] = useState(() => () => undefined);
//  // state of our connection
//  const [retry, setRetry] = useState(defaultRetry);
//  // retry counter
//  const [readyState, setReadyState] = useState(false);

//  useEffect(() => {
//    const ws = new WebSocket(socketUrl);
//    ws.onopen = () => {
//      console.log('Connected to socket');
//      setReadyState(true);

//      // function to send messages
//      setSend(() => {
//        return (data) => {
//          try {
//            const d = JSON.stringify(data);
//            ws.send(d);
//            return true;
//          } catch (err) {
//            return false;
//          }
//        };
//      });

//      // receive messages
//      ws.onmessage = (event) => {
//        const msg = formatMessage(event.data);
//        setData({ message: msg, timestamp: getTimestamp() });
//      };
//    };

//    // on close we should update connection state
//    // and retry connection
//    ws.onclose = () => {
//      setReadyState(false);
//      // retry logic
//      if (retry > 0) {
//        setTimeout(() => {
//          setRetry((retry) => retry - 1);
//        }, retryInterval);
//      }
//    };
//     // terminate connection on unmount
//    return () => {
//      ws.close();
//    };
//  // retry dependency here triggers the connection attempt
//  }, [retry]); 

//  return { send, data, readyState };
// }

// // small utilities that we need
// // handle json messages
// function formatMessage(data) {
//  try {
//    const parsed = JSON.parse(data);
//    return parsed;
//  } catch (err) {
//    return data;
//  }
// }