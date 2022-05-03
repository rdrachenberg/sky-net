import React, { useEffect, useState } from 'react';
import { MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCardText,
} from 'mdb-react-ui-kit';

export default function Modal(props) {
  const [basicModal, setBasicModal] = useState(true);

  const toggleShow = () => setBasicModal(!basicModal);
  
  // console.log(props.data);

  if(!basicModal) {
    console.log('here are the freaking props --- > ', props.data)
  }
  

  // const propsArray = Object.entries(props)[0];
  // console.log(propsArray);
  // setDataModal(propsArray)
  // console.log(dataModal);

  return (
    <>
    <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Terminator Block Info</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody key={props.timestamp}>
            <MDBCardText>
            ID: {props.data.id}
            </MDBCardText>
            <MDBCardText>
            Terminator: {props.data.nonce}
            </MDBCardText>
            <MDBCardText>
            Time: {props.data.timestamp}
            </MDBCardText>
            <MDBCardText >
              Hash: 
              <MDBCardText style={{fontSize: '13px'}}>
              {props.data.blockHash}
              </MDBCardText>
            </MDBCardText>
            <MDBCardText>
              Previous Hash: 
              <MDBCardText style={{fontSize: '13px'}}>
              {props.data.prevHash}
              </MDBCardText>
            </MDBCardText>
            <MDBCardText>
              From: {props.data.data.from}
            </MDBCardText>
            <MDBCardText>
              To: {props.data.data.to}
            </MDBCardText>
            <MDBCardText>
              Value: {props.data.data.value}
            </MDBCardText>
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={toggleShow}>
              Close
            </MDBBtn>
            <MDBBtn>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
    </>
  );
}