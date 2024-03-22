import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useFirebase } from "../context/Contextusers"; // Import your Firebase context

const MyComponent = () => {
  const { firestore } = useFirebase();
  const [data, setData] = useState<any[]>([]); // Adjust the type based on your data structure

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "users")); // Replace 'yourCollection' with your collection name
        const newData: any[] = [];
        querySnapshot.forEach((doc) => {
          newData.push({ id: doc.id, ...doc.data() });
        });
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [firestore]);

  // Render your component using 'data' state
  // ...
  console.log(data);
  return <h1>users</h1>;
};

export default MyComponent;
