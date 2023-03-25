import React, { useState } from "react";
import { useAlbums } from "../hooks";
import Loader from "./Loader";

const Navbar = () => {
  const context = useAlbums();
  const [title, setTitle] = useState("");
  const [adding, setAdding] = useState(false);

  //?EVENTHANDLER FOR ADD new album
  //overview: set adding as true to show loader and call context to add album to state
  const handleSubmit = async () => {
    setAdding(true);
    await context.addAlbum(title);
    setAdding(false);
    setTitle("");
  };
  return (
    <div className="navbar">
      <h2>Albums List</h2>
      <input
        placeholder="Enter title of album to add"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>{adding ? <Loader /> : "ADD"}</button>
    </div>
  );
};

export default Navbar;
