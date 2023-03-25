import { API_URLS } from "../utils/constants";

// ?Below is a customfetch function we created to fetch api so that we wont have to write the repetitive code for all fetch requests(GET,POST ,etc)
const customFetch = async (url, { body, ...customConfig }) => {
  //we are defining headers below
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };
  //creating a assimilation of config with what we get as argument and what we defined in headers
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  try {
    //here we are making a simple api call and converting it to json
    const response = await fetch(url, config);
    const data = await response.json();

    // if status of the fetch is a success, then returning the data
    if (data) {
      return {
        data: data,
        success: true,
      };
    }

    //else throw the error
    throw new Error(data.message);
  } catch (error) {
    return {
      message: "error in api ",
      success: false,
    };
  }
};

//?BELOW ARE OUR API CALLS
//for getting all albums
export const getAllAlbums = () => {
  return customFetch(API_URLS.getAllAlbums(), {
    method: "GET",
  });
};

//for creating new album
export const createAlbum = (userId, id, title) => {
  return customFetch(API_URLS.createAlbum(userId, id, title), {
    method: "POST",
    body: {
      userId,
      id,
      title,
    },
  });
};

//for editing a album
export const editAlbum = (id, title, userid) => {
  return customFetch(API_URLS.updateAlbum(id), {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      title: title,
      userid: userid,
    }),
  });
};
//for deleting a album
export const removeAlbum = (id) => {
  return customFetch(API_URLS.deleteAlbum(id), {
    method: "DELETE",
  });
};
