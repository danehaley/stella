import { useState } from "react";
import adjustFontSize from "../../../../util/dynamicFontSize";
import "./Album.scss";

function Album(props) {
  const album = props.album;

  return (
    <div className="album">
      <img
        className="album-cover"
        style={props.loaded ? {} : { opacity: 0 }}
        src={"covers/cover" + album.id + ".png"}
        onLoad={() => props.setLoaded(true)}
      />
      <p className="album-title" style={{ fontSize: adjustFontSize(album.title, 0.4, 1, 0.002) }}>
        {album.title}
      </p>
      {album.subtitle !== undefined && (
        <p className="album-subtitle">
          {album.subtitle} <span className="album-mixtitle"> {album.mixTitle}</span>
        </p>
      )}
      {album.artist !== undefined && <p className="album-artist">{album.artist}</p>}
      <p className="album-times">
        <span className="album-date">{album.date}</span>
        <span className="album-times-divider">|</span>
        <span className="album-time">{album.length}</span>
      </p>
      <ul className="album-links">
        {album.downloads.map((download) => {
          return (
            <li className="link" key={download.title + " " + download.url}>
              <a href={download.url} target="_blank" rel="noopener noreferrer">
                ⤓ {download.title} ⤓
              </a>
            </li>
          );
        })}
      </ul>
      <div className="album-tracklist tracklist-container">
        <p className="tracklist-title">--TRACKLIST--</p>
        <ul className="tracklist">
          {album.tracklist.map((track) => {
            return (
              <li className="tracklist-track track" key={track.trackNo + " " + track.title}>
                <p className="tracklist-track-name track-name">
                  {track.trackNo < 10 ? "0" + track.trackNo : track.trackNo} {track.title}
                </p>
                {track.mixTitle !== "" && (
                  <p className="tracklist-mix-name track-mix-name">({track.mixTitle})</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Album;
