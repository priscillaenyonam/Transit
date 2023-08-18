import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Confitg/DatabaseConfig";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "./Components/Navbar";

const BecomeRider = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [uid, setUid] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [age, setAge] = useState("");
  const [idCard, setIdCard] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [carDescription, setCarDescription] = useState("");
  const [formState, setFormState] = useState(1);

  const [photo, setPhoto] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setName(user.displayName);
        setEmail(user.email);
        setUid(user.uid);
        setPhoto(user.photoURL);
      } else {
        return navigate("/login");
      }
    });
  }, []);

  const submitRegister = (e) => {
    e.preventDefault();

    if (formState >= 3) {
      const toastId = toast.loading("Signing you up...");
      console.log(formState);
      //submitForm
      setDoc(doc(db, "Driver", uid), {
        name,
        email,
        phone,
        workLocation,
        vehicle,
        carNumber,
        carDescription,
        idCard,
        time: serverTimestamp(),
      })
        .then(() => {
          toast.update(toastId, {
            render: "Application successfully sent!",
            type: "success",
            isLoading: false,
            autoClose: true,
          });
          setFormState(0);
        })
        .catch((error) =>
          toast.update(toastId, {
            render: error.code,
            type: "error",
            isLoading: false,
            autoClose: true,
          })
        );
    } else {
      console.log(formState);
      setFormState(formState + 1);
    }
  };

  return (
    <div>
      <Navbar photo={photo} name={name} />
      <div className="container">
        <div className="row justify-content-center align-items-center mt-5 pt-5">
          <div className="text-center">
            <h1 className="display-1">
              Become a <span className="text-primary fw-bold">Rider</span>
            </h1>
            <p className="text-muted">Take trips around you, Earn some cash</p>
          </div>
        </div>
        <div className="row justify-content-center text-center mx-auto ">
          <Form
            className="  mt-5 d-flex flex-column gap-4 col-10 col-sm-6 "
            onSubmit={submitRegister}
          >
            <div>
              {formState === 2 ? (
                <h2>About your vehicle!</h2>
              ) : formState === 3 ? (
                <h2 className="text-dark">You're almost done!</h2>
              ) : (
                <h2>Join the Ride!</h2>
              )}
              <p className="text-muted">
                Create an Account be part of the Ride
              </p>
            </div>
            {formState === 1 ? (
              <>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Full name.."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="py-3"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="tel"
                    placeholder="Phone +233"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="py-3"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Email.."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-3"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="eg Accra:"
                    value={workLocation}
                    onChange={(e) => setWorkLocation(e.target.value)}
                    className="py-3"
                    required
                  />
                  <a className="mt-3 d-flex text-muted text-decoration-none">
                    Need more information? contact us
                  </a>
                </Form.Group>
              </>
            ) : formState === 2 ? (
              <>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="vehicle type"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="py-3"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="py-3"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Ghana card number"
                    value={idCard}
                    onChange={(e) => setIdCard(e.target.value)}
                    className="py-3"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="car number"
                    value={carNumber}
                    onChange={(e) => setCarNumber(e.target.value)}
                    className="py-3"
                    required
                  />
                  <a className="mt-3 d-flex text-muted text-decoration-none">
                    Need more information? contact us
                  </a>
                </Form.Group>
              </>
            ) : formState === 3 ? (
              <>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Vehicle description"
                    value={carDescription}
                    onChange={(e) => setCarDescription(e.target.value)}
                    className="py-3"
                    required
                  />
                </Form.Group>
              </>
            ) : (
              <img
                src="https://cdn.pixabay.com/photo/2020/04/10/13/28/success-5025797_1280.png"
                alt=""
                width="200px"
                className="mx-auto"
              />
            )}

            {formState === 3 ? (
              <Button type="submit" className=" py-2 px-4 rounded">
                Complete
              </Button>
            ) : formState === 1 || formState === 2 ? (
              <Button type="submit" className="py-2 px-4 rounded">
                Next
              </Button>
            ) : (
              <Button
                onClick={() => {
                  return navigate("/");
                }}
                className=" py-2 px-4 rounded"
              >
                Back to Home
              </Button>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BecomeRider;
