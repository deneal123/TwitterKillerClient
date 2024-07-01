// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import ReactPlayer from 'react-player';
import video1 from '../assets/background-video-1.webm';
import video2 from '../assets/background-video-2.webm';
import logo from '../assets/logo.svg';
import { handleChange, handleSubmit } from '../components/handleComponents';



const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    return (
        <div className='container-log'>
            <ReactPlayer
                className='background-video-1-log'
                url={video1}
                playing
                loop
                muted
                width='50%'
                height='50%'
            />
            <ReactPlayer
                className='background-video-2-log'
                url={video2}
                playing
                loop
                muted
                width='50%'
                height='50%'
            />
            <div className='container-login'>
                <img src={logo} alt="Logo" className='logo' />
                <h1 className='app-title-log'>TwitterKiller</h1>
                <form className='login-form' onSubmit={(e) => handleSubmit(e, formData, navigate, 'login')}>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        className='input-field-log'
                        value={formData.email}
                        onChange={(e) => handleChange(e, setFormData, formData)}
                    />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        className='input-field-log'
                        value={formData.password}
                        onChange={(e) => handleChange(e, setFormData, formData)}
                    />
                    <button type='submit' className='login-button'>Sign In</button>
                </form>
                <button className='button-to-register' onClick={() => navigate('/register')}>Not register yet?</button>
            </div>
        </div>
    );
}

export default LoginPage;
