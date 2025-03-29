import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SongContext = createContext();

const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);

  // Load songs from the JSON server on initial render
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/music'); // JSON server endpoint
        setSongs(response.data); // Set songs from server response
      } catch (error) {
        console.error('Error fetching songs from server:', error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <SongContext.Provider value={{ songs }}>
      {children}
    </SongContext.Provider>
  );
};

export default SongProvider;
