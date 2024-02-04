import Main from "../pages/Main/Main";
import Update from "../pages/update/Update";
import { Route, Routes } from "react-router-dom";

function Path() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/update" element={<Update />}></Route>
    </Routes>
  );
}

export default Path;
