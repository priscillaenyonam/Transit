import React, { useEffect, useState } from "react";
import Blob from "../Assets/Blob.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Confitg/DatabaseConfig";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
        setPhoto(user.photoURL);
        if (!user.emailVerified) {
          return navigate("/login");
        }
      } else {
        return navigate("/login");
      }
    });
  }, []);

  return (
    <>
      <div className="container vh-100">
        <Navbar photo={photo} name={name} />
        <div className="row align-items-center justify-content-center">
          <div className="col-md-5">
            <p className="display-2 pt-5 mt-5">
              Affordable Ride From Anywhere at Anytime.
            </p>
            <div className="d-flex gap-3 mt-4 pt-5">
              <Link
                to="/bookride"
                className="btn btn-primary px-md-5 py-md-3 rounded-3  shadow-sm"
              >
                Book a Ride
              </Link>
              <Link
                to="/becomerider"
                className="btn btn-light  px-md-5 py-md-3 rounded-3 shadow-sm border border-mute"
              >
                Become a Rider
              </Link>
            </div>
          </div>
          <div className="col-md-7">
            <img src={Blob} alt="" width="100%" className="image-fluid " />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
