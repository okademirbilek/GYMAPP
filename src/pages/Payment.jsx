import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import TablePayment from "../components/tables/TablePayment";
import payment from "../assets/images/payment.png";

import Loader from "../components/Loader";

const Payment = () => {
  const [loading, setLoading] = useState(true);
  const { currentUserData } = useAuth();

  useEffect(() => {
    if (currentUserData) {
      setLoading(false);
    }
  }, [currentUserData]);

  //handle if user refresh the page
  if (loading) {
    return (
      <span className="loader">
        <Loader />
      </span>
    );
  }
  return (
    <>
      <div className="payment-header  display-f align-center gp-1">
        <h2>Payment</h2>
        {/* <img src={payment} alt="payment card" /> */}
      </div>
      {currentUserData?.payment?.map((data, index) => (
        <TablePayment key={index} data={data} index={index} />
      ))}
    </>
  );
};

export default Payment;
