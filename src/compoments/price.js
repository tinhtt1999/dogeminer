import './price.css';
import price_p from '../media/brand.png'
import check from '../media/Check.png'
export default function Price(){
    let height = window.innerHeight;
    return(
        <div className="Price" style={{minHeight: height}}>
            <div className='c_price'>
                <div className='info_price'>
                    <img className='bg_p' src={price_p}/>
                    <div className='s_i_price'>
                        <div className='s_s_i'>
                            <img src={check}/>
                            <p>Speed: <span className='c_y'>0</span> <span className='c_y'>DOGE/S</span></p>
                        </div>
                        <div className='s_s_i'>
                            <img src={check}/>
                            <p>Amount: <span className='c_y'>0</span></p>
                        </div>
                        <div className='s_s_i'>
                            <img src={check}/>
                            <p>Duration: <span>0</span> Month</p>
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
                            <h4><span>0</span> DOGE</h4>
                            <p>(Total balance)</p>
                        </div>
                    </div>
                    <div className='b_p_2'>
                        <div className='s_b_p_2'>
                            <p>Amount Package</p>
                            <input name='amount' placeholder='0'/>
                        </div>
                        <div className='s_b_p_2'>
                            <p>Monthly profit &lt; DOGE &gt;</p>
                            <input readOnly name='out_price' placeholder='0'/>
                        </div>
                    </div>
                    <div className='btn_buy'>Buy Now</div>
                </div>
            </div>
        </div>
    )
}