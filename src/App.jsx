import React from 'react';
import Dashboard from './Components/Dashboard';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Search from './Components/Search';
import Musicdata from './Components/Musicdata';
import Add from './Components/Add';
import SongProvider from './Components/SongContext'; 

function App() {
  return (
    <SongProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Musicdata />} />
            <Route path="/search" element={<Search />} />
            <Route path="/add" element={<Add />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SongProvider>
  );
}

export default App;
