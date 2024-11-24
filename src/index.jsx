import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import BaseLayout from "./layouts/BaseLayout";
import Musik from "./pages/Musik/Musik";
import Textz from "./pages/Textz/Textz";

const root = document.getElementById("herblood");

/*_   _                        
    (_) | |                       
     _  | | _____   _____   _   _ 
    | | | |/ _ \ \ / / _ \ | | | |
    | | | | (_) \ V /  __/ | |_| |
    |_| |_|\___/ \_/ \___|  \__,_|
*/

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/musik" element={<BaseLayout />}>
        <Route index element={<Musik />} />
      </Route>
      <Route path="/textz" element={<BaseLayout />}>
        <Route index element={<Textz />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
