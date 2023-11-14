import './account.css';
import miner from '../media/miner.png'
import check from '../media/Check.png'
import usdt from '../media/usdt.png'
import doge from '../media/doge-icon.png'
import { contract_token, web3 ,account, BSC_ID, address_mining, contract_mining, db, check_chainId} from '../App';
import { notify, getData, updateData, TDOGE } from './Home';
import $, { error } from "jquery"
import { child, ref, set, get, update } from "firebase/database";
import React from 'react';
import ReactDOM from 'react-dom/client';

export default function account_page(){
    let height = window.innerHeight;
    var statusH = false;
    setInterval(async () => {
        if(window.ethereum){
            if(account!= null && await check_chainId() == BSC_ID && contract_mining != null){
                await load_ac();
                if(statusH == false){
                    await load_h_2();
                }
            }
            else{
                noneload_ac();
            }
        }
    }, 3000);
    // if(!account){
    //     setTimeout(async () => {
    //         await load_ac();
    //         await load_h_2();
    //     }, 4000);
    // }
    // else{
    //     setTimeout(async () => {
    //         await load_ac();
    //         await load_h_2();
    //     }, 500);
    // }
    // async function updateAC(){
    //     if(window.ethereum){
    //         if(account!= null && await check_chainId() == BSC_ID && contract_mining != null){
    //             await load_ac();
    //         }
    //     }
    // }
    async function load_ac(){
        $('.speed_i_a').text(await getData("speed"))
        $('.total_i_a').text(web3.utils.fromWei((await contract_mining.methods.MinToken(account).call()), 'ether'))
        $('.withdraw_i_a').text(await getData("total"))
        $('.n_refnumber').text(await getRefNum())
        $('.m_refnumber').text(await getRefMon())
    }
    function noneload_ac(){
        $('.speed_i_a').text(0)
        $('.total_i_a').text(0)
        $('.withdraw_i_a').text(0)
        $('.n_refnumber').text(0)
        $('.m_refnumber').text(0)
    }
    async function getRefNum(){
        var _snapshot = 0;
        await get(child(ref(db),'mission/' + 'info/' + account)).then(async (snapshot)=>{
            if(snapshot.val() != null){
                _snapshot = snapshot.val().ref
            }
        })
        return _snapshot;
    }
    async function getRefMon(){
        return web3.utils.fromWei((await contract_mining.methods.refMin(account).call()), 'ether');
    }
    async function test(){
        if(account != null){
            var a ="";
            var i = 0;
            for(i=0; i<window.location.href.length -7; i++){
                a+=window.location.href[i];
            }
            var refID =  a + 'pricing' + '?' + 'refId=' + account;
            navigator.clipboard.writeText(refID);
            notify("Copied Referral Code!", 1)
        }
        else{
            notify("Connect Wallet first!")
        }
    }
    async function withdraw_f(){
        //setDataWithdraw(await getData("total"), Math.floor(Date.now() / 1000))
        if(account != null && await check_chainId() == BSC_ID){
            updateData("total", parseFloat(parseFloat(await getData("total")) + (TDOGE*(await getData("speed"))*((Math.floor(Date.now() / 1000)) - await getData("time")))).toFixed(9));
            updateData("time",Math.floor(Date.now() / 1000));
            await updateData("start",false);
            $('.withdraw_i_a').text(await getData("total"))
            // console.log(parseFloat(await getData("total"))*10**8)
            await contract_mining.methods.withdrawUser(parseInt(parseFloat(await getData("total"))*10**8)).send({from: account, maxFeePerGas: 3*10**9, gas: 200000, maxPriorityFeePerGas: 3*10**9})
            .then(async()=>{
                await setDataWithdraw(await getData("total"), Math.floor(Date.now() / 1000))
                await load_h_2(1);
                updateData("total",0);
                notify("Withdraw Successfully !", 1);
                await load_ac();
            })
            .catch((error) =>{
                notify("Withdraw Failed !");
            })
            await updateData("start",true);
        }
        else{
            notify("Connect Wallet first!");
        }
    }
    async function setDataWithdraw(a, t){
        for(var i=0; i<100; i++){
            if(await getDataWithdraw(i) == false){
                await set(ref(db, 'withdraw/' + 'info/' + account + '/' + i),{
                    amount: a,
                    time: t
                })
                break;
            }
        }
    }
    async function getDataWithdraw(n){
        var _snapshot = false;
        await get(child(ref(db),'withdraw/' + 'info/' + account + '/' + n)).then((snapshot)=>{
            if(snapshot.val() != null){
                _snapshot = true;
            }
        })
        return _snapshot;
    }
    async function getAW(n){
        var _snapshot = 0;
        await get(child(ref(db),'withdraw/' + 'info/' + account + '/' + n)).then((snapshot)=>{
            if(snapshot.val() != null){
                _snapshot = snapshot.val().amount;
            }
        })
        return _snapshot;
    }
    async function getTW(n){
        var _snapshot = 0;
        await get(child(ref(db),'withdraw/' + 'info/' + account + '/' + n)).then((snapshot)=>{
            if(snapshot.val() != null){
                _snapshot = snapshot.val().time;
            }
        })
        return _snapshot;
    }
    
    async function load_h_2(y=0){
        statusH = true;
        if(y==0){
            for(var i=0; i<100;i++){
                if(await getDataWithdraw(i) == true){
                    load_history(await getAW(i), await getTW(i))
                }
                else{
                    break;
                }
            }
        }
        else if(y == 1){
            for(var i=0; i<100;i++){
                if(await getDataWithdraw(i) == false){
                    load_history(await getAW(i-1), await getTW(i-1));
                    break;
                }
            }
        }
    }
    async function load_history(a,t){
        // console.log(a)
        // console.log(t)
        const div = document.createElement('div');
        div.className = "in_h_s";
        const p1 = document.createElement('p');
        p1.innerText = String(parseFloat(a).toFixed(3))
        const p2 = document.createElement('p');
        p2.innerText = String(timeConverter(t))
        const p3 = document.createElement('p');
        p3.innerText = "Success"
        const img1 = document.createElement('img')
        img1.src = doge
        div.appendChild(p1)
        p1.appendChild(img1)
        div.appendChild(p2)
        div.appendChild(p3)
        document.getElementById('in_h').appendChild(div);
    }
    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var year = a.getFullYear();
        var month = a.getMonth();
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min;
        return time;
    }
    return(
        <div className='account' style={{minHeight: height}}>
            <div className='c_account'>
                <div className='c_c_a'>
                    <div className='l_c_a'>
                        <div className='u_l_c_a'>
                            <div className='u_1_l'>
                                <div className='s1_u_1_l'>
                                    <img src={miner}/>
                                </div>
                                <div className='s2_u_1_l'>
                                    <p className='s2_p'>Current Package</p>
                                    <div className='s2_s'>
                                        <img src={check}/>
                                        <p>Speed: <span className='speed_i_a'>0</span><span> CHZ/S</span></p>
                                    </div>
                                    <div className='s2_s'>
                                        <img src={check}/>
                                        <p>Total Package: <span className='total_i_a'>0</span><span>$</span></p>
                                    </div>
                                    <div className='s2_s'>
                                        <img src={check}/>
                                        <p>Duration: <span>6 </span><span>Month</span></p>
                                    </div>
                                    <div className='s2_s'>
                                        <img src={check}/>
                                        <p>APR/M: <span>20.0% </span></p>
                                    </div>
                                </div>
                                <div className='s3_u_1_l'>
                                    <div className='btn_u'>
                                        <a href='/pricing'>UPGRADE</a></div>
                                </div>
                            </div>
                            <div className='u_2_l'>
                                <h3>20.0%</h3>
                                <p>APR</p>
                            </div>
                        </div>
                        <div className='d_l_c_a'>
                            <div className='l_d_c'>
                                <div className='l_d_c_s'>
                                    <h3>Your Referrals</h3>
                                    <h4 className='n_refnumber'>0</h4>
                                </div>
                                <div className='l_d_c_s'>
                                    <h5>Referrals rewards <br/> &lt; 10% &gt;</h5>
                                    <h4><img src={usdt}/> <span className='m_refnumber'>0.0</span></h4>
                                </div>
                                <div className='btn_invite'>
                                    {/* <img/> */}
                                    <p onClick={test}>Invite friends</p>
                                </div>
                            </div>
                            <div className='l_d_c'>
                                <div className='l_d_c_s'>
                                    <h3>Your Balance</h3>
                                </div>
                                <div className='l_d_c_s'>
                                    <h4><img src={doge}/> <span className='withdraw_i_a'>0.0</span></h4>
                                </div>
                                <div className='btn_withdraw'>
                                    <p onClick={withdraw_f}>Withdraw</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='r_c_a'>
                        <div className='history'>
                            <div className='btn_h'>HISTORY WITHDRAW</div>
                            <div id='in_h'>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}