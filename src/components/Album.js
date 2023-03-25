import React, { useState } from "react";
import { useAlbums } from "../hooks/index";
import Loader from "./Loader";
export default function Album({ data }) {
  const context = useAlbums(data.title);

  //-----------------------STATES BEGIN----------------------------------
  const [newValue, setNewValue] = useState(data.title);
  const [inEditMode, setInEditMode] = useState(false);
  const [updating, setUpdating] = useState(false);
  //-----------------------STATES END----------------------------------

  //-----------------------EVENTLISTENERS BEGIN----------------------------------
  //overview: set as updating and call context to update which will render component with new value
  const handleEdit = async () => {
    if (inEditMode) {
      setUpdating(true);
      await context.updateAlbum(data.id, newValue, data.userId);
      setUpdating(false);
      setInEditMode(false);
    } else {
      setInEditMode(true);
    }
  };
  //overview: set updating true and call context to delete which will render component with new value
  const handleDelete = async () => {
    setUpdating(true);
    await context.deleteAlbum(data.id);
    setUpdating(false);
  };
  //-----------------------EVENT LISTENER END----------------------------------

  return (
    <li className="albumLi">
      {updating && <Loader />}
      {inEditMode ? (
        <>
          <input
            defaultValue={newValue}
            onChange={(e) => {
              setNewValue(e.target.value);
            }}
          />
          <div className="buttons">
            <button onClick={handleEdit}>confirm</button>
            <button onClick={() => handleDelete()}>Delete</button>
          </div>
        </>
      ) : (
        <>
          <h2>{data.id}</h2>
          <p>{data.title}</p>

          <div className="buttons">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}
