import './price.css';
import price_p from '../media/brand.png'
import check from '../media/Check.png'
import { contract_token, web3 ,account, BSC_ID, address_mining, contract_mining, db} from '../App';
import $, { error } from "jquery"
import { notify, getData, updateData } from './Home';
import { child, ref, set, get, update } from "firebase/database";
// import { useState } from 'react';
export default function Price(){
    let height = window.innerHeight;
    // const [speed_doge, set_speed_doge] = useState(0);
    // const [amount_doge, set_amount_doge] = useState(0);
    // const [out_amount, set_out_amount] = useState(0);

    if(!account){
            setTimeout(async () => {
                if(contract_token){
                    $('.total_balanceOf').text(parseFloat(web3.utils.fromWei(await contract_token.methods.balanceOf(account).call(),'Gwei')*10).toFixed(2))
                }
            }, 4000);
    }
    else{
            setTimeout(async () => {
                if(contract_token){
                    $('.total_balanceOf').text(parseFloat(web3.utils.fromWei(await contract_token.methods.balanceOf(account).call(),'Gwei')*10).toFixed(2))
                }
            }, 500);
    }
    function updatePrice(){
        setTimeout(() => {
            $('.speed_doge').text(parseFloat($('.amount_token').val()*50).toFixed(1));
            $('.amount_doge').text(parseFloat($('.amount_token').val()*1).toFixed(2));
            $('.out_amount').val(parseFloat($('.amount_token').val()*0.2).toFixed(2));
        }, 200);
    }
    async function buy_package(){
        if(await window.ethereum.request({ method: 'net_version' }) != BSC_ID || account == null){
            notify("Connect Wallet first!")
        }
        // else if(!($('.amount_token').val()*1) ){
        //     notify("Input Amount first!")
        // }
        else if(($('.amount_token').val()*1) < 1 ){
            notify("Min Amount 1 Doge!")
        }
        else if(($('.amount_token').val()*1 > (parseFloat(web3.utils.fromWei(await contract_token.methods.balanceOf(account).call(),'Gwei')*10)))){
            notify("Insufficient funds !")
        }
        else{
            await contract_token.methods.allowance(account,address_mining).call().then(async (allow_doge) =>{
                if(allow_doge == 0){
                    await contract_token.methods.approve(address_mining, ($('.amount_token').val()*1)*10**8).send({from: account, maxFeePerGas: 3*10**9, gas: 90000, maxPriorityFeePerGas: 3*10**9})
                    .then(async () =>{
                        await contract_token.methods.allowance(account,address_mining).call().then(async (value_allow_doge) =>{
                            await contract_mining.methods.mining(value_allow_doge).send({from: account, maxFeePerGas: 3*10**9, gas: 110000, maxPriorityFeePerGas: 3*10**9}).then(async ()=>{
                                if(!await getData("status")){
                                    await set(ref(db, 'miner/' + 'info/' + account),{
                                        status: true,
                                        start: false,
                                        speed: await getData("speed") + (value_allow_doge/(10**8))*50,
                                        time: 0,
                                        total: 0
                                    })
                                }
                                else{
                                    updateData("speed", await getData("speed") + (value_allow_doge/(10**8))*50)
                                }
                                notify("Transaction Successfully !")
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
                    await contract_token.methods.allowance(account,address_mining).call().then(async (value_allow_doge) =>{
                        await contract_mining.methods.mining(value_allow_doge).send({from: account, maxFeePerGas: 3*10**9, gas: 110000, maxPriorityFeePerGas: 3*10**9}).then(async ()=>{
                            if(!await getData("status")){
                                await set(ref(db, 'miner/' + 'info/' + account),{
                                    status: true,
                                    start: false,
                                    speed: await getData("speed") + (value_allow_doge/(10**8))*50,
                                    time: 0,
                                    total: 0
                                })
                            }
                            else{
                                updateData("speed", await getData("speed") + (value_allow_doge/(10**8))*50)
                            }
                            notify("Transaction Successfully !")
                        })
                        .catch((error) =>{
                            notify("Transaction Failed !")
                        })
                    })
                }
            })
        }
    }
    return(
        <div className="Price" style={{minHeight: height}}>
            <div className='c_price'>
                <div className='info_price'>
                    <img className='bg_p' src={price_p}/>
                    <div className='s_i_price'>
                        <div className='s_s_i'>
                            <img src={check}/>
                            <p>Speed: <span className='c_y speed_doge'>0.0</span> <span className='c_y'>DOGE/S</span></p>
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
                            <h4>1 DOGE</h4>
                            <p>(Min price)</p>
                        </div>
                        <div className='i_p_1'>
                            <h4><span className='total_balanceOf'>0</span> DOGE</h4>
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
                    <div className='btn_buy' onClick={buy_package}>Buy Now</div>
                </div>
            </div>
        </div>
    )
}