import React, { useState, ChangeEvent, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore"; // Import Firestore functions for updating and fetching documents
import { useFirebase } from "../context/Contextusers";

type Option = {
  value: string;
  label: string;
};

type UserProps = {
  id: string;
  Email: string;
  role: string;
};

const User: React.FC<UserProps> = ({ id, Email, role }) => {
  const { firestore } = useFirebase();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const options: Option[] = [
    { value: "Admin", label: "admin" },
    { value: "user", label: "user" },
    { value: "moderator", label: "moderator" },
  ];

  const handleSelectChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newRole = event.target.value;
    setSelectedOption(newRole);

    const userRef = doc(firestore, "users", id);

    try {
      await updateDoc(userRef, { role: newRole });
      console.log("User role updated successfully");

      // After updating, fetch the updated role from Firestore
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedRole = userData?.role;
        setSelectedOption(updatedRole || ""); // Update the selected option with the fetched role
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  // Fetch the updated role on component mount
  useEffect(() => {
    const fetchUserRole = async () => {
      const userRef = doc(firestore, "users", id);
      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const fetchedRole = userData?.role;
          setSelectedOption(fetchedRole || "");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, [firestore, id]);

  return (
    <div className="flex p-1 justify-around text-start">
      <h1>{Email}</h1>
      {<h1>{selectedOption}</h1> || <h1>{role}</h1>}
      <div>
        {/* <label htmlFor="selectOptions">Choose an option:</label> */}
        <select
          id="selectOptions"
          value={selectedOption}
          onChange={handleSelectChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default User;
