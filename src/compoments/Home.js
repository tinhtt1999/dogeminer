import './Home.css';
import $ from "jquery"
import 'animate.css';
import miner from '../media/miner.png'
import miner2 from '../media/miner2.png'
import invite from '../media/invite-f.png'
import buy_1 from '../media/Group-469304.png'
import buy_2 from '../media/Group-469302.png'
import iclose from '../media/icons8-close-48.png'
import logo from '../media/logo.png'
import {account, BSC_ID, contract_mining, contract_token, db} from '../App';
import { child, ref, set, get, update } from "firebase/database";
import { func } from 'prop-types';
export var status_choose =false;
var statusNotify = true;
export function notify(content){
    const modal_prop = document.querySelector('.modal');
    const text_m = document.querySelector('.text_m');
    if(statusNotify == true){
        statusNotify = false;
        modal_prop.classList.add("animate__animated");
        modal_prop.classList.add("animate__fadeInDown");
        modal_prop.style.display  = 'flex';
        text_m.innerHTML = content;
        setTimeout(() => {
            modal_prop.classList.remove("animate__fadeInDown");
            setTimeout(() => {
                modal_prop.classList.add("animate__fadeOutUp");
                setTimeout(() => {
                    modal_prop.classList.remove("animate__fadeOutUp");
                    modal_prop.style.display  = 'none';
                    statusNotify = true;
                }, 500);
            }, 100);
        }, 3000);
    }
}
export async function getData(index){
    var _snapshot = null;
    await get(child(ref(db),'miner/' + 'info/' + account)).then((snapshot)=>{
        if(snapshot.val()){
            switch(index){
                case "status":
                    _snapshot = snapshot.val().status;
                    break;
                case "time":
                    _snapshot = snapshot.val().time;
                    break;
                case "start":
                    _snapshot = snapshot.val().start;
                    break;
                case "speed":
                    _snapshot = snapshot.val().speed;
                    break;
                case "total":
                    _snapshot = snapshot.val().total;
                    break;
                default:
                    break;
            }
        }
    })
    return _snapshot;
}
export async function updateData(index,value){
    if(index == "start"){
        await update(ref(db, 'miner/' + 'info/' + account),{
            start: value
        })
    }
    else if(index == "speed"){
        await update(ref(db, 'miner/' + 'info/' + account),{
            speed: value
        })
    }
    else if(index == "time"){
        await update(ref(db, 'miner/' + 'info/' + account),{
            time: value
        })
    }
    else if(index == "total"){
        await update(ref(db, 'miner/' + 'info/' + account),{
            total: value
        })
    }
    
}
export const TDOGE = 155*10**(-11);
export default function Home(){
    let height = window.innerHeight;
    var w_choose;
    async function copyReferCode(){
        if(await window.ethereum.request({ method: 'net_version' }) == BSC_ID && account != null){
            navigator.clipboard.writeText(account);
        }
        else{
            notify("Connect Wallet first!")
        }
    }
    async function load(){
        w_choose = document.querySelector('.w_choose');
    }
    setTimeout(() => {
        load();
    }, 500);
    if(!account){
        if(status_choose == false){
            setTimeout(() => {
                if(contract_mining){
                    choose_mining();
                }
            }, 4000);
        }
        setTimeout(() => {
            load_2();
        }, 4000);
    }
    else{
        if(status_choose == false){
            setTimeout(() => {
                choose_mining();
            }, 500);
        }
        setTimeout(() => {
            load_2();
        }, 500);
    }
    async function startMiner(){
        if(await window.ethereum.request({ method: 'net_version' }) != BSC_ID || account == null){
            notify("Connect Wallet first!")
        }
        else if( await contract_mining.methods.MinToken(account).call() == 0
        && (await getData("status") == false || await getData("status") == null)){
            notify("Please buy package first!")
        }
        else{
            if(await contract_mining.methods.MinToken(account).call() != 0 && await getData("start") == false){
                await updateData("start",true);
                await updateData("time",Math.floor(Date.now() / 1000))
            }
            else if(await getData("status") == true && await getData("start") == false){
                await updateData("start",true);
                await updateData("time",Math.floor(Date.now() / 1000))
            }
            else{
                await updateData("start",false);
                updateData("total", parseFloat(parseFloat(await getData("total")) + (TDOGE*(await getData("speed"))*((Math.floor(Date.now() / 1000)) - await getData("time")))).toFixed(9))
                updateData("time",Math.floor(Date.now() / 1000))
            }
        }
    }
    function animationMining(){
        $('.p_miner img:first-child').addClass('a_mining_u')
    }
    function animationMining_r(){
        $('.p_miner img:first-child').removeClass('a_mining_u')
    }
    // async function freeMining(){
    //     updateData("start",true);
    //     updateData("time",Math.floor(Date.now() / 1000))
    // }
    setInterval(async () => {
        if(account){
            if(await getData("start") == true){
                animationMining();
                let _time = await getData("time");
                let _speed = await getData("speed");
                let _total = await getData("total");
                let _newtime = Math.floor(Date.now() / 1000)
                if((_newtime - _time) > 86400 && _speed == 1){
                    updateData("start",false)
                    updateData("total", parseFloat(parseFloat(_total) + (TDOGE*_speed*86400)).toFixed(9))
                    updateData("time",Math.floor(Date.now() / 1000))
                }
                else if((_newtime - _time) > 86400 && _speed > 1){
                    updateData("total", parseFloat(parseFloat(_total) + (TDOGE*_speed*86400)).toFixed(9))
                    updateData("time",Math.floor(Date.now() / 1000))
                }
                else{
                    let cal = TDOGE*_speed*(_newtime - _time)
                    $('.value_mining').text(parseFloat(parseFloat(_total) + cal).toFixed(9))
                }
            }
            else{
                animationMining_r();
            }
        }
        else{
            animationMining_r();
            $('.value_mining').text("0.00000000")
            $('.speed_t').text("0.00000000000")
        }
    }, 1000);
    async function choose_mining(){
        if(await contract_mining.methods.MinToken(account).call() == 0 ){
          w_choose.style.display ='flex'
          status_choose = true;
        }
    }
    async function load_2(){
        if(await getData("status") == true){
            if(parseFloat(await getData("total")) > 0){
                $('.value_mining').text(parseFloat(parseFloat(await getData("total"))).toFixed(9))
            }
            $('.speed_t').text(parseFloat(await getData("speed") * parseFloat(TDOGE)).toFixed(11))
        }
    }
    function close_choose(){
        w_choose.style.display ='none'
    }
    return(
        <div className="Home" style={{minHeight: height}}>
            <div className='c_home'>
                <div className='c_f_home'>
                    <div className='w_m_f'>
                        <div className='m_f'>
                            <div className='p_miner' onClick={startMiner}>
                                <img src={miner}/>
                                <img src={miner2}/>
                            </div>
                            <div className='info_miner'>
                                <p className='info_mining'><span className='value_mining'>0.00000000</span> DOGE</p> 
                                <p className='info_invite'><img src={invite}/> <span>0</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='note_m'>
                    <h4>NOTE</h4>
                    <p>CLICK THE BOX ABOVE TO START MINING!</p>
                </div>
                <div className='speed_m'>SPEDD: +&lt; <span className='speed_t'>0.0000000015</span> (DOGE/s)</div>
                <div className='more_info'>
                    <div className='p_m'>
                        <div className='p_m_1'>
                            <img src={buy_1}/>
                        </div>
                        <div className='p_m_2'>
                            <p>You don't have any packages yet</p>
                            <a href='/pricing'>Buy Package</a>
                        </div>
                    </div>
                    <div className='p_m'>
                        <div className='p_m_1'>
                            <img src={buy_2}/>
                        </div>
                        <div className='p_m_3'>
                            <p>Earn 10% / active miner in your team</p>
                            <a onClick={copyReferCode}>Invite friend</a>
                        </div>
                    </div>
                </div>
                <a className='btn' href='./missions'>JOIN MISSONS</a>
            </div>
            <div className='w_choose'>
                <div className='choose'>
                  <div className='choose_title'>
                    <img src={logo}/>
                    <h4>MINE TO EARN</h4>
                    <h5>Earn up to 20%</h5>
                  </div>
                  <div className='choose_btn'>
                    <div className='s_c_bth'>
                      <a href='./pricing'>Pro mining</a>
                      <p>(High Speed)</p>
                    </div>
                    <div className='s_c_bth'>
                      <a href='./missions'>Free mining</a>
                      <p>(Low Speed)</p>
                    </div>
                  </div>
                  <img className='close' onClick={close_choose} src={iclose}/>
                </div>
            </div>
        </div>
    )
}