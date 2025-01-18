import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import "./Layout.scss";
import Feedback from "../components/Feedback/Feedback";
import footer from "./footer.json";
import { useState } from "react";

function BaseLayout() {
  const [modalOpen, setIsModalOpen] = useState(false);
  const { versionName, versionUrl, lastUpdated, whatWasUpdated } = footer;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="layout" style={{ flexDirection: "column" }}>
      <div className="layout-wrapper">
        <Outlet className="container" />
        <Navbar />
      </div>
      <footer>
        <Feedback />
        <div className="footer-text">
          <img className="footer-bun" src="/gif/you.gif" />
          <p className="footer-version">
            Version: {" "}
            <a
              className="footer-version-hyperlink"
              href={versionUrl}
              target="_blank"
            >
              {versionName}
            </a>
          </p>
          <p className="footer-copyright">
            Last updated: {" "}
            <a
              className="footer-version-hyperlink"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              {lastUpdated}
            </a>
            <br />
            Copyright Sane Workshopz © 2024 - 4L
          </p>
        </div>
      </footer>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-title">{lastUpdated}</h2>
            <ul className="modal-update">
              {whatWasUpdated.map((update) => {
                return <li>{update}</li>;
              })}
            </ul>
            <button onClick={closeModal}>cool, nerd..</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default BaseLayout;
