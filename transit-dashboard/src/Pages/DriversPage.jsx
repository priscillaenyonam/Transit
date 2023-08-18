import React, { useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../Config/DatabaseConfig";

const DriversPage = ({
  riders,
  setDrivers,
  setRiders,
  drivers,
  Admin,
  setAdmin,
}) => {
  const fetchDrivers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Driver"));
      const newDrivers = querySnapshot.docs.map((doc) => doc.data());
      setDrivers(newDrivers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  });

  return drivers ? (
    <div class="table-responsive pt-5">
      <table class="table table-striped table-hover caption-top table-responsive ">
        <caption>All available Transport Drivers</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Work location</th>
            <th scope="col">Phone(+233)</th>
            <th scope="col">vehicle </th>
            <th scope="col">Number plate </th>
            <th>
              {" "}
              <span
                className="text-start "
                onClick={fetchDrivers}
                role="button"
              >
                <i class="fa-solid fa-rotate-right"></i>
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {drivers.map((driver) => {
            return (
              <tr key={Math.random()}>
                <th scope="row">{driver.name}</th>
                <td>{driver.workLocation}</td>
                <td>{driver.phone}</td>
                <td>{driver.vehicle}</td>
                <td>{driver.carNumber}</td>
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

export default DriversPage;
