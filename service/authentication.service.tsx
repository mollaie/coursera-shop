import * as firebase from "firebase";
import "firebase/firestore";
import UserModel from "../models/user.model";

export const AuthenticationService = {
  Registration: async (model: UserModel): Promise<boolean> => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(model.Email, model.Password);
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      const db = firebase.firestore();
      await db.collection("users").doc(currentUser?.uid).set({
        email: currentUser?.email,
        LastName: model.LastName,
        FirstName: model.FirstName,
        Mobile: model.Mobile,
      });
      return true;
    } else {
      return false;
    }
  },

  SignIn: async (email: string, password: string) =>
    await firebase.auth().signInWithEmailAndPassword(email, password),

  LoggingOut: async () => await firebase.auth().signOut(),
};
