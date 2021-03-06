# sky-net
#### A simple JS blockchain with a REACT.js front end utilizing websockets. Warning- Forking or running may cause sky-net to become active. Watchout for roaming Terminators if this happens 😊 [Heroku Deployed](https://cyberdyne-sky-net.herokuapp.com/) 

<p align='center'>
    <img src='https://img.shields.io/badge/JavaScript-93.5%25-brightgreen?style=plastic&logo=javascript'>
    <img src='https://img.shields.io/badge/CSS-3.9%25-green?style=plascit&logo=CSS3&logoColor=green'>
    <img src='https://img.shields.io/badge/HTML-2.6%25-orange?style=plastic&logo=HTML5&logoColor=orange'>
    <a href='https://github.com/rdrachenberg'>
        <img src='https://img.shields.io/badge/Node%20-.js-success?style=plastic&logo=Node.js&logoColor=success'>
        <img src='https://img.shields.io/badge/React%20-17.0.1-informational?style=plastic&logo=React&logoColor=#61DAFB'>
    </a>
    <a href='https://github.com/rdrachenberg'>
        <img src='https://img.shields.io/badge/Made%20by-rDrachenberg-blue?style=plastic&logo=visual-studio-code&logoColor=blue'>
    </a> 
    <img src= 'https://img.shields.io/github/issues/rdrachenberg/ryan-react-app?style=plastic' />
    <img src= 'https://img.shields.io/github/license/rdrachenberg/ryan-react-app?style=plastic' />
    <a href='mailto:RyanDrachenberg@gmail.com'>
        <img src='https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg?logo=minutemailer&logoColor=#29B99B'>
    </a>
</p>
<p align='center'>
    <a href='https://cyberdyne-sky-net.herokuapp.com/' >
        <img src='https://img.shields.io/badge/Heroku-Deployed-blue?style=for-the-badge'>
    </a>
    </br>
    <a href='https://ryan-react-app.herokuapp.com/' >
        <img src='https://media.giphy.com/media/UQ1PjoQWY9XrejfOGC/giphy.gif' width=150>
    </a>
</p>

</br>

### A blockchain written in Javascript utilizing websockets through Socket.io.

#### adapted using this tutorial: [Creating a blockchain with Javascript](https://www.youtube.com/watch?v=zVqczFZr124)

</br>

### Tech Stack - 

    Express.js, React.js, Node.js Socket.io

### Clone the app
    In your terminal run:
    git clone -b forked https://github.com/rdrachenberg/sky-net.git

### Start the App
    npm run dev

### NEEDED Enviroment Variables 
    Create a .env file 
    Add the following enviroment variables:

    MINT_PRIVATE_ADDRESS
    MINT_PUBLIC_ADDRESS
    NODE_PRIVATE_KEY

    If you dont have any of keys, you can use the keygen.js file to generate your own. 

### Home Page

<img src="./assets/Home page.png">
</br>
</br>
<img src="./assets/HomePage2.png">
</br>
</br>

### Operations

<img src="./assets/LastBlock.png">
</br>
</br>
<img src="./assets/LastBlockResponse.png">
</br>
</br>
<img src="./assets/FullChain.png">
</br>
</br>
<img src="./assets/FullChainResonse.png">
</br>
</br>
<img src="./assets/DebugInfo.png">
</br>
</br>
<img src="./assets/DebugResponse.png">
</br>
</br>
<img src="./assets/About.png">
</br>
</br>
<img src="./assets/AboutResponse.png">
</br>
</br>
<img src="./assets/Confirmed.png">
</br>
</br>
<img src="./assets/ConfirmedResponse.png">
</br>
</br>

### Generate Key Pair  
<p align='left'>
    <img src="./assets/GenerateKeyPair.png">
    <img src="./assets/GeneratedKeyPair.png">
</p>
</br>
</br>

### Send a Transaction
<p align='left'>
<img src="./assets/SendTransaction.png">
</p>
<br />
    Click send, then click the add block button to mine the transaction and add it to the blockchain
<br />
<p align='left'>
<img src="./assets/AddBlock.png">
</p>
</br>
</br>

### Request a Coin
<p align='left'>
<img src="./assets/RequestCoin.png">
<img src="./assets/RequestedCoin.png">
</p>
</br>
</br>



#### Get the Balance of a Given Address
<img src="./assets/GetBalance.png">
</br>
</br>

### Root File Structure