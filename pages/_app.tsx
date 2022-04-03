import "firebaseui/dist/firebaseui.css";
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
} from "reactfire";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { firebaseConfig } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AuthProvider sdk={getAuth(app)}>
        <FirestoreProvider sdk={getFirestore(app)}>
          <ChakraProvider>
            <Component {...pageProps} app={app} />
          </ChakraProvider>
        </FirestoreProvider>
      </AuthProvider>
    </FirebaseAppProvider>
  );
};

export default MyApp;
