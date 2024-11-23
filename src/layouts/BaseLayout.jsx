import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import "./Layout.scss";
import Feedback from "../components/Feedback/Feedback";

function BaseLayout(props) {
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
            Powered by BabyBlood.net <br />
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
