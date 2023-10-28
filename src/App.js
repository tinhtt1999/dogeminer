import { Routes, Route, Link} from 'react-router-dom';
import logo from './media/logo.png'
import ic1 from './media/icons8-telegram-48.png'
import ic2 from './media/icons8-twitter-64.png'
import ic3 from './media/icons8-whitepaper-64.png'
import ic4 from './media/icons8-error-30.png'
import $ from "jquery"
import './App.css';
import Home from './compoments/Home'
import Price from './compoments/price'
import Missions from './compoments/missions'
import Game from './compoments/game'
import Account_page from './compoments/account'
import 'animate.css';
import ABI_MINING from './json/mining.json';
import ABI_TOKEN from './json/token.json';
import Web3 from 'web3';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
export var account = null;
export const BSC_ID = 56;
export const hexBSC_ID = 0x38;
export var contract_mining = null;
export var contract_token = null;
export var web3;
export const address_mining = "0x11C58D68129d8900a1858E62bBCe029154E87026";
export const address_token = "0xcac7b1C8DaA84d436F6f52Bef4daFD937D080fF0";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0FKpU9uS0Pj2sS1GmbzE8RjsP8I5OLSs",
  authDomain: "tinh1-74439.firebaseapp.com",
  projectId: "tinh1-74439",
  storageBucket: "tinh1-74439.appspot.com",
  messagingSenderId: "139483286210",
  appId: "1:139483286210:web:81c789170746f64fdf095b",
  measurementId: "G-GGZ7JCR9C2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase();
function App() {
  web3 = new Web3(window.ethereum);
  setTimeout(() => {
  }, 500);
  window.addEventListener('scroll', () => {
    let position = window.scrollY;
    if(position >60){
      $('header').removeClass('animate__animated animate__fadeInDown')
      $('header').addClass('animate__animated animate__fadeOutUp')
    }
    else{
      $('header').removeClass('animate__animated animate__fadeOutUp')
      $('header').addClass('animate__animated animate__fadeInDown')
    }
  })
  const click_nav = (event) =>{
    change_style(event.currentTarget.className)
  }
  setTimeout(() => {
    switch (window.location.href.substring(22)){
      case "pricing":
        change_style("nav_2");
        break;
      case "missions":
        change_style("nav_3");
        break;
      case "game":
        change_style("nav_4");
        break;
      case "account":
        change_style("nav_5");
        break;
      default:
        change_style("nav_1");
        break;
    }
  }, 500);
  function change_style(name){
    
    for(let i=1; i<=5; i++){
      if(name == `nav_${i}`){
        $(`.nav_${i}`).css('color','#ffe400');
      }
      else{
        $(`.nav_${i}`).css('color','white')
      }
    }
  }

  var statusWallet =false;
  var currentChainId = null;
  function accessWallet(){
    if(account == null && statusWallet == false){
      loginWithMetaMask();
    }
    else if(account != null && statusWallet == true){
      logoutMetaMask();
    }
  }
  async function loginWithMetaMask() {
    if (!window.ethereum) {
        window.open('https://metamask.io/download/')
    }
    const success_request_accout = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((e) => {
      console.error(e.message)
      return
    })
    if(success_request_accout != null){
      account = success_request_accout[0];
      await check_chainId();
      await check_change();
    }
    if(account != null && currentChainId == BSC_ID){
      $('.wallet').text(account.substring(0,5)+"..."+account.slice(-5));
      localStorage.setItem('data', account)
      setTimeout( async () => {
        connect_contract();
      }, 500);
      statusWallet = true;
    }
  }
  function logoutMetaMask(){
    account = null;
    localStorage.setItem('data', [])
    $('.wallet').text('Connect Wallet')
    statusWallet = false;
    contract_mining = null;
    contract_token= null;
  }
  async function check_chainId(){
    currentChainId = await window.ethereum.request({ method: 'net_version' });
  }
  async function check_change(){
    if(currentChainId != BSC_ID){
      try {
          await window.ethereum.request({
              method:'wallet_switchEthereumChain',
              params: [{chainId: '0x38'}]
          });
          console.log(`switched to chainid : ${BSC_ID} succesfully`);
          loginWithMetaMask();
      }catch(err){
          console.log(`error occured while switching chain to chainId ${BSC_ID}, err: ${err.message} code: ${err.code}`);
      }
    }
  }
  window.ethereum.on('chainChanged', (chainId) => {
    if(account != null){
      if(chainId == hexBSC_ID){
        loginWithMetaMask();
      }
      else{
        logoutMetaMask();
      }
    }
  })
  loginWithMetaMask();
  async function connect_contract(){
    contract_mining = new web3.eth.Contract(ABI_MINING, address_mining);
    contract_token = new web3.eth.Contract(ABI_TOKEN, address_token);
    await contract_token.methods.name().call().then(console.log)
  }  
  return (
    <div className="App">
      <header>
        <div className='header'>
          <div className='h_logo'>
            <a href='/'><img src={logo} alt='logo'/></a>
          </div>
          <div className='h_nav'>
            <Link className='nav_1' onClick={click_nav} to='/'>Mining</Link>
            <Link className='nav_2' onClick={click_nav} to='/pricing'>Pricing</Link>
            <Link className='nav_3' onClick={click_nav} to='/missions'>Missions</Link>
            <Link className='nav_4' onClick={click_nav} to='/game'>Game</Link>
            <Link className='nav_5' onClick={click_nav} to='/account'>Account</Link>
          </div>
          <div className='h_connect'>
            <p className='wallet' onClick={accessWallet}>Connect Wallet</p>
          </div>
        </div>
        <div className='header_info'>
          <svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>
          <div className='i_info'>
            <p>
              Buy package to upgrade mining speed! Invite more friends to receive <span style={{color:'#ffe400', fontWeight: 'bold'}}>10%</span> commission!
            </p>
          </div>
        </div>
      </header>
      <div className='h_nav_mobile'>
        <Link className='nav_1' onClick={click_nav} to='/'>Mining</Link>
        <Link className='nav_2' onClick={click_nav} to='/pricing'>Pricing</Link>
        <Link className='nav_3' onClick={click_nav} to='/missions'>Missions</Link>
        <Link className='nav_4' onClick={click_nav} to='/game'>Game</Link>
        <Link className='nav_5' onClick={click_nav} to='/account'>Account</Link>
      </div>
      <div className='contract'>
        <a><img src={ic1}/></a>
        <a><img src={ic2}/></a>
        <a><img src={ic3}/></a>
      </div>
      <div className='modal'>
        <img src={ic4}/>
        <p className='text_m'>Please connect wallet</p>
      </div>
      
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/pricing' element={<Price/>}/>
          <Route path='/missions' element={<Missions/>}/>
          <Route path='/game' element={<Game/>}/>
          <Route path='/account' element={<Account_page/>}/>
      </Routes>
    </div>
  );
  
}

export default App;
