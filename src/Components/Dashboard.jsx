import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Player from "./Player";
import { Outlet } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [music, setMusic] = useState([]); // Initialize with an empty array
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Fetch songs from JSON server
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/music"); // Replace with your JSON server URL
        setMusic(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  const nextSong = () => {
    if (currentIndex < music.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentSong(music[nextIndex]);
      setCurrentIndex(nextIndex);
    }
  };

  const previousSong = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentSong(music[prevIndex]);
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <div className="flex sm:flex-row flex-col-reverse gap-3">
      <div className="sticky sm:left-0 bottom-0">
        <Sidebar />
      </div>

      <div className="ml-24 gap-3 basis-12/12 h-screen">
        <div className="flex flex-row gap-4 items-center sm:py-4 py-1">
          <img className="sm:hidden w-12 h-12" src="logo.gif" alt="Logo" />
          <h1 className="fixed w-full h-55 pb-4 bg-black sm:text-4xl font-bold font-mono pt-12 text-white">
            Music Player
          </h1>
        </div>

        <div className="mt-6 flex gap-2">
          <div className="basis-9/12 bg-gray-950 p-2 rounded-2xl sm:mx-0 mx-2">
            <Outlet context={{ setCurrentSong, setCurrentIndex }} />
          </div>

          <div
            className="fixed right-10 basis-4/12 bg-gray-950 p-8 rounded-2xl sm:mr-2 mx-2"
            style={{ width: "300px", height: "500px" }}
          >
            <Player
              song={currentSong}
              nextSong={nextSong}
              previousSong={previousSong}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;