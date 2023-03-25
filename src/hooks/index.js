import { useContext, useEffect, useState } from "react";
import { getAllAlbums, editAlbum, removeAlbum, createAlbum } from "../api";
import { AlbumsContext } from "../providers";

//this will return all the state in the context provider
export const useAlbums = () => {
  // useContext is a React Hook that lets you read and subscribe to context from your component.
  return useContext(AlbumsContext);
};

export const useProvideAlbums = () => {
  //states for albums
  const [albums = [], setAlbums] = useState();
  const [loading, setLoading] = useState(true);

  //acts as conponentDidMount to fetch all albums
  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await getAllAlbums();

      if (response.success) {
        setAlbums(response.data);
      }

      setLoading(false);
    };

    fetchAlbums();
  }, []);

  //below function makes api call to add album and based on response we are adding to state
  const addAlbum = async (title) => {
    const id = Math.floor(Math.random() * 100) + 100;
    const response = await createAlbum();
    if (response.success) {
      const newAlbum = [{ userId: id, id, title }, ...albums];
      setAlbums(newAlbum);
      // console.log(newAlbum);
      return;
    }
    throw new Error(response.message);
  };

  //below function makes api call to update a album and based on response we are changing the title in state
  const updateAlbum = async (id, title, userid) => {
    //call api and perform put operation and return success or false
    const response = await editAlbum(id, title, userid);
    if (response.success) {
      const newAlbum = albums.map((alb) => {
        if (alb.id === id) {
          alb.title = title;
        }
        return alb;
      });
      setAlbums([...newAlbum]);
      return;
    } else {
      throw new Error(response.message);
    }
  };

  //below function makes api call to delete album and based on response we are removing album from state
  const deleteAlbum = async (id) => {
    const response = await removeAlbum(id);

    if (response.success) {
      const newAlbum = [...albums].filter((alb) => alb.id !== id);
      setAlbums([...newAlbum]);
      return;
    } else {
      throw new Error("error ");
    }
  };

  //lastly we are returning the states and function to be able to use in context
  return {
    data: albums,
    loading,
    addAlbum,
    updateAlbum,
    deleteAlbum,
  };
};
