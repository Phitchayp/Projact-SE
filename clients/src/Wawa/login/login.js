import React from 'react';
import './login.css'
import { FaUserCircle } from "react-icons/fa";
import Google from './google';

const Login = () => {
    return (
        <div className='body-login'>
            {/* <img   src='https://www.eng.src.ku.ac.th/wp-content/uploads/2022/08/banner_Robot_1024x480_edit-01-1024x480.jpg'/> */}
            <div className='root-login'>

                <div className='top-login'>
                    <div className='title-login'>
                        <div className='logo-login'>
                            <img className='logoimg-login' src='https://www.eng.src.ku.ac.th/wp-content/uploads/2020/06/eng-ku-logo.png' />
                        </div>
                        <div className='text-login'>
                            <div className='head-login'>วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์</div>
                            <div>คณะวิศวกรรมศาสตร์ ศรีราชา</div>
                        </div>
                    </div>
                </div>

                <div className='center-login'>

                    <div className='boxlogin'>

                        <FaUserCircle className='imgUser-login' />
                        <p className='textlogin'>ระบบจัดตารางสอน</p>
                        <Google />
                    </div>


                </div>
                <div className='center-login'>
                <div className='boxlogin2'>
                    <p style={{ fontFamily:'kanit' , color:'white'}}>ติดต่อ : oanchisa.n@ku.th</p>
                </div>
                </div>

                <div className='foot'>
                    {/* <h>foot</h> */}
                </div>

            </div>

        </div>
    );
};

export default Login;