import { useState } from "react";
import "./MusikNavigator.scss";
import data from "./albums.json";
import Album from "../Album/Album";
import { useEffect } from "react";

function MusikNavigator(props) {
  const [albumId, setAlbumId] = useState(0);
  const [album, setAlbum] = useState(data[albumId]);

  useEffect(() => {
    setAlbum(data[albumId]);
  }, [albumId]);

  function navigate(direction) {
    switch (direction) {
      case "left":
        if (albumId - 1 < 0) setAlbumId(data.length - 1);
        else setAlbumId(albumId - 1);
        break;
      case "right":
        if (albumId + 1 > data.length - 1) setAlbumId(0);
        else {
          setAlbumId(albumId + 1);
        }
        break;
    }
  }
  return (
    <div className="musiknavigator-container">
      <div className="album-wrapper">
        <Album album={album} />
      </div>
      <div className="musiknavigator-select-container">
        <button
          className="musiknavigator-select musiknavigator-select--left"
          onClick={() => navigate("left")}>
          ↫
        </button>
        <p className="text-emblem">𖤓</p>
        <button
          className="musiknavigator-select musiknavigator-select--right"
          onClick={() => navigate("right")}>
          ↬
        </button>
      </div>
    </div>
  );
}

export default MusikNavigator;
