// WallPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './WallPage.css';
import logo from '../assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faImage, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from "emoji-picker-react";
import useWindowDimensions from '../hooks/use_window_dimensions';
import { apiCheckToken, apiTwitts } from '../Api';
import { handleInputChange, handleEmoji, handleClickPost, handleScrollToBottomClick, handlePostMessage, handleImageUpload, handleScroll } from '../components/handleComponents';


const WallPage = () => {
    const { width, height } = useWindowDimensions();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [posting, setPosting] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [limit, setLimit] = useState(20);
    const containerRef = useRef(null);
    const previousScrollHeight = useRef(0);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();
    const emojiPickerWidth = width * 0.2;
    const emojiPickerHeight = height * 0.5;
    const userid = localStorage.getItem('userid');
    const userID = userid;
    const username = localStorage.getItem('username');
    const userName = username;
    const token = localStorage.getItem('token');


    useEffect(() => {
        apiCheckToken(token, navigate);
        const intervalId = setInterval(apiCheckToken, 60 * 60 * 1000); // 1 час в миллисекундах
        return () => clearInterval(intervalId);
    }, [token, navigate]);

    const ScrollToBottom = () => {
        useEffect(() => {
            scrollToBottom();
        }, [messages]);

        const scrollToBottom = () => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({});
            }
        };

        return <div ref={messagesEndRef} />;
    };

    useEffect(() => {
        if (userID !== '') {
            apiTwitts(limit, setLoadingMore, setMessages, setLimit, setIsLoaded);
        }
    }, [userID]);


    return (
        <div className='container-wall'>
            <header className='header-wall'>
                <div className='logo-section'>
                    <img src={logo} alt='Logo' className='logo' />
                    <h1 className='app-title'>TwitterKiller</h1>
                </div>
            </header>
            <div className='divider-wall'></div>
            <div className='message-wall' onScroll={() => handleScroll(containerRef, loadingMore, limit, previousScrollHeight, setLoadingMore, setMessages, setLimit, setIsLoaded)} ref={containerRef}>
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.type === 'image' ? 'image-message' : 'text-message'}`}>
                        <span className='message-user'>{message.user}:</span> {message.text}
                    </div>
                ))}
                <ScrollToBottom />
            </div>
            {uploading && <p>Uploading image...</p>}
            {loadingMore && <p>Loading more messages...</p>}
            <div className='divider-wall'></div>
            <form className='post-message' onSubmit={(e) => handlePostMessage(e, inputValue, posting, setPosting, setMessages, setInputValue, messages, userName, userID)}>
                <input
                    type='text'
                    name='message'
                    placeholder='Write a message...'
                    className='message-input'
                    value={inputValue}
                    onChange={(e) => handleInputChange(e, setInputValue)}
                    disabled={posting}
                />
                <div className='buttons'>
                    <div className='emoji-button-container'>
                        <div className='emoji-button' onClick={() => setOpen((prev) => !prev)} disabled={posting}>
                            <FontAwesomeIcon icon={faSmile} />
                            {open && (
                                <div className='picker'>
                                    <EmojiPicker onEmojiClick={(e) => handleEmoji(e, setInputValue, setOpen)} style={{ width: emojiPickerWidth, height: emojiPickerHeight }} />
                                </div>
                            )}
                        </div>
                    </div>
                    <label className='image-button'>
                        <input type='file' accept='image/*' onChange={(e) => handleImageUpload(e, setUploading, setMessages, userName, userID, messages, uploading)} disabled={uploading} />
                        <FontAwesomeIcon icon={faImage} />
                    </label>
                    <button type='submit' className='post-button' onClick={() => handleClickPost(inputValue, userID, messagesEndRef)} disabled={posting}>Post</button>
                    <button className='scroll-to-bottom-button' onClick={() => handleScrollToBottomClick(messagesEndRef)}>
                        <FontAwesomeIcon icon={faArrowDown} /> Scroll to Bottom
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WallPage;
