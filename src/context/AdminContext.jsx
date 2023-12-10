import React, { useContext, useState, useEffect, createContext } from "react";
// import { enqueueSnackbar } from "notistack"
import { db } from "../../firebase";
import {
  onSnapshot,
  addDoc,
  collection,
  doc,
  deleteDoc,
  setDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  deleteField,
} from "firebase/firestore";

//uuid for array data
import { v4 as uuidv4 } from "uuid";

const AdminContext = createContext();

function useAdminAuth() {
  return useContext(AdminContext);
}

const AdminProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);

  //////////////////ADMIN////////////////////////////////

  //its gonna check realtimedb if any user changes
  //its for the adming panel should be private
  useEffect(() => {
    const unsubscribedb = onSnapshot(
      collection(db, "users"),
      function (snapshot) {
        // Sync up our local notes array with the snapshot data
        const userDataArr = snapshot.docs?.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserData(userDataArr);
      }
    );
    return unsubscribedb;
  }, []);

  //****************** Measurement ****************/

  const addNewMeasurement = async (id) => {
    const userCollection = doc(db, `users/${id}`);
    // const arrLength = userData.filter((item) => item.uid === id)[0].measurements
    //   .length
    try {
      await updateDoc(userCollection, {
        measurements: arrayUnion({
          id: uuidv4(),
          shoulder: 0,
          chest: 0,
          arm: 0,
          waist: 0,
          hip: 0,
          leg: 0,
          biceps: 0,
          triceps: 0,
          subscapular: 0,
          iliaccrest: 0,
          weight: 0,
          fat: 0,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateMeasurement = (id, updatedData) => {
    const userDoc = doc(db, "users", id);

    return updateDoc(userDoc, { measurements: updatedData });
  };

  const deleteMeasurement = async (id, dataId) => {
    const userDoc = doc(db, "users", id);
    const currentUserData = userData.filter((user) => user.uid === id);
    const updatedDoc = currentUserData[0].measurements.filter(
      (data) => data.id !== dataId
    );
    // const updatedDoc = currentUserData[0].measurements.toSpliced(index, 1);
    await updateDoc(userDoc, { measurements: updatedDoc }).catch((error) => {
      console.log(error);
    });
  };

  //******************* Payment ********************/

  const addNewPayment = async (id) => {
    const userCollection = doc(db, `users/${id}`);
    // const arrLength = userData.filter((item) => item.uid === id)[0].payment
    //   .length
    try {
      await updateDoc(userCollection, {
        payment: arrayUnion({
          id: uuidv4(),
          price: "",
          isConfirmed: false,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updatePayment = (id, updatedData) => {
    const userDoc = doc(db, "users", id);

    return updateDoc(userDoc, { payment: updatedData });
  };

  //******************* Member Tracking  ********************/

  const addNewTrainingDate = async (id) => {
    const userCollection = doc(db, `users/${id}`);
    try {
      await updateDoc(userCollection, {
        trainingDates: arrayUnion({
          id: uuidv4(),
          isConfirmedTrainer: false,
          isConfirmedMember: false,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateTrainingDate = (id, updatedData) => {
    const userDoc = doc(db, "users", id);

    return updateDoc(userDoc, { trainingDates: updatedData });
  };

  //******************* Meals  ********************/

  const updateMeal = (id, updatedData) => {
    const userDoc = doc(db, "users", id);

    return updateDoc(userDoc, { meals: updatedData });
  };

  //******************* Before/After Images  ********************/

  const addNewImages = async (id) => {
    const userCollection = doc(db, `users/${id}`);
    try {
      await updateDoc(userCollection, {
        images: arrayUnion({
          id: uuidv4(),
          img1: "",
          img2: "",
          img3: "",
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateImages = (id, updatedData) => {
    const userDoc = doc(db, "users", id);

    return updateDoc(userDoc, { images: updatedData });
  };

  const value = {
    userData,
    addNewMeasurement,
    updateMeasurement,
    addNewPayment,
    updatePayment,
    addNewTrainingDate,
    updateTrainingDate,
    updateMeal,
    addNewImages,
    updateImages,
    deleteMeasurement,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export { AdminProvider, AdminContext, useAdminAuth };
