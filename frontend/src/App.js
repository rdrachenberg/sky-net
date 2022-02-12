import React, { Component, useState, useEffect } from 'react';
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import { MDBTable, MDBTableHead } from 'mdb-react-ui-kit';
import {io} from 'socket.io-client';


const defaultMessage = 'Here is some default text blase blase'

const App = () => {

  const [data, setData] = React.useState('working...');
  const [working, setWorking] = React.useState(false);

  React.useEffect(() => {
    const socket = io('http://localhost:3010');

    socket.on('connect', () => {
      console.log(socket.id);
    })

    socket.on('connect_error', () => {
      setTimeout(() => {
        socket.connect()}, 5000)
    })
    
    socket.on('data', (data) => {
      setWorking(true);
      setData(data);
    })

    socket.on('disconnect', () => {
      setData('server disconnected!')
    })
  })
  
  return (
    <MDBContainer fluid>
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <div className='text-center'>
        <h3 className='mb-3'>Cyberdyne Systems</h3>
          <img
            className='mb-4'
            src='https://cdn.pixabay.com/photo/2013/07/12/18/16/terminator-153160_960_720.png'
            style={{ width: 250, height: 400 }}
          />
          
          <p className='mb-3'>Welcome to the Revolution</p>
          <img
            className='mb-1'
            src='https://cdn.pixabay.com/photo/2019/05/22/10/24/power-button-4221127_960_720.jpg' 
            onClick={() => window.open('http://localhost:3010')}
            style={{ width: 150, height: 45, borderRadius: 10 }}
          />
          <div>
          <MDBTable>
          <MDBTableHead>
          <tr>
            <th scope='col'>Terminator #</th>
            <th scope='col'>Time</th>
            <th scope='col'>Hash</th>
            <th scope='col'>Previous Hash</th>
          </tr>
          
         
        </MDBTableHead>
        {/* {data.map((data) => 
            <tr key={data.id}>
              <td>{data.timestamp}</td>
              <td>{data.id}</td>
              <td>{data.id}</td>
              <td>{data.id}</td>
            </tr>
          )} */}
      </MDBTable>
      
          </div>
          <MDBBtn
            tag='a'
            href='http://localhost:3010/latest-block'
            
            role='button'
            
          >
            Start
          </MDBBtn>
        </div>
      </div>
      <div>
      {working? (
       
       <h5>{[data]}</h5>
      ) : (
        <h4>Working...</h4>
      )}

      
      </div>
      
      
        
    </MDBContainer>
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