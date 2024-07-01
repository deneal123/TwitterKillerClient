// RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import ReactPlayer from 'react-player';
import video1 from '../assets/background-video-1.webm';
import logo from '../assets/logo.svg';
import { handleChange, handleSubmit } from '../components/handleComponents';


const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    return (
        <div className='container-reg'>
            <ReactPlayer
                className='background-video-1-reg'
                url={video1}
                playing
                loop
                muted
                width='50%'
                height='50%'
            />
            <ReactPlayer
                className='background-video-1-2-reg'
                url={video1}
                playing
                loop
                muted
                width='80%'
                height='80%'
            />
            <div className='container-register'>
                <img src={logo} alt="Logo" className='logo' />
                <h1 className='app-title-reg'>TwitterKiller</h1>
                <form className='register-form' onSubmit={(e) => handleSubmit(e, formData, navigate, 'register')}>
                    <input
                        type='text'
                        name='username'
                        placeholder='Username'
                        className='input-field-reg'
                        value={formData.username}
                        onChange={(e) => handleChange(e, setFormData, formData)}
                    />
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        className='input-field-reg'
                        value={formData.email}
                        onChange={(e) => handleChange(e, setFormData, formData)}
                    />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        className='input-field-reg'
                        value={formData.password}
                        onChange={(e) => handleChange(e, setFormData, formData)}
                    />
                    <button type='submit' className='register-button'>Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
