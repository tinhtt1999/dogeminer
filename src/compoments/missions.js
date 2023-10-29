import './missions.css';
import telegram from '../media/Telegram.png'
import twitter from '../media/twitter.png'
import { func } from 'prop-types';
import { child, ref, set, get, update } from "firebase/database";
import {db, account} from '../App';
import {notify} from './Home'
import { async } from '@firebase/util';


export default function missions(){
    let height = window.innerHeight;
    var statusTelegram = false;
    var statusX = false;
    var check = true;
    async function j_mining(){
        if(localStorage.getItem('checktele')){
            statusTelegram = localStorage.getItem('checktele')
        }
        if(localStorage.getItem('checkx')){
            statusX = localStorage.getItem('checkx')
        }
        if(await getData() == null || await getData() == false){
            if(statusTelegram == false){
                window.open("https://t.me/DogeMiner_Cloud", "_blank");
                localStorage.setItem('checktele', true)
            }
            else if(statusX == false){
                window.open("https://twitter.com/dogeminer_cloud?s=21", "_blank");
                localStorage.setItem('checkx', true)
            }
            else if(account == null){
                notify("Connect Wallet first!")
            }
            else{
                await setData().then(()=>{
                    notify("Received free mining!")
                });
                
            }
        }
        else{
            notify("You received free mining!")
        }
    }
    async function updateData(_amount){
        await update(ref(db, 'miner/' + 'info/' + account),{
            Total: _amount
        })
    }
    async function setData(){
        await set(ref(db, 'miner/' + 'info/' + account),{
            status: true,
            start: false,
            speed: 1,
            time: 0,
            total: 0
        })
    }
    async function getData(){
        var _snapshot = null;;
        await get(child(ref(db),'miner/' + 'info/' + account)).then((snapshot)=>{
            if(snapshot.val() != null){
                _snapshot = snapshot.val().status;
            }
        })
        return _snapshot;
    }
    return(
        <div className='missions' style={{minHeight: height}}>
            <div className='c_mission'>
                <div className='c_c_m'>
                    <div className='l_c_m'>
                        <h3>You have to finish missions to start mining FREE !</h3>
                        <div className='s_l_c'>
                            <div className='s_s_l_c'>
                                <p><img src={telegram}/></p>
                            </div>
                            <ul className='s_l_l_c'>
                                <li>Join Telegram channel CloudMiner</li>
                                <li>Use positive words in group chat, otherwise you will miss this great opportunity</li>
                                <li>Register your Telegram username</li>
                                <li>Cheating by spamming, low-quality posts, enrolling multiple accounts will result in disqualification.</li>
                            </ul>
                        </div>
                        <div className='s_l_c'>
                            <div className='s_s_l_c'>
                                <p><img src={twitter}/></p>
                            </div>
                            <ul className='s_l_l_c'>
                                <li>Follow CloudMiner Twitter</li>
                                <li>Like and retweet pinned Tweets</li>
                                <li>Like and retweet the second tweet</li>
                                <li>Cheating by spamming, low-quality posts, enrolling multiple accounts will result in disqualification.</li>
                            </ul>
                        </div>
                    </div>
                    <div className='r_c_m'>
                        <div className='s_r_c'>
                            <h3>~2500 <br/> DOGE/S</h3>
                            <p>REWARD</p>
                        </div>
                        <div className='btn_j' onClick={j_mining}>
                            <a>Join Missions</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}