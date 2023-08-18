import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRef } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../Confitg/DatabaseConfig";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SignUp = () => {
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const phone = useRef(null);

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const submitRegister = (e) => {
    e.preventDefault();
    const id = toast.loading("Signing you up..");

    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        if (user) {
          // Send email verification
          sendEmailVerification(auth.currentUser)
            .then(() => {
              // Verification email sent successfully

              return addDoc(collection(db, "Users"), {
                name: name.current.value,
                email: email.current.value,
                phone: phone.current.value,
                time: serverTimestamp(),
              });
            })
            .then((doc) => console.log("success", doc))
            .catch((error) =>
              toast.update(id, {
                render: error.code,
                type: "info",
                isLoading: false,
                autoClose: true,
                closeOnClick: true,
              })
            );
        }

        return updateProfile(auth.currentUser, {
          displayName: name.current.value,
          photoURL:
            user.photoURL ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpWIUTEbl3Km2gu10Jsib39To4S4IYsn8QhA&usqp=CAU",
        });
      })
      .then(() => {
        if (auth.currentUser.emailVerified) {
          navigate("/");
        } else {
          toast.update(id, {
            render: "Verification email sent! verify and login.",
            type: "success",
            isLoading: false,
            autoClose: true,
            closeOnClick: true,
          });
        }
      })

      .catch((error) => {
        const errorCode = error.code;
        toast.update(id, {
          render: errorCode,
          type: "error",
          isLoading: false,
          autoClose: true,
          closeOnClick: true,
        });
      });
  };

  return (
    <div className="row mx-auto bg-light vh-100 text-dark">
      <div
        className="col-6 shadow-sm d-none d-sm-flex px-0 vh-100 justify-content-start align-items-start py-5 text-light"
        style={{
          backgroundImage: `url(
            " https://images.pexels.com/photos/14519159/pexels-photo-14519159.jpeg?auto=compress&cs=tinysrgb&w=600"
          )`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
          backgroundBlendMode: "saturation",
        }}
      >
        <div className="px-5">
          <h1 className="text-light text-center">Transit</h1>
        </div>
      </div>
      <div className="col-sm-5 my-auto mx-auto col-12 ">
        <Form
          className="  mt-5 d-flex flex-column gap-4 mb-3"
          onSubmit={submitRegister}
        >
          <div>
            <h2>Join the Ride!</h2>
            <p className="text-muted">Create an Account be part of the Ride</p>
          </div>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Full name.."
              ref={name}
              required
              className="py-3"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="tel"
              placeholder="Phone +233"
              ref={phone}
              required
              className="py-3"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Email.."
              ref={email}
              required
              className="py-3"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password.."
              ref={password}
              required
              className="py-3"
            />
            <a className="mt-3 d-flex text-muted text-decoration-none">
              Forogtten passowrd?
            </a>
          </Form.Group>
          <Button type="submit" className=" py-3">
            Sign Up
          </Button>
        </Form>
        <Link
          to="/login"
          className="text-center text-muted text-decoration-none"
        >
          Already have an account? <span className="text-primary">Log in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
