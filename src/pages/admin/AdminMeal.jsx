import React, { useState, useEffect } from "react";
import FormAdminMeal from "../../components/forms/FormAdminMeal";
import { useOutletContext } from "react-router-dom";

const AdminMeal = () => {
  const [mealData, setMealData] = useState(null);

  const { data, params } = useOutletContext();

  useEffect(() => {
    if (data) {
      setMealData(data[0]?.meals);
    }
  }, [data]);
  return (
    <div className="meal card-color">
      <h2>Meal</h2>
      <FormAdminMeal uid={params.id} mealData={mealData} />
    </div>
  );
};

export default AdminMeal;
