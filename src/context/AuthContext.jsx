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

const AuthContext = createContext()

function useAuth() {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const currentID = currentUser?.uid
  const [userData, setUserData] = useState([])
  const [currentUserData, setCurrentUserData] = useState([])

  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmailUser(email) {
    return updateEmail(auth.currentUser, email)
  }
  function updatePasswordUser(password) {
    return updatePassword(auth.currentUser, password)
  }

  function updateUserName(userName) {
    return updateProfile(auth.currentUser, userName)
  }

  useEffect(() => {
    //when ever we call the createUserWithEmailAndPassword its gonna set
    //user for us
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    //cleanup function
    //unsubscribe for us from the onAuthStateChanged method when unmount this component
    return unsubscribe
  }, [])

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

  //add dummy data for the user when the user sign up
  async function addDefaultData(id) {
    const userCollection = doc(db, `users/${id}`)
    try {
      await setDoc(userCollection, {
        uid: id,
        profileInfo: {
          name: "FirstName",
          surname: "LastName",
          picture: "https://www.w3schools.com/howto/img_avatar.png",
          timeStamp: serverTimestamp(),
          gsm: "05XXXXXXXXX",
          birthday: "00-00-0000",
          totalMonth: 0,
          gender: {
            male: true,
            female: false,
            theythem: false,
          },
          uid: id,
        },
        measurements: [],
        meals: [],
        exercises: [],
        payment: [],
      })
    } catch (err) {
      console.log(err)
    }
  }

  // {
  //   shoulder: 0,
  //   chest: 0,
  //   arm: 0,
  //   waist: 0,
  //   hip: 0,
  //   leg: 0,
  //   biceps: 0,
  //   triceps: 0,
  //   subscapular: 0,
  //   iliaccrest: 0,
  //   weight: 0,
  //   fat: 0,
  // }

  //user can update his/her  own data
  const updateUser = async (id, updatedData) => {
    const userDoc = doc(db, "users", id)
    try {
      await updateDoc(userDoc, { profileInfo: updatedData })
    } catch (err) {
      console.log(err)
    }
  }

  // const addMeasurement = async (id,newData) => {
  //   const userDoc = query(doc(db,"users",id,"") )
  //   try{
  //     await addDoc(userDoc,newData)
  //   }catch(err){
  //     console.log(err)
  //   }
  // }

  ////////////////////////ADMIN////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      if (currentID) {
        const q = query(collection(db, "users"), where("uid", "==", currentID))
        try {
          const querySnapshot = await getDocs(q)
          querySnapshot?.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data())
            setCurrentUserData(doc.data())
          })
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetchData()
  }, [currentUser, currentID])

  /************************************** Firebase Collection****************************************** */

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmailUser,
    updatePasswordUser,
    addDefaultData,
    userData,
    updateUserName,
    updateUser,
    currentUserData,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext, useAuth }
