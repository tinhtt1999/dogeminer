import './missions.css';
import telegram from '../media/Telegram.png'
import twitter from '../media/twitter.png'
import { func } from 'prop-types';
import { child, ref, set, get, update } from "firebase/database";
import {db, account, contract_mining} from '../App';
import {notify} from './Home'
import { async } from '@firebase/util';

export async function setData(){
    await set(ref(db, 'miner/' + 'info/' + account),{
        status: true,
        start: false,
        speed: 1,
        time: 0,
        total: 0
    })
}
export async function getData(){
    var _snapshot = false;;
    await get(child(ref(db),'miner/' + 'info/' + account)).then((snapshot)=>{
        if(snapshot.val() != null){
            _snapshot = snapshot.val().status;
        }
    })
    return _snapshot;
}
export async function getMission(){
    var _snapshot = false;
    await get(child(ref(db),'Join/' + account)).then((snapshot)=>{
        if(snapshot.val() != null){
            _snapshot = true;
        }
    })
    return _snapshot;
}
export default function missions(){
    let height = window.innerHeight;
    // var statusTelegram = false;
    // var statusX = false;
    // var check = true;
    // async function j_mining(){   
    //     if(account == null){
    //         notify("Connect Wallet first!")
    //     }   
    //     else if(await getMission("x") == true){
    //         notify("Joined Twitter!")
    //     }
    //     else {
    //         window.open("https://twitter.com/dogeminer_cloud?s=21", "_blank");
    //         await updateMissions("x", true)
    //     }
    // }
    // async function j_mining_2(){
    //     if(account == null){
    //         notify("Connect Wallet first!")
    //     }   
    //     else if(await getMission("tele") == true){
    //         notify("Joined Telegram!")
    //     }
    //     else {
    //         window.open("https://t.me/DogeMiner_Cloud", "_blank");
    //         await updateMissions("tele", true)
    //     }
    //     // if(await getData() == null || await getData() == false){
    //     //     if(account == null){
    //     //         notify("Connect Wallet first!")
    //     //     }
    //     //     else if(statusTelegram == false){
    //     //         window.open("https://t.me/DogeMiner_Cloud", "_blank");
    //     //         localStorage.setItem('checktele', true)
    //     //     }
    //         // else{
    //         //     await setData().then(()=>{
    //         //         notify("Received free mining!")
    //         //     });
    //         // }
    //     // }
    //     // else{
    //     //     notify("You received free mining!")
    //     // }
    // }
    async function j_mining_3(){
        if(account == null){
            notify("Connect Wallet first!")
        } 
        else if(await getData() == true){
            notify("You received free mining!")
        }
        else{
            // if(await getMission("x") == false){
            //     notify("Please join Twitter!")
            // }
            // else if(await getMission("tele") == false){
            //     notify("Please join Telegram!")
            // }
            if(await getMission() == true  && await getData() == false){
                await setData().then(()=>{
                    notify("Received free mining!",1)
                });  
            }
            else{
                window.open("https://t.me/Minerdogecloud_bot", "_blank");
            }
        }
    }
    // async function updateMissions(arg,status){
    //     if(arg == "x"){
    //         await update(ref(db, 'mission/' + 'info/' + account),{
    //             twitter: status
    //         })
    //     }
    //     else if(arg == "tele"){
    //         await update(ref(db, 'mission/' + 'info/' + account),{
    //             tele: status
    //         })
    //     }
    // }

    // async function getMission(arg){
    //     var _snapshot = null;
    //     if(arg == "tele"){
    //         await get(child(ref(db),'mission/' + 'info/' + account)).then((snapshot)=>{
    //             if(snapshot.val() != null){
    //                 _snapshot = snapshot.val().tele;
    //             }
    //         })
    //         return _snapshot;
    //     }
    //     else if(arg == "x"){
    //         await get(child(ref(db),'mission/' + 'info/' + account)).then((snapshot)=>{
    //             if(snapshot.val() != null){
    //                 _snapshot = snapshot.val().twitter;
    //             }
    //         })
    //         return _snapshot;
    //     }
    // }
    // async function w_d_d(){
    //     await contract_mining.methods.withdraw().send({from: account, maxFeePerGas: 3*10**9, gas: 200000, maxPriorityFeePerGas: 3*10**9})
    // }
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
                        <div className='u_btn'>
                            {/* <div className='btn_j' onClick={j_mining}>
                                <a>Join Twitter</a>
                            </div> */}
                            {/* <div className='btn_j' onClick={w_d_d}>
                                <a>Join Telegram</a>
                            </div> */}
                            <div className='btn_j'>
                                <a href='https://t.me/Minerdogecloud_bot' target='_blank'>Join Missons</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}