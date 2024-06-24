import React, { useState } from 'react';

function FaceQR() {
    const [token, setToken] = useState('');
    const [response, setResponse] = useState('');

    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    const handleSendToken = async (event) => {
        event.preventDefault();

        try {
            const serverResponse = await fetch('http://127.0.0.1:5000/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const jsonResponse = await serverResponse.json();
            setResponse(jsonResponse.status);
        } catch (error) {
            console.error('Error sending token:', error);
        }
    };

    return (
        <div>
            <h1>FaceQR</h1>
            <form onSubmit={handleSendToken}>
                <div className='space-x-2'>
                    <input
                        className='border dark:border-gray-400 rounded-xl py-2 px-4 focus:outline-none focus:border-indigo-500'
                        type="text"
                        placeholder="Enter unique token"
                        value={token}
                        onChange={handleTokenChange}
                    />
                    <button
                        type="submit"
                        className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-xl mt-6'
                    >
                        Send Token to Server
                    </button>
                </div>
            </form>
            <div>
                {response && (
                    <p>Server Response: {response}</p>
                )}
            </div>
        </div>
    );
}

export default FaceQR;