import React, { createContext, useContext, useEffect, useState } from "react";
import { useFirestore, useAuth } from "reactfire";
import { AuthContext } from "./AuthContext";
import { authObserver } from "../services/auth";

export const FireStoreContext = createContext();
const FireStoreContextProvider = (props) => {
  const { addUser, stopLoading } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [session, setSession] = useState({});

  const addSession = (data) => {
    setSession({ ...data });
    stopLoading();
  };
  const addProfile = (data) => {
    setProfile({ ...data });
    stopLoading();
  };
  const auth = useAuth();
  useEffect(() => {
    authObserver(auth, addUser);
  }, []);
  const tutorDoc = useFirestore().collection("tutors");
  const sessionDoc = useFirestore().collection("session");
  const studentDoc = useFirestore().collection("students");
  // const storage = useFirebaseApp().storage()

  return (
    <FireStoreContext.Provider
      value={{
        tutorDoc,
        sessionDoc,
        studentDoc,
        profile,
        addProfile,
        session,
        addSession,
        // storage,
      }}
    >
      {props.children}
    </FireStoreContext.Provider>
  );
};

export default FireStoreContextProvider;
