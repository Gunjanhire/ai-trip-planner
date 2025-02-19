import { db } from "@/service/firebaseConfig";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigation = useNavigation();
  const [userTrip, setUserTrip] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  // get to used all user trips
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigation("/");
      return;
    }
    setUserTrip([]);
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      setUserTrip((prevVal) => [...prevVal, doc.data()]);
    });
  };
  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-32 xl:px-48 pt-10 bg-[#fffef5]">
      {/* Header Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        <img
          src="/couple.png"
          alt="Travel Icon"
          className="h-16 w-16 sm:h-20 sm:w-20"
        />
        <h2 className="font-bold text-2xl sm:text-3xl">MyTrip</h2>
      </div>

      {/* Grid Layout for Trips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
        {userTrip?.length > 0
          ? userTrip.map((trip, index) => (
              <UserTripCardItem trip={trip} key={index} />
            ))
          : [1, 2, 3, 4, 5, 6].map((_, index) => (
              <div
                key={index}
                className="h-[220px] sm:h-[250px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default MyTrips;
