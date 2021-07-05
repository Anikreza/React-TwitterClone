import './App.css';
import React from 'react'
import Sidebar from './Sidebar';
import Feed from './Feed';
import Right from './Right';

function App() {
  return (
    <div className="app">
         <Sidebar/>
         <Feed/>
         <Right/>
    </div>
  );
}

export default App;