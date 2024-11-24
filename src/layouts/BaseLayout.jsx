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
            Version:{" "}
            <a className="footer-version-hyperlink" href={versionUrl} target="_blank">
              {versionName}
            </a>
          </p>
          <p className="footer-timestamp">Last updated: {lastUpdated}</p>
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
