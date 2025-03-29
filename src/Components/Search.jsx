import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

function Search() {
  const { setCurrentSong } = useOutletContext();
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]); // State to hold fetched songs
  const [filteredSongs, setFilteredSongs] = useState([]); // State for filtered songs

  // Fetch songs from JSON server
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/music"); // Replace with your JSON server URL
        setSongs(response.data); // Set all songs
        setFilteredSongs(response.data); // Set filtered songs to all initially
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);//The empty array [] tells useEffect to run the fetchSongs function only once when the component mounts

  // Handle search input and filter songs
  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);

    const filtered = songs.filter((song) =>
      song.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  // Play song on click
  const playSong = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="min-w-[900px]">
      {/* Header Section */}
      <div className="flex pt-5 flex-row justify-between p-4">
        <h1 className="text-2xl font-bold">Search</h1>
        <input
          type="text"
          placeholder="Search for a song..."
          value={query}
          onChange={handleSearch}
          className="border p-2 rounded-xl"
        />
      </div>

      {/* Songs List Section */}
      <div className="flex flex-col pb-4 gap-4 mt-4 mx-4">
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            onClick={() => playSong(song)}
            className="flex flex-row justify-between bg-gray-900 px-4 py-2  rounded-xl items-center cursor-pointer"
          >
            {/* Image */}
            <img
              className="w-10 h-10 rounded-lg object-cover"
              src={song.imgS}
              alt={song.title}
            />

            {/* Title */}
            <div className="flex-1 ml-4">
              <h2 className="text-sm font-semibold">{song.title}</h2>
            </div>

            {/* Artist */}
            <div className="flex-1 text-center">
              <h2 className="text-sm">{song.artist}</h2>
            </div>

            {/* Album */}
            <div className="flex-1 text-center">
              <h2 className="text-sm">{song.album}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
