import  { Component, useState, useEffect, useCallback, Fragment } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody,  MDBBtn, MDBContainer, MDBCol  } from 'mdb-react-ui-kit';
import {io} from 'socket.io-client';
import { emit } from 'process';


const defaultMessage = 'Here is some default text blase blase'


const App = () => {

  const [data, setData] = useState([]);
  const [working, setWorking] = useState(false);
  const [messages, setMessages] = useState(['this is here'])
  const [latest, setLatest] = useState([])
  const [fullChain, setFullChain] = useState([])
  
  var socket = io('http://localhost:3010', {transports: ['websocket']});

  const handleLastClick = () => {
    socket.emit('last');
    let lengthResult = data.length -1;
    let newData = [data[lengthResult]];

    console.log('our last button click was clicked');
    console.log(data);
    // console.log('second data here --->\n', newData);
    //     setData([]);
    setData(newData);
  
  }

  const handleGetFullClick = () => {
    let wholeChain = fullChain;
    console.log('This is the full chain button click  ---->\n', wholeChain );

    setData(wholeChain);

  }

  const handleAddBlockClick = () => {
    console.log('That handle Add Block Click button was clicked')
  }
  useEffect(() => {
    
    // const socket = io('http://localhost:3010', {transports: ['websocket']});

    socket.on('connect', () => {
      console.log(socket.id);
    })
    // socket.on('last', (data) => {
    //   console.log('socket on last was hit');
    //   setData(data);
    // })

    socket.on('data', (data) => {
      setMessages('This is here')
      data = JSON.parse(data);

      if(!working) {
        setFullChain(data)
      }

      setWorking(true);
      console.log(data);
      
      setData(data);
      
    })

    

    socket.on('connect_error', () => {
      setTimeout(() => {
        socket.connect()}, 10000)
    })

    socket.on('disconnect', () => {
      setData('server disconnected!')
    })

    return () => {
      socket.disconnect();
    }
    }, []
  )
  
  return (
    <div className='container'>
    <MDBContainer>
      <div className='d-flex justify-content-center align-items-center'style={{ height: '100vh' }}
>
        <div className='text-center'>
        <h3 className='mb-3'>Cyberdyne Systems</h3>
          <img
            className='mb-4'
            src='https://cdn.pixabay.com/photo/2013/07/12/18/16/terminator-153160_960_720.png'
            style={{ width: 250, height: 400 }}
          />
          
          <p className='mb-3'>Welcome to the Revolution</p>
          
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
          </div>
          <div id='table-container'>
          <MDBTable className='table-responsive'>
            <MDBTableHead dark>
            <tr>
              <th scope='col'>Terminator#</th>
              <th scope='col'>Time</th>
              <th scope='col'>Hash</th>
              <th scope='col'>Previous Hash</th>
            </tr>
          </MDBTableHead>
          <tbody>
                {data.map((item) => {
                  const { id, timestamp, nonce, blockHash, prevHash, data} = item;
                  const {sender, receiver, amount} = data;
                  return (
                    <tr key = {id} >
                      <td>{id}</td>
                      <td>{timestamp}</td>
                      <td>{blockHash}</td>
                      <td>{prevHash}</td>
                    </tr>
                  )
                })}
        </tbody>
        </MDBTable>
        </div>
        
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