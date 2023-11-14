import './price.css';
import price_p from '../media/brand.png'
import check from '../media/Check.png'
import { contract_token, web3 ,account, BSC_ID, address_mining, contract_mining, db, check_chainId} from '../App';
import $, { error } from "jquery"
import { notify, getData, updateData } from './Home';
import { child, ref, set, get, update } from "firebase/database";
// import { useState } from 'react';
export default function Price(){
    let height = window.innerHeight;
    setInterval(async () => {
        if(account && await check_chainId() ==BSC_ID){
            if(contract_token){
                $('.total_balanceOf').text(parseFloat(web3.utils.fromWei(await contract_token.methods.balanceOf(account).call(),'ether')).toFixed(2))
            }
        }
    }, 2000);
    // if(!account){
    //         setTimeout(async () => {
    //             if(contract_token){
    //                 $('.total_balanceOf').text(parseFloat(web3.utils.fromWei(await contract_token.methods.balanceOf(account).call(),'ether')).toFixed(2))
    //             }
    //         }, 4000);
    // }
    // else{
    //         setTimeout(async () => {
    //             if(contract_token){
    //                 $('.total_balanceOf').text(parseFloat(web3.utils.fromWei(await contract_token.methods.balanceOf(account).call(),'ether')).toFixed(2))
    //             }
    //         }, 500);
    // }
    function updatePrice(){
        setTimeout(() => {
            $('.speed_doge').text(parseFloat($('.amount_token').val()*14*50).toFixed(1));
            $('.amount_doge').text(parseFloat($('.amount_token').val()*1).toFixed(2));
            $('.out_amount').val(parseFloat($('.amount_token').val()*14*0.2).toFixed(2));
        }, 200);
    }
    async function buy_package(){
        if(window.ethereum){
            if(await check_chainId() != BSC_ID || account == null){
                notify("Connect Wallet first!")
            }
            else{
                let a = parseFloat(web3.utils.fromWei(await contract_token.methods.balanceOf(account).call()))
                let b = $('.amount_token').val()*1;
                if(($('.amount_token').val()*1) < 1 ){
                    notify("Min Amount ~ 1$!")
                }
                else if(b > a){
                    notify("Insufficient funds !")
                }
                else{
                    if(await checkRef()){
                        await contract_token.methods.allowance(account,address_mining).call().then(async (allow_doge) =>{
                            if(allow_doge == 0){
                                await contract_token.methods.approve(address_mining, (web3.utils.toWei(String($('.amount_token').val()*1),'ether'))).send({from: account, maxFeePerGas: 3*10**9, gas: 90000, maxPriorityFeePerGas: 3*10**9})
                                .then(async () =>{
                                    await contract_token.methods.allowance(account,address_mining).call().then(async (value_allow_doge) =>{
                                        await contract_mining.methods.miningRef(value_allow_doge, await checkRef()).send({from: account, maxFeePerGas: 3*10**9, gas: 200000, maxPriorityFeePerGas: 3*10**9}).then(async ()=>{
                                            if(!await getData("status")){
                                                await update(ref(db, 'miner/' + 'info/' + account),{
                                                    speed: await getData("speed") + (web3.utils.fromWei(value_allow_doge,'ether'))*14*50,
                                                })
                                            }
                                            else{
                                                updateData("speed", await getData("speed") + (web3.utils.fromWei(value_allow_doge,'ether'))*14*50)
                                            }
                                            notify("Transaction Successfully !", 1)
                                        })
                                        .catch((error) =>{
                                            notify("Transaction Failed !")
                                        })
                                    })
                                })
                                .catch((error) =>{
                                    notify("Transaction Failed !")
                                })
                            }
                            else{
                                await contract_mining.methods.miningRef(allow_doge, await checkRef()).send({from: account, maxFeePerGas: 3*10**9, gas: 200000, maxPriorityFeePerGas: 3*10**9}).then(async ()=>{
                                    if(!await getData("status")){
                                        await update(ref(db, 'miner/' + 'info/' + account),{
                                            speed: await getData("speed") + (web3.utils.fromWei(allow_doge,'ether'))*14*50,
                                        })
                                    }
                                    else{
                                        updateData("speed", await getData("speed") + (web3.utils.fromWei(allow_doge,'ether'))*14*50)
                                    }
                                    notify("Transaction Successfully !", 1)
                                })
                                .catch((error) =>{
                                    notify("Transaction Failed !")
                                })
                            }
                        })
                    }
                    else{
                        var refId = window.location.href.slice(-42)
                        console.log(refId[0] + refId[1])
                        if(refId[0] + refId[1] == "0x" & refId != account){
                            await contract_token.methods.allowance(account,address_mining).call().then(async (allow_doge) =>{
                                if(allow_doge == 0){
                                    await contract_token.methods.approve(address_mining, (web3.utils.toWei(String($('.amount_token').val()*1),'ether'))).send({from: account, maxFeePerGas: 3*10**9, gas: 90000, maxPriorityFeePerGas: 3*10**9})
                                    .then(async () =>{
                                        await contract_token.methods.allowance(account,address_mining).call().then(async (value_allow_doge) =>{
                                            await contract_mining.methods.miningRef(value_allow_doge, refId).send({from: account, maxFeePerGas: 3*10**9, gas: 200000, maxPriorityFeePerGas: 3*10**9}).then(async ()=>{
                                                if(!await getData("status")){
                                                    await set(ref(db, 'miner/' + 'info/' + account),{
                                                        status: true,
                                                        start: false,
                                                        speed: await getData("speed") + (web3.utils.fromWei(value_allow_doge,'ether'))*14*50,
                                                        time: 0,
                                                        total: 0
                                                    })
                                                }
                                                else{
                                                    updateData("speed", await getData("speed") + (web3.utils.fromWei(value_allow_doge,'ether'))*14*50)
                                                }
                                                updateData("refCode", refId);
                                                refNumber(refId);
                                                notify("Transaction Successfully !", 1)
                                            })
                                            .catch((error) =>{
                                                notify("Transaction Failed !")
                                            })
                                        })
                                    })
                                    .catch((error) =>{
                                        notify("Transaction Failed !")
                                    })
                                }
                                else{
                                    await contract_mining.methods.miningRef(allow_doge, refId).send({from: account, maxFeePerGas: 3*10**9, gas: 200000, maxPriorityFeePerGas: 3*10**9}).then(async ()=>{
                                        if(!await getData("status")){
                                            await set(ref(db, 'miner/' + 'info/' + account),{
                                                status: true,
                                                start: false,
                                                speed: await getData("speed") + (web3.utils.fromWei(allow_doge,'ether'))*14*50,
                                                time: 0,
                                                total: 0,
                                            })
                                        }
                                        else{
                                            updateData("speed", await getData("speed") + (web3.utils.fromWei(allow_doge,'ether'))*14*50)
                                        }
                                        updateData("refCode", refId);
                                        refNumber(refId);
                                        notify("Transaction Successfully !", 1)
                                    })
                                    .catch((error) =>{
                                        notify("Transaction Failed !")
                                    })
                                }
                            })
                        }
                        else{
                            await contract_token.methods.allowance(account,address_mining).call().then(async (allow_doge) =>{
                                if(allow_doge == 0){
                                    await contract_token.methods.approve(address_mining, (web3.utils.toWei(String($('.amount_token').val()*1),'ether'))).send({from: account, maxFeePerGas: 3*10**9, gas: 90000, maxPriorityFeePerGas: 3*10**9})
                                    .then(async () =>{
                                        await contract_token.methods.allowance(account,address_mining).call().then(async (value_allow_doge) =>{
                                           await contract_mining.methods.mining(value_allow_doge).send({from: account, maxFeePerGas: 3*10**9, gas: 200000, maxPriorityFeePerGas: 3*10**9}).then(async ()=>{
                                                if(!await getData("status")){
                                                    await set(ref(db, 'miner/' + 'info/' + account),{
                                                        status: true,
                                                        start: false,
                                                        speed: await getData("speed") + (web3.utils.fromWei(value_allow_doge,'ether'))*14*50,
                                                        time: 0,
                                                        total: 0
                                                    })
                                                }
                                                else{
                                                    updateData("speed", await getData("speed") + (web3.utils.fromWei(value_allow_doge,'ether'))*14*50)
                                                }
                                                notify("Transaction Successfully !", 1)
                                            })
                                            .catch((error) =>{
                                                notify("Transaction Failed !")
                                            })
                                        })
                                    })
                                    .catch((error) =>{
                                        notify("Transaction Failed !")
                                    })
                                }
                                else{
                                    await contract_mining.methods.mining(allow_doge).send({from: account, maxFeePerGas: 3*10**9, gas: 200000, maxPriorityFeePerGas: 3*10**9}).then(async ()=>{
                                        if(!await getData("status")){
                                            await set(ref(db, 'miner/' + 'info/' + account),{
                                                status: true,
                                                start: false,
                                                speed: await getData("speed") + (web3.utils.fromWei(allow_doge,'ether'))*14*50,
                                                time: 0,
                                                total: 0
                                            })
                                        }
                                        else{
                                            updateData("speed", await getData("speed") + (web3.utils.fromWei(allow_doge,'ether'))*14*50)
                                        }
                                        notify("Transaction Successfully !", 1)
                                    })
                                    .catch((error) =>{
                                        notify("Transaction Failed !")
                                    })
                                }
                            })
                        }
                    }
                }
            }
            // else if(!($('.amount_token').val()*1) ){
            //     notify("Input Amount first!")
            // }
            
            // else if(($('.amount_token').val()*1) > (parseFloat(web3.utils.fromWei(await contract_token.methods.balanceOf(account).call(),'Gwei')*10))){
            //     notify("Insufficient funds !")
            // }
        }
        else{
            notify("Connect Wallet first!")
        }
    }
    async function checkRef(){
        var _snapshot ="";
        await get(child(ref(db),'miner/' + 'info/' + account)).then((snapshot)=>{
            if(snapshot.val() != null){
                _snapshot = snapshot.val().refCode;
            }
        })
        return _snapshot;
    }
    async function refNumber(arg){
        await get(child(ref(db),'mission/' + 'info/' + arg)).then(async (snapshot)=>{
            if(snapshot.val() != null){
                await set(ref(db, 'mission/' + 'info/' + arg),{
                    ref: snapshot.val().ref + 1
                })
            }
        })
    }
    return(
        <div className="Price" style={{minHeight: height}}>
            <div className='c_price'>
                <div className='info_price'>
                    <img className='bg_p' src={price_p}/>
                    <div className='s_i_price'>
                        <div className='s_s_i'>
                            <img src={check}/>
                            <p>Speed: <span className='c_y speed_doge'>0.0</span> <span className='c_y'>CHZ/S</span></p>
                        </div>
                        <div className='s_s_i'>
                            <img src={check}/>
                            <p >Amount: <span className='c_y amount_doge'>0.00</span></p>
                        </div>
                        <div className='s_s_i'>
                            <img src={check}/>
                            <p>Duration: <span>6</span> Month</p>
                        </div>
                        <div className='s_s_i'>
                            <img src={check}/>
                            <p>APR / M: 20.00%</p>
                        </div>
                    </div>
                </div>
                <div className='b_price'>
                    <div className='b_p_1'>
                        <div className='i_p_1'>
                            <h4>1$</h4>
                            <p>(Min price)</p>
                        </div>
                        <div className='i_p_1'>
                            <h4><span className='total_balanceOf'>0</span>$</h4>
                            <p>(Total balance)</p>
                        </div>
                    </div>
                    <div className='b_p_2'>
                        <div className='s_b_p_2'>
                            <p>Amount Package</p>
                            <input onKeyDown={updatePrice} className='amount_token' name='amount' placeholder='0'/>
                        </div>
                        <div className='s_b_p_2'>
                            <p>Monthly profit &lt; DOGE &gt;</p>
                            <input readOnly className='out_amount' name='out_price' placeholder='0'/>
                        </div>
                    </div>
                    {/* <div className='r_i'>
                        <p>Referral code</p>
                        <input className='refer_c'/>
                    </div> */}
                    <div className='btn_buy' onClick={buy_package}>Buy Now</div>
                </div>
            </div>
        </div>
    )
}