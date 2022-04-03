import { EmailAuthProvider, getAuth } from "firebase/auth";
import { StyledFirebaseAuth } from "react-firebaseui";
import { firebaseConfig } from "../firebaseConfig";
import { initializeApp } from "firebase/app";

const SigninButton = () => {
  const app = initializeApp(firebaseConfig);
  return (
    <StyledFirebaseAuth
      uiConfig={{
        signInFlow: "redirect",
        signInSuccessUrl: "localhost:3000",
        signInOptions: [
          {
            provider: EmailAuthProvider.PROVIDER_ID,
            signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
          },
        ],
      }}
      firebaseAuth={getAuth(app)}
    ></StyledFirebaseAuth>
  );
};

export default SigninButton;
