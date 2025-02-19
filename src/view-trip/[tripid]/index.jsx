import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import { Plane } from "lucide-react";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  // used to get trip information from fireBase

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document",docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("no such Document");
      toast("No Trip Found");
    }
  };

  return (
    <>
      <div
        className="p-10 md:px-20 lg:px-44 xl:px-56 bg-[#fffef5]"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: "contain",
          backgroundRepeat: "repeat",
        }}
      >
        {/* Information section  */}
        <InfoSection trip={trip} />

        {/* Hotel Recomendation  */}
        <Hotels trip={trip} />

        {/* Daily Plane  */}
        <PlacesToVisit trip={trip} />
      </div>
      {/* Footer  */}
      <Footer trip={trip} />
    </>
  );
}

export default Viewtrip;
