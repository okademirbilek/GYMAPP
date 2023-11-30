import React, { useEffect, useState } from "react";
import { useAdminAuth } from "../../context/AdminContext";
import { useOutletContext } from "react-router-dom";
import FormPayment from "../../components/forms/FormPayment";

const AdminPayment = () => {
  const [paymentData, setPaymentData] = useState(null);
  const { data, params } = useOutletContext();
  const { addNewPayment } = useAdminAuth();

  useEffect(() => {
    if (data) {
      const dataArr = data[0]?.payment?.map((item, index) => (
        <FormPayment
          key={index}
          data={item}
          uid={params.id}
          paymentData={data[0].payment}
        />
      ));
      setPaymentData(dataArr);
    }
  }, [data]);
  return (
    <div className="payment ">
      <h2>Payment</h2>
      {paymentData}
      <button
        onClick={() => addNewPayment(params.id)}
        className="add-payment-btn p-1 br-sm"
      >
        +Add new Payment
      </button>
    </div>
  );
};

export default AdminPayment;
