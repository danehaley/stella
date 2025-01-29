import { Outlet } from "react-router";
import "./Layout.scss";

function BaseLayout() {

  return (
    <div className="layout" style={{ flexDirection: "column" }}>
      <div className="layout-wrapper">
        <Outlet className="container" />
      </div>
    </div>
  );
}
export default BaseLayout;
