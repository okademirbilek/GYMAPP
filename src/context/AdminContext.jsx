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

  const updateMeasurement = async (id, updatedData) => {
    const userDoc = doc(db, "users", id)
    try {
      await updateDoc(userDoc, { measurements: updatedData })
    } catch (err) {
      console.log(err)
    }
  }

  ////////////////////////ADMIN////////////////////////////////

  const value = {
    userData,
    addNewMeasurement,
    updateMeasurement,
  }
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export { AdminProvider, AdminContext, useAdminAuth }
