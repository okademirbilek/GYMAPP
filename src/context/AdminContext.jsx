import React, { useContext, useState, useEffect, createContext } from "react"
// import { enqueueSnackbar } from "notistack"
import { auth, db } from "../../firebase"
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
} from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth"

//uuid for array data
import { v4 as uuidv4 } from "uuid"

const AdminContext = createContext()

function useAdminAuth() {
  return useContext(AdminContext)
}

const AdminProvider = ({ children }) => {
  const [userData, setUserData] = useState([])
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
        }))
        setUserData(userDataArr)
      }
    )
    return unsubscribedb
  }, [])

  //****************** Measurement ****************/

  const addNewMeasurement = async (id) => {
    const userCollection = doc(db, `users/${id}`)
    const arrLength = userData.filter((item) => item.uid === id)[0].measurements
      .length
    try {
      await updateDoc(userCollection, {
        measurements: arrayUnion({
          id: arrLength,
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
      })
    } catch (err) {
      console.log(err)
    }
  }

  const updateMeasurement = (id, updatedData) => {
    const userDoc = doc(db, "users", id)

    return updateDoc(userDoc, { measurements: updatedData })
  }

  //******************* Payment ********************/

  const addNewPayment = async (id) => {
    const userCollection = doc(db, `users/${id}`)
    // const arrLength = userData.filter((item) => item.uid === id)[0].payment
    //   .length
    try {
      await updateDoc(userCollection, {
        payment: arrayUnion({
          id: uuidv4(),
          price: "",
          isConfirmed: false,
        }),
      })
    } catch (err) {
      console.log(err)
    }
  }

  const updatePayment = (id, updatedData) => {
    const userDoc = doc(db, "users", id)

    return updateDoc(userDoc, { payment: updatedData })
  }

  //******************* Member Tracking  ********************/

  const addNewTrainingDate = async (id) => {
    const userCollection = doc(db, `users/${id}`)
    try {
      await updateDoc(userCollection, {
        trainingDates: arrayUnion({
          id: uuidv4(),
          isConfirmedTrainer: false,
          isConfirmedMember: false,
        }),
      })
    } catch (err) {
      console.log(err)
    }
  }

  const updateTrainingDate = (id, updatedData) => {
    const userDoc = doc(db, "users", id)

    return updateDoc(userDoc, { trainingDates: updatedData })
  }

  const value = {
    userData,
    addNewMeasurement,
    updateMeasurement,
    addNewPayment,
    updatePayment,
    addNewTrainingDate,
    updateTrainingDate,
  }
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export { AdminProvider, AdminContext, useAdminAuth }
