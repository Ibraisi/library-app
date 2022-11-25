import React from 'react';
import './App.css';
import { Navbar } from './Layouts/NavbarAndFooter/Navbar';
import { ExploreTopBooks } from './Layouts/NavbarAndFooter/HomePage/ExploreTopBooks';

function App() {
  return (
    <div>
    <Navbar/>
    <ExploreTopBooks/>
    </div>
  );
}

export default App;
