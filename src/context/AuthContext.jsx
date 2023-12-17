import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useMemo,
} from "react";
import { auth, db } from "../../firebase";

//firestore
import {
  onSnapshot,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

//auth
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const [currentUserData, setCurrentUserData] = useState([]);

  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmailUser(email) {
    return updateEmail(auth.currentUser, email);
  }
  function updatePasswordUser(password) {
    return updatePassword(auth.currentUser, password);
  }

  function updateUserName(userName) {
    return updateProfile(auth.currentUser, userName);
  }

  //set current user
  useEffect(() => {
    //when ever we call the createUserWithEmailAndPassword its gonna set
    //user for us
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    //cleanup function
    //unsubscribe for us from the onAuthStateChanged method when unmount this component
    return unsubscribe;
  }, []);

  //add dummy data for the user when the user sign up
  async function addDefaultData(id) {
    const userCollection = doc(db, `users/${id}`);
    try {
      await setDoc(userCollection, {
        uid: id,
        profileInfo: {
          name: "FirstName",
          surname: "LastName",
          picture:
            "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
          timeStamp: serverTimestamp(),
          gsm: "05XXXXXXXXX",
          birthday: "0000-00-00",
          totalMonth: 0,
          gender: {
            male: true,
            female: false,
            theythem: false,
          },
          uid: id,
        },
        measurements: [],
        meals: { breakfast: "", launch: "", dinner: "", snack: "" },
        exercises: [],
        payment: [],
        trainingDates: [],
        images: [],
      });
    } catch (err) {
      console.log(err);
    }
  }

  //user can update his/her  own data
  const updateUser = (id, updatedData) => {
    const userDoc = doc(db, "users", id);

    return updateDoc(userDoc, { profileInfo: updatedData });
  };

  const updateTrainingDate = (id, updatedData) => {
    const userDoc = doc(db, "users", id);

    return updateDoc(userDoc, { trainingDates: updatedData });
  };

  //check any realtime changes
  useEffect(() => {
    const currentID = currentUser?.uid;
    if (currentID) {
      const q = query(collection(db, "users"), where("uid", "==", currentID));
      const unsubscribedb = onSnapshot(q, function (snapshot) {
        // Sync up our local notes array with the snapshot data
        const userDataArr = snapshot.docs?.map((doc) => doc.data());

        setCurrentUserData(userDataArr[0]);
      });
      return unsubscribedb;
    }
  }, [currentUser]);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmailUser,
    updatePasswordUser,
    addDefaultData,
    updateUserName,
    updateUser,
    currentUserData,
    updateTrainingDate,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext, useAuth };
