import './Home.css';
import miner from '../media/miner.png'
import miner2 from '../media/miner2.png'
import invite from '../media/invite-f.png'
import buy_1 from '../media/Group-469304.png'
import buy_2 from '../media/Group-469302.png'
export default function Home(){
    let height = window.innerHeight;
    return(
        <div className="Home" style={{minHeight: height}}>
            <div className='c_home'>
                <div className='c_f_home'>
                    <div className='m_f'>
                        <div className='p_miner'>
                            <img src={miner}/>
                            <img src={miner2}/>
                        </div>
                        <div className='info_miner'>
                            <p className='info_mining'>0.000000 <span>DOGE</span></p> 
                            <p className='info_invite'><img src={invite}/> <span>0</span></p>
                        </div>
                    </div>
                </div>
                <div className='note_m'>
                    <h4>NOTE</h4>
                    <p>CLICK THE BOX ABOVE TO START MINING!</p>
                </div>
                <div className='speed_m'>SPEDD: +&lt; 0.0000000001 (DOGE/s)</div>
                <div className='more_info'>
                    <div className='p_m'>
                        <div className='p_m_1'>
                            <img src={buy_1}/>
                        </div>
                        <div className='p_m_2'>
                            <p>You don't have any packages yet</p>
                            <a>Buy Package</a>
                        </div>
                    </div>
                    <div className='p_m'>
                        <div className='p_m_1'>
                            <img src={buy_2}/>
                        </div>
                        <div className='p_m_3'>
                            <p>Earn 10% / active miner in your team</p>
                            <a>Invite friend</a>
                        </div>
                    </div>
                </div>
                <a className='btn'>JOIN MISSONS</a>
            </div>
        </div>
    )
}