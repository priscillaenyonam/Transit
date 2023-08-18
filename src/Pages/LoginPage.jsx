import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useRef } from "react";
import { Button } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Confitg/DatabaseConfig";
import { toast } from "react-toastify";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();

  const submitLogin = (e) => {
    e.preventDefault();

    const id = toast.loading("Signing you up..");

    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((credential) => {
        if (credential.user.emailVerified) {
          setIsVerified(true);
          toast.update(id, {
            render: `Welcome ${credential.user.displayName}`,
            type: "success",
            isLoading: false,
            autoClose: true,
            closeOnClick: true,
            closeButton: true,
          });
          return navigate("/");
        } else {
          sendEmailVerification(auth.currentUser).then(() => {
            toast.update(id, {
              render: `Email verification sent, verify and try again!`,
              type: "info",
              isLoading: false,
              autoClose: true,
              closeButton: true,
              closeOnClick: true,
            });
          });
        }
      })
      .catch((error) => {
        toast.update(id, {
          render: error.code,
          type: "error",
          isLoading: false,
          autoClose: true,
        });
      });
  };

  return (
    <div className="row mx-auto  bg-light vh-100 text-dark">
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
          onSubmit={submitLogin}
        >
          <div>
            <h2>Welcome Back!</h2>
            <p className="text-muted">Sign in if you already have an account</p>
          </div>

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
            <p className="mt-3 d-flex text-muted">Forogtten passowrd?</p>
          </Form.Group>
          <Button type="submit" className=" py-3">
            Log In
          </Button>
        </Form>
        <div className="d-flex justify-content-between">
          <Link
            to="/register"
            className="text-center text-muted text-decoration-none "
          >
            Don't have an account?{" "}
            <span className="text-primary">create account</span>
          </Link>
          {isVerified || (
            <p
              onClick={() => {
                const verifyToast = toast.loading(
                  "sending verification link.."
                );
                if (auth.currentUser) {
                  sendEmailVerification(auth.currentUser)
                    .then(() => {
                      toast.update(verifyToast, {
                        render: `Email verification sent!`,
                        type: "success",
                        isLoading: false,
                        autoClose: true,
                        closeButton: true,
                        closeOnClick: true,
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                      toast.update(verifyToast, {
                        render: error.code,
                        type: "error",
                        isLoading: false,
                        autoClose: true,
                        closeButton: true,
                        closeOnClick: true,
                      });
                    });
                } else {
                  toast.update(verifyToast, {
                    render: `Try logging in First!`,
                    type: "warning",
                    isLoading: false,
                    autoClose: true,
                    closeButton: true,
                    closeOnClick: true,
                  });
                }
              }}
              className="text-end text-muted text-decoration-none"
              role="button"
            >
              Verify Email
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
