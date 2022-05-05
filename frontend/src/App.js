import  { Component, useState, useEffect, useCallback, Fragment, useRef } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody,  MDBBtn, MDBContainer, MDBCol, MDBRow, MDBIcon, MDBCard, MDBCardBody, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';
import {io} from 'socket.io-client';
import { emit } from 'process';
import Modal from './blockchainModal';


const defaultMessage = 'Here is some default text blase blase'


const App = () => {
  const socket = useRef();
  const [data, setData] = useState([]);
  const [working, setWorking] = useState(false);

  const [messages, setMessages] = useState(false);
  const [latest, setLatest] = useState([]);

  const [transaction, setTransaction] = useState('');
  const [fullChain, setFullChain] = useState(false)

  const [keyPair, setKeyPair] = useState([]);
  const [keyPairData, setKeyPairData] = useState(false)
  const [balance, setBalance] =useState([])
  const [balanceTransfer, setBalanceTransfer] = useState(false);

  const [toggle, setToggle] = useState(false);
  const [showLoadingImg, setShowLoadingImg] = useState(true);
  const [showTable, setShowTable] = useState(false)
  const [modelNum, setModelNum] = useState(-1);
  const [interactMessages, setinteractMessages] = useState('')
  
  const inputTo = useRef();
  const inputFrom = useRef();
  const inputAmount = useRef();

  const inputAccount = useRef();
  const inputPrivateKey = useRef();

  const inputCoinRequest = useRef();

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
    e.preventDefault();
    
    socket.current.emit('keygen');
    setKeyPairData(true);
    // setKeyPair(keygen);
  }

  const handleCheckBalanceClick = (e) => {
    e.preventDefault();
    const address = inputAccount.current.value;
    socket.current.emit('balance', address);
  }
  const handleRequestCoinClick = (e) => {
    e.preventDefault();
    const address = inputCoinRequest.current.value;
    socket.current.emit('requestcoin', address);
  }

  const handleToggleImg = (e) => {
    e.preventDefault();
    
    setShowLoadingImg(!showLoadingImg);
  }

  const handleCopyPublicKey = (e) => {
    e.preventDefault();
    
    console.log(e)
    let pub = keyPair[0].keys.publicKey;

    console.log(pub)
    navigator.clipboard.writeText(pub);
  }

  const handleDebugReqeust = (e) => {
    e.preventDefault();
    console.log('the handleDebugReqeust button was clicked!!!!')
    socket.current.emit('debugrequest');
  }

  const handleModal = (e) => {
    e.preventDefault();
    setToggle(!toggle);
    console.log(e.currentTarget.getAttribute('id'));
    setModelNum(e.currentTarget.getAttribute('id'))
    console.log(toggle);
  }

  const handleAboutRequest = (e) => {
    e.preventDefault();
    console.log('the handle About Request Button was Click -->> ');

    socket.current.emit('aboutrequest');
  }

  useEffect(() => {
    socket.current = io('ws://localhost:8000');

    socket.current.on('connect', () => {
      console.log(socket.current.id);
    })

    socket.current.on('data', (data) => {
      // setMessages('This is here')
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
      setKeyPair(keygen);
      console.log('Keygen hit')
      
    })

    socket.current.on('sendbalance', (balance) => {
      setBalance(balance)
      console.log('here is the balance ---> ',balance)
    })
    
    socket.current.on('sendcoin', (balance) => {
      setBalance(balance)
      setBalanceTransfer(true);
      console.log('here is the balance ---> ',balance)
    })

    socket.current.on('debug', (node) => {
      console.log('here is the NODE info ----> ', node)
      setinteractMessages(node)
    })

    socket.current.on('about', (about) => {
      console.log('Here is the Abmout var --->>>>',about);
      
      setinteractMessages(about)
    })

    socket.current.on('showtable', () => {
      setShowTable(true);
    })

    socket.current.on('requestmessage', (message) => {
      console.log(message);
      setMessages(message);
    })

    socket.current.on('connect_error', () => {
      setTimeout(() => {
        socket.current.connect()}, 10000)
    })

    socket.current.on('disconnect', () => {
      setMessages('server disconnected!')
      console.log('server is disconnected! *')
    })

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
            
            {showLoadingImg ? <h2 onClick={handleToggleImg}>CyberDyne Systems Terminator Chain</h2>
            :
            <div id='hidden-robot'>
            <MDBCol>
              <h2 onClick={handleToggleImg}>CyberDyne Systems Terminator Chain 
              <b/>   
                  
              </h2>
              <img style={{maxWidth: '40px'}} src='https://cdn.pixabay.com/photo/2013/07/12/18/16/terminator-153160_960_720.png' onClick={handleToggleImg}/>
              </MDBCol>
              
              
            </div> 
            }
            
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
            onClick={handleToggleImg}
          />
          <h3>Welcome to the Revolution</h3>
          </div>
         : <></>}

         <div >
         <MDBRow >
         <MDBCol></MDBCol>
          <MDBCol className='key-card' style={{width: "1000px", backgroundColor: "black", padding: '1%', color:'white', wordWrap: 'break-word'}}>
            <div >{interactMessages}</div>
          </MDBCol>
          <MDBCol></MDBCol>
          </MDBRow>
        </div>
        {showTable?
          <div id='table-container'>
          <MDBTable striped className='table-responsive'>
            <MDBTableHead dark>
            <tr>
              <th scope='col'>Mint ID</th>
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
              {/* let tmpData = {...data[0]}
              const {from, to, value} = tmpData; */}
            
              
            const {from, to, value} = data;
              return (
                <tr key = {id} onClick={handleModal} id={id}>
                  <td>{id}</td>
                  <td>{nonce}</td>
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
      </div>: <></>}
          
      {toggle? 
        <div>
        {data.map((item) => {
          console.log(item)
          let tmp = item;
          console.log(modelNum)
          return (
            
            <Modal data={tmp} />
          )
        })}
       
        </div>
      :
      <></>  
    }
    
      <MDBRow>
          <div className='interact'>
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
              <MDBCol>
                <MDBBtn tag='a' outline color='warning' role='button' onClick={handleDebugReqeust}>Debug</MDBBtn>
              </MDBCol>
              <MDBCol>
                <MDBBtn tag='a' outline color='info' role='button' onClick={handleAboutRequest}>About</MDBBtn>
              </MDBCol>
              
            </div>
          </div>
        </MDBRow> 
        <div>
        <MDBRow>
        <MDBCol className='flex-row'>
        {keyPairData? 
          <div className='key-card'>
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
          <div className='key-card'>
            <MDBCard className='key-card'>
              <MDBCardImage src='https://cdn.pixabay.com/photo/2017/03/03/13/56/key-2114046_960_720.jpg' alt='...' position='top' />
              <MDBCardBody>
                <MDBCardText id='private-key'>
                Private Key: 
                </MDBCardText>
                <MDBCardText id='public-key'>
                Public Address:
                </MDBCardText>
                <MDBBtn tag='a' color='primary' role='button' onClick={handleKeyGeneration}>Generate KeyPair</MDBBtn>
              </MDBCardBody>
            </MDBCard> 
          </div>
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
        <MDBCard className='key-card'>
          <MDBCardImage src='https://cdn.pixabay.com/photo/2019/11/09/06/00/question-4612922_960_720.jpg' alt='...' position='bottom' />
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
              defaultValue={'0x6539306131623561393631346330396530386166'}
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
        </MDBCard>
        </MDBCol>
        <MDBCol>
        <MDBCard className='key-card'>
          <MDBCardImage src='https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/3RA7OPCYCVGZBCE22HNF6CZXZY.jpg' alt='...' position='top' />
        <form className='balance-card'>
            <p className="h4 text-center mb-4">Request 1 Coin</p>
            
            <label htmlFor="address" className="grey-text">
              Your Address
            </label>
            <input
              ref={inputCoinRequest}
              type="text"
              id="address"
              className="form-control"
            />
            <br />
            <div className='faucet'>
              
              {messages? <MDBCardText>{messages}</MDBCardText>
              : 
              <MDBCardText>
              {balanceTransfer? <>Done:  ✅</>: <>Click below to request</>}
              </MDBCardText>}
             
            </div>
            <div className="text-center mt-4">
              <MDBBtn color="warning" type="submit" onClick={handleRequestCoinClick}>
                Request Token
                <b/>
                <MDBIcon far icon="paper-plane" className="ml-2" />
              </MDBBtn>
            </div>
            
          </form>
        </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBRow>
      <MDBCol></MDBCol>
        <MDBCol></MDBCol>
        <MDBCol></MDBCol>
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