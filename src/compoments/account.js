import './account.css';
import miner from '../media/miner.png'
import check from '../media/Check.png'
import usdt from '../media/usdt.png'
import doge from '../media/xrp-icon.png'

export default function account(){
    let height = window.innerHeight;
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
                                        <p>Speed: <span>0 </span><span>DOGE/S</span></p>
                                    </div>
                                    <div className='s2_s'>
                                        <img src={check}/>
                                        <p>Speed: <span>0 </span><span>DOGE/S</span></p>
                                    </div>
                                    <div className='s2_s'>
                                        <img src={check}/>
                                        <p>Speed: <span>0 </span><span>DOGE/S</span></p>
                                    </div>
                                </div>
                                <div className='s3_u_1_l'>
                                    <div className='btn_u'>UPGRADE</div>
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
                                    <h4>0</h4>
                                </div>
                                <div className='l_d_c_s'>
                                    <h5>Referrals rewards <br/> &lt; 10% &gt;</h5>
                                    <h4><img src={usdt}/> 0.0</h4>
                                </div>
                                <div className='btn_invite'>
                                    {/* <img/> */}
                                    <p>Invite friends</p>
                                </div>
                            </div>
                            <div className='l_d_c'>
                                <div className='l_d_c_s'>
                                    <h3>Your Referrals</h3>
                                </div>
                                <div className='l_d_c_s'>
                                    <h4><img src={doge}/> 0.0</h4>
                                </div>
                                <div className='btn_withdraw'>
                                    <p>Withdraw</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='r_c_a'>
                        <div className='history'>
                            <div className='btn_h'>HISTORY WITHDRAW</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}