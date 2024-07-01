// App.js
import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WallPage from './pages/WallPage';
import './App.css';


const router = createHashRouter([
    {
        element: <LoginPage />,
        path: '/',
    },
    {
        element: <RegisterPage />,
        path: '/register',
    },
    {
        element: <WallPage />,
        path: '/wall',
    }
]);

function App() {

    return (
        <div className='App-back'>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
