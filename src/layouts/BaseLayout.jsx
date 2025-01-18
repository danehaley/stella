import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import "./Layout.scss";
import Feedback from "../components/Feedback/Feedback";
import footer from "./footer.json";

function BaseLayout(props) {
  const { versionName, versionUrl, lastUpdated } = footer;
  return (
    <div className="layout" style={{ flexDirection: props.layoutFlexDirection }}>
      <div className="layout-wrapper">
        <Outlet className="container"/>
        <Navbar />
      </div>
      <footer>
        <Feedback />
        <div className="footer-text">
          <img className="footer-bun" src="/gif/you.gif" />
          <p className="footer-version">
            Version:{" "}
            <a className="footer-version-hyperlink" href={versionUrl} target="_blank">
              {versionName}
            </a>
          </p>
          <p className="footer-copyright">
            Last updated: {lastUpdated} <br />
            Copyright Sane Workshopz © 2024 - 4L
          </p>
        </div>
      </footer>
    </div>
  );
}

BaseLayout.defaultProps = {
  layoutFlexDirection: "column",
};

export default BaseLayout;
