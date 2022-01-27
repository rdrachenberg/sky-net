import React from 'react';
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';

function App() {
  return (
    <MDBContainer fluid>
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <div className='text-center'>
        <h3 className='mb-3'>
            Cyberdyne Systems
          </h3>
          <img
            className='mb-4'
            src='https://cdn.pixabay.com/photo/2013/07/12/18/16/terminator-153160_960_720.png'
            style={{ width: 250, height: 400 }}
          />
          
          <p className='mb-3'>Welcome to the Revolution</p>
          <img
            className='mb-1'
            src='https://cdn.pixabay.com/photo/2019/05/22/10/24/power-button-4221127_960_720.jpg'
            style={{ width: 150, height: 45, borderRadius: 10 }}
          />
          <div></div>
          <MDBBtn
            tag='a'
            href='http://localhost:3010/latest-block'
            target='_blank'
            role='button'
            
          >
            Start
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
}

export default App;
