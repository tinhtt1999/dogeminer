import { Routes, Route, Link} from 'react-router-dom';
import logo from './media/logo.png'
import ic1 from './media/icons8-telegram-48.png'
import ic2 from './media/icons8-twitter-64.png'
import ic3 from './media/icons8-whitepaper-64.png'
import $ from "jquery"
import './App.css';
import Home from './compoments/Home'
import Price from './compoments/price'
import Missions from './compoments/missions'
import Game from './compoments/game'
import Account from './compoments/account'
import 'animate.css';

function App() {
  window.addEventListener('scroll', () => {
    let position = window.scrollY;
    console.log(position)
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
        console.log(name)
        $(`.nav_${i}`).css('color','#ffe400');
      }
      else{
        $(`.nav_${i}`).css('color','white')
      }
    }
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
            <p>Connect Wallet</p>
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
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/pricing' element={<Price/>}/>
          <Route path='/missions' element={<Missions/>}/>
          <Route path='/game' element={<Game/>}/>
          <Route path='/account' element={<Account/>}/>
      </Routes>
    </div>
  );
  
}

export default App;
