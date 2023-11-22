import React, { useContext, useState, useEffect, createContext } from "react";
// import { enqueueSnackbar } from "notistack"
import { auth, db, storage } from "../../firebase";

//firestore
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

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const currentID = currentUser?.uid;
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
    if (currentID) {
      const q = query(collection(db, "users"), where("uid", "==", currentID));
      const unsubscribedb = onSnapshot(q, function (snapshot) {
        // Sync up our local notes array with the snapshot data
        const userDataArr = snapshot.docs?.map((doc) => doc.data());

        setCurrentUserData(userDataArr[0]);
      });
      return unsubscribedb;
    }
  }, [currentUser, currentID]);

  /************************************** Firebase Collection****************************************** */
  //upload the image data to firebase collection with ref and get the download url

  const uploadFile = (name, file, setFormData, setPerc, setError) => {
    // const name = "profile" + currentUser?.uid;
    const storageRef = ref(storage, name);
    // const storageRef = ref(storage, `${currentUser?.uid}/profileimg`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setPerc(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
        setError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log(downloadURL);
          setFormData((prev) => ({ ...prev, picture: downloadURL }));
        });
      }
    );
  };

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
    uploadFile,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext, useAuth };

//////////////////ADMIN////////////////////////////////

// //its gonna check realtimedb if any user changes
// //its for the adming panel should be private
// useEffect(() => {
//   const unsubscribedb = onSnapshot(
//     collection(db, "users"),
//     function (snapshot) {
//       // Sync up our local notes array with the snapshot data
//       const userDataArr = snapshot.docs?.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }))
//       setUserData(userDataArr)
//     }
//   )
//   return unsubscribedb
// }, [])

// const addNewMeasurement = async (id, updatedData) => {
//   const userCollection = doc(db, `users/${id}`)
//   const arrLength = userData.filter((item) => item.uid === id)[0].measurements
//     .length
//   try {
//     await updateDoc(userCollection, {
//       measurements: arrayUnion({
//         id: arrLength,
//         shoulder: 0,
//         chest: 0,
//         arm: 0,
//         waist: 0,
//         hip: 0,
//         leg: 0,
//         biceps: 0,
//         triceps: 0,
//         subscapular: 0,
//         iliaccrest: 0,
//         weight: 0,
//         fat: 0,
//       }),
//     })
//   } catch (err) {
//     console.log(err)
//   }
// }

// const updateMeasurement = async (id, updatedData) => {
//   const userDoc = doc(db, "users", id)
//   try {
//     await updateDoc(userDoc, { measurements: updatedData })
//   } catch (err) {
//     console.log(err)
//   }
// }

////////////////////////ADMIN////////////////////////////////
