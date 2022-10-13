import React from "react";
import "./App.css";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import app from "./firebaseConfig/firebaseConfig";

const App = () => {
  const [user, setUser] = React.useState({});

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.error(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      {user.email ? (
        <div>
          <button onClick={handleSignOut}>Sign out</button>
          <h1>{user.displayName}</h1>
          <p>{user.email}</p>
          <img src={user.photoURL} alt={user.displayName} />
        </div>
      ) : (
        <button onClick={handleGoogleSignIn}>Google sign in</button>
      )}
    </div>
  );
};

export default App;
