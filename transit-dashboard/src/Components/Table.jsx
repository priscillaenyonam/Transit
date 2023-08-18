import React, { useEffect } from "react";
import { auth, db } from "../Config/DatabaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";

const Table = ({ riders, drivers, setRiders, setDrivers, admin, setAdmin }) => {
  //Getting the list of Registered Drivers//

  const fetchBookedRide = async () => {
    try {
      setRiders(null);
      const querySnapshot = await getDocs(
        query(collection(db, "Booked Rides"), orderBy("time", "desc"))
      );
      let newRiders = querySnapshot.docs.map((doc) => doc.data());
      newRiders.length >= 5
        ? (newRiders = newRiders.splice(0, 5))
        : (newRiders = newRiders);
      setRiders(newRiders);

      try {
        const querySnapshot = await getDocs(collection(db, "Driver"));
        const newDrivers = querySnapshot.docs.map((doc) => doc.data());
        setDrivers(newDrivers);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRow = async (ticketId) => {
    const id = toast.loading("marke onboard");
    try {
      // Create a query to find the document with a specific field or condition
      const q = query(
        collection(db, "Booked Rides"),
        where("ticket_Id", "==", ticketId)
      );
      const querySnapshot = await getDocs(q);

      // Delete the document if it exists
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Remove the deleted row from the table by filtering the riders state
      setRiders((prevRiders) =>
        prevRiders.filter((rider) => rider.ticket_Id !== ticketId)
      );
      toast.update(id, {
        render: "user marked onboard",
        type: "success",
        isLoading: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        closeOnClick: true,
      });
    } catch (error) {
      console.log(error);
      toast.update(id, {
        render: error.code,
        type: "error",
        isLoading: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        closeOnClick: true,
      });
    }
  };

  const getUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdmin(true);
      } else {
        console.log(admin);
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return riders ? (
    <div class="table-responsive">
      <table class="table table-striped table-hover caption-top table-responsive ">
        <caption>Today's Ordered Tickets</caption>
        <thead>
          <tr>
            <th scope="col">Ticket #</th>
            <th scope="col">Destination</th>
            <th scope="col">Phone(+233)</th>
            <th scope="col">Name </th>
            <th>
              {" "}
              <span
                className="text-start "
                onClick={fetchBookedRide}
                role="button"
              >
                <i class="fa-solid fa-rotate-right"></i>
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {riders.map((rider) => {
            return (
              <tr key={Math.random()}>
                <th scope="row">{rider.ticket_Id}</th>
                <td>{rider.destination}</td>
                <td>{rider.phone}</td>
                <td>{rider.Name}</td>
                {admin ? (
                  <Button
                    className="btn-sm border-0 btn-dark bg-primary m-1 text-light"
                    onClick={() => deleteRow(rider.ticket_Id)}
                  >
                    onboard
                  </Button>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="d-flex justify-content-center ">
      <div class="spinner-border text-primary " role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Table;
