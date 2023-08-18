import "./App.css";
import BecomeRider from "./Pages/BecomeRider";
import BookRidePage from "./Pages/BookRidePage";

import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage.jsx";
import SignUp from "./Pages/SignUpPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/bookride" element={<BookRidePage />} />
        <Route path="/becomerider" element={<BecomeRider />} />
      </Routes>
    </>
  );
}

export default App;
