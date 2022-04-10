import React from 'react';
import logo from './logo.svg';
import axios from 'axios';

import './App.css';

function App() {
    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
            axios.get("http://localhost:5432/").then((response) => {
                    setPost(response.data);
                    });
            }, []);

    if (!post) return null;

    return (
            <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            </header>

            <div>
            <h1>{post}</h1>
            </div>

            </div>
           );
}

export default App;
