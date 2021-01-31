import React from 'react';

import './App.css';

import Layout from './Layout'
import { BrowserRouter as Router } from "react-router-dom";
import { AuthenticationProvider } from '../../contexts/Authentication/Authentication';

function App() {
  return (
    <AuthenticationProvider>
        <Router>
            <Layout />
        </Router>
    </AuthenticationProvider>  
  );
}

export default App;
