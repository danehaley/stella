import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import "./Layout.scss";
import Feedback from "../components/Feedback/Feedback";
import gitInfo from "../gitInfo.json";

function BaseLayout(props) {
  const { lastUpdated, versionInfo } = gitInfo;
  return (
    <div className="layout" style={{ flexDirection: props.layoutFlexDirection }}>
      <div className="layout-wrapper">
        <Outlet />
        <Navbar />
      </div>
      <footer>
        <Feedback />
        <div className="footer-text">
          <img src="/gif/you.gif" />
          <p>
            version: <a href={versionInfo.url}>{versionInfo.name}</a>
          </p>
          <p>last updated {lastUpdated}</p>
          <p>
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
