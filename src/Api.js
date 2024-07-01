// Api.js


export const apiLog = async (formData, navigate) => {
    try {
        const endpoint = 'login';
        const baseUrl = 'http://localhost:8000';
        const url = `${baseUrl}/${endpoint}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: formData.email,
                Password: formData.password
            })
        });
        if (response.ok) {
            const result = await response.json();
            await localStorage.setItem('token', result.token);
            await localStorage.setItem('userid', result.userid);
            await localStorage.setItem('username', result.username);
            console.log(result)
            navigate('/wall');
        } else {}
    } catch (error) {
        console.error('Error:', error);
    }
}

export const apiReg = async (formData, navigate) => {
    try {
        const endpoint = 'register';
        const baseUrl = 'http://localhost:8000';
        const url = `${baseUrl}/${endpoint}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserName: formData.username,
                Email: formData.email,
                Password: formData.password
            })
        });
        if (response.ok) {
            navigate('/');
        } else {}
    } catch (error) {
        console.error('Error:', error);
    }
}

export const apiCheckToken = async (token, navigate) => {
    try {
        const endpoint = `wall/${token}`;
        const baseUrl = 'http://localhost:8000';
        const url = `${baseUrl}/${endpoint}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token
            })
        });
        if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/');
        } else {}
    } catch (error) {
        console.error('Error:', error);
    }
};

export const apiUserName = async (ID) => {
    try {
        const endpoint = `users/userid/${ID}`;
        const baseUrl = 'http://localhost:8000';
        const url = `${baseUrl}/${endpoint}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        return result.UserName;
    } catch (error) {
        console.error('Error:', error);
    }
};

export const apiPostText = async (text, userID) => {
    try {
        const endpoint = `wall/twitt/`;
        const baseUrl = 'http://localhost:8000';
        const url = `${baseUrl}/${endpoint}`;
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserID: userID,
                Text: text
            })
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

export const apiTwitts = async (newLimit, setLoadingMore, setMessages, setLimit, setIsLoaded) => {
    try {
        setLoadingMore(true);
        const endpoint = `wall/twitts/${newLimit}`;
        const baseUrl = 'http://localhost:8000';
        const url = `${baseUrl}/${endpoint}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newLimit })
        });

        const result = await response.json();

        const userNamePromises = result.map(async (twitt) => {
            // const base64ImageUrl = `data:image/jpeg;base64,${uploadedImageUrl}`;
            const user_name = await apiUserName(twitt.UserID);
            console.log(`text: ${twitt.Text}, picture: ${twitt.Picture}`)
            return {
                text: twitt.Text || (twitt.Picture && <img src={`data:image/jpeg;base64,${twitt.Picture}`} alt='' className='uploaded-image' />),
                user: user_name,
                type: twitt.Picture ? 'image' : 'text'
            };
        });

        const messagesWithUserNames = await Promise.all(userNamePromises);

        setMessages((prevMessages) => [...messagesWithUserNames, ...prevMessages]); // ƒобавл€ем новые сообщени€ в начало
        setLimit(newLimit);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setLoadingMore(false);
        setIsLoaded(true); // ”станавливаем isLoaded в true после загрузки сообщений
    }
};

export const apiPostPicture = async (picture, userID) => {
    try {
        const endpoint = `wall/twitt/`;
        const baseUrl = 'http://localhost:8000';
        const url = `${baseUrl}/${endpoint}`;
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserID: userID,
                Picture: picture
            })
        });
    } catch (error) {
        console.error('Error:', error);
    }
};
