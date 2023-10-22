import './missions.css';
import telegram from '../media/Telegram.png'
import twitter from '../media/twitter.png'




export default function missions(){
    let height = window.innerHeight;
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
                        <div className='btn_j'>
                            <a>Join Missions</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}