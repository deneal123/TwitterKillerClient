// handleComponents.js
import { apiLog, apiReg, apiPostText, apiPostPicture, apiTwitts } from "../Api";


export const handleChange = (e, setFormData, formData) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};


export const handleSubmit = async (e, formData, navigate, apipage) => {
    e.preventDefault();

    if (apipage === 'login') {
        apiLog(formData, navigate);
    }
    else if (apipage === 'register') {
        apiReg(formData, navigate);
    }
};

export const handleInputChange = (e, setInputValue) => {
    setInputValue(e.target.value);
};

export const handleEmoji = (e, setInputValue, setOpen) => {
    setInputValue((prev) => prev + e.emoji);
    setOpen(false);
};

export const handleScrollToBottomClick = (messagesEndRef) => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
};

export const handleClickPost = async (inputValue, userID, messagesEndRef) => {
    await apiPostText(inputValue, userID);
    handleScrollToBottomClick(messagesEndRef);
};

export const handlePostMessage = async (e, inputValue, posting, setPosting, setMessages, setInputValue, messages, userName, userID) => {
    e.preventDefault();
    const newMessage = inputValue.trim();
    if (newMessage && !posting) {
        setPosting(true);
        try {
            setMessages([...messages, { text: newMessage, user: userName }]);
            setInputValue('');
            await apiPostText(newMessage, userID);
        } catch (error) {
            console.error('Error posting message:', error);
        } finally {
            setPosting(false);
        }
    }
};

const uploadFile = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
            const blob = new Blob([new Uint8Array(reader.result)], { type: file.type });
            const url = URL.createObjectURL(blob);
            resolve(url);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
};

export const handleImageUpload = async (e, setUploading, setMessages, userName, userID, messages, uploading) => {
    const file = e.target.files[0];
    if (file && !uploading) {
        setUploading(true);
        try {
            const uploadedImageUrl = await uploadFile(file);
            setMessages([...messages, { text: <img src={uploadedImageUrl} alt = '' className = 'uploaded-image' />, user: userName, type: 'image' }]);
            await apiPostPicture(uploadedImageUrl, userID);
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setUploading(false);
        }
    }
};

export const handleScroll = (containerRef, loadingMore, limit, previousScrollHeight, setLoadingMore,  setMessages, setLimit, setIsLoaded) => {
    const scrollTop = containerRef.current.scrollTop;
    if (scrollTop === 0 && !loadingMore) {
        const newLimit = limit * 2;
        previousScrollHeight.current = containerRef.current.scrollHeight;
        apiTwitts(newLimit, setLoadingMore, setMessages, setLimit, setIsLoaded).then(() => {
            containerRef.current.scrollTop = containerRef.current.scrollHeight - previousScrollHeight.current;
        });
    }
};