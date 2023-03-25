import { createContext } from "react";

import { useProvideAlbums } from "../hooks";
//initial state of context
const initialState = {
  albums: [],
  loading: true,
  addAlbum: () => {},
  updateAlbum: () => {},
  deleteAlbum: () => {},
};

//creating a context
export const AlbumsContext = createContext(initialState);

//custom provider function
export const AlbumsProvider = ({ children }) => {
  const albums = useProvideAlbums();

  return (
    <AlbumsContext.Provider value={albums}>{children}</AlbumsContext.Provider>
  );
};
