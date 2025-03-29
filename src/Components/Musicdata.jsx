import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

function Musicdata() {
  const { setCurrentSong } = useOutletContext();
  const [music, setMusic] = useState([]); // State to hold fetched music data

  // Fetch music data from JSON server
  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await axios.get("http://localhost:5000/music"); // Replace with your JSON server URL
        setMusic(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching music data:", error);
      }
    };

    fetchMusic();
  }, []);

  const playSong = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="font-mono p-2">
      <h1 className="text-3xl font-bold pb-3 pt-0">Home</h1>
      <div className="grid grid-cols-3 sm:grid-cols-4  gap-4">
        {music.map((song, index) => (
          <div
            key={index}
            onClick={() => playSong(song)}
            className="flex flex-col bg-gray-900 p-4 rounded-xl cursor-pointer hover:bg-gray-800 items-center"
          >
            <img
              className="w-32 h-40 rounded-lg mb-1 object-cover"
              src={song.imgS}
              alt={song.title}
            />
            <div className="flex flex-col items-center">
              <h1 className="text-base font-semibold text-white text-center">{song.title}</h1>
              <h1 className="text-sm text-gray-400 text-center">{song.album}</h1>
              <h1 className="text-sm text-gray-500 text-center">{song.artist}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Musicdata;
