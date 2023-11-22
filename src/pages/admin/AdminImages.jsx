import React, { useEffect, useState } from "react";
import { useAdminAuth } from "../../context/AdminContext";
import { useOutletContext } from "react-router-dom";
import FormAdminImages from "../../components/forms/FormAdminImages";

const AdminImages = () => {
  const [imagesData, setImagesData] = useState(null);
  const { data, params } = useOutletContext();
  const { addNewImages } = useAdminAuth();
  useEffect(() => {
    if (data) {
      const dataArr = data[0]?.images?.map((item, index) => (
        <FormAdminImages
          key={index}
          data={item}
          uid={params.id}
          imagesData={data[0].images}
        />
      ));
      setImagesData(dataArr);
    }
  }, [data]);
  return (
    <div className="images">
      <h2>Images</h2>
      {imagesData}
      <button
        onClick={() => addNewImages(params.id)}
        className="add-images-btn p-1 br-sm bg-info"
      >
        +Add new images
      </button>
    </div>
  );
};

export default AdminImages;
