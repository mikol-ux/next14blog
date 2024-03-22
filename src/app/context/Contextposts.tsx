import { createContext, useContext, ReactNode } from "react";
import { db } from "@/firebase/firebase";
// Your Firebase context type
type FirebaseContextType = {
  firestore: any; // Adjust the type based on your Firestore instance
};

// Create the Firebase context
const FirebaseContext = createContext<FirebaseContextType>({
  firestore: db, // Set default value or use your Firestore instance
});

// Custom hook to access the Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Define the FirebaseProvider component
type FirebaseProviderProps = {
  children: ReactNode; // Define children prop as ReactNode type
};

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  return (
    <FirebaseContext.Provider value={{ firestore: db }}>
      {children}
    </FirebaseContext.Provider>
  );
};
