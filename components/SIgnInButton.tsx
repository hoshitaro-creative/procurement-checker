import { EmailAuthProvider, getAuth } from "firebase/auth";
import { FirebaseApp } from "firebase/app";
import { StyledFirebaseAuth } from "react-firebaseui";

const SigninButton = ({ app }: { app?: FirebaseApp }) => {
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
