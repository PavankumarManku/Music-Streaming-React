import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

function Search() {
  const { setCurrentSong } = useOutletContext();
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album: "",
    imgS: "",
    src: "",
  });

  // Fetch songs from the JSON server on component mount
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/music"); // Replace with your JSON server URL
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(query.toLowerCase())
  );

  const playSong = (song) => {
    setCurrentSong(song);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSong((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSong = async () => {
    if (
      !newSong.title ||
      !newSong.artist ||
      !newSong.album ||
      !newSong.imgS ||
      !newSong.src
    ) {
      alert("Please fill in all fields before adding a song.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/music", newSong); // Replace with your JSON server URL
      setSongs((prev) => [...prev, response.data]);
      setNewSong({ title: "", artist: "", album: "", imgS: "", src: "" });
    } catch (error) {
      console.error("Error adding song:", error);
    }
  };

  const deleteSong = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/music/${id}`); // Replace with your JSON server URL
      setSongs((prev) => prev.filter((song) => song.id !== id));
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  return (
    <div className="min-w-[900px] px-6 py-4">
      {/* Header Section */}
      <div className="flex pt-5 flex-row justify-between px-4">
        <h1 className="text-2xl font-bold">Playlist</h1>
        <input
          type="text"
          placeholder="Search for a song..."
          value={query}
          onChange={handleSearch}
          className="border p-2 rounded-xl"
        />
      </div>

      {/* Song List */}
      <div className="flex flex-col gap-4 mt-5 mx-4">
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            className="flex flex-row justify-between bg-gray-900 px-4 py-2 rounded-xl items-center cursor-pointer"
          >
            <div className="flex items-center gap-4 w-[40%]">
              {/* Image and Title */}
              <img
                className="w-10 h-10 rounded-lg object-cover"
                src={song.imgS}
                alt={song.title}
                onClick={() => playSong(song)}
              />
              <h2 className="text-sm font-semibold">{song.title}</h2>
            </div>
            <h2 className="text-sm w-[30%] text-center">{song.artist}</h2>
            <h2 className="text-sm w-[30%] text-center">{song.album}</h2>
            <button
              className="bg-red-500 px-2 py-1 rounded-lg text-white hover:bg-red-600"
              onClick={() => deleteSong(song.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add New Song */}
      <div className="mt-5 mx-4">
        <h2 className="text-lg font-bold">Add a New Song</h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newSong.title}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="artist"
            placeholder="Artist"
            value={newSong.artist}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="album"
            placeholder="Album"
            value={newSong.album}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="imgS"
            placeholder="Image URL"
            value={newSong.imgS}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="src"
            placeholder="Audio URL"
            value={newSong.src}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <button
            className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600"
            onClick={addSong}
          >
            Add Song
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
