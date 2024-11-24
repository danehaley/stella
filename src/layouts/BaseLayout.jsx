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
        <Outlet />
        <Navbar />
      </div>
      <footer>
        <Feedback />
        <div className="footer-text">
          <img className="footer-bun" src="/gif/you.gif" />
          <p className="footer-version">
            version: <a href={versionUrl}>{versionName}</a>
          </p>
          <p className="footer-timestamp">last updated: {lastUpdated}</p>
          <p className="footer-copyright">
            Powered by Bloodnet <br />
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
