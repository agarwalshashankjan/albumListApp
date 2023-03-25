import { useAlbums } from "../hooks";
import Album from "./Album";
import Loader from "./Loader";
import Navbar from "./Navbar";

function App() {
  //getting the context
  const albums = useAlbums();

  if (albums.loading) {
    return <Loader />;
  }
  return (
    <>
      <Navbar />
      <ul className="tilesWrap">
        {albums.data.map((alb, index) => {
          return <Album data={alb} key={index} />;
        })}
      </ul>
    </>
  );
}

export default App;
