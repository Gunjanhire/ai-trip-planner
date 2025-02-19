import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AI_PROMPT,
  SelectBudgetOption,
  SelectTravelesList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function CreateTrip() {
  // const [place,setPlace]=useState();
  const [query, setQuery] = useState(""); // For the input value
  const [suggestions, setSuggestions] = useState([]); // For storing the search suggestions

  const [formData, setFormData] = useState([]);
  const [openDailog, setopenDailog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setopenDailog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast.warning("Please Fill All Details..");
      return;
    }

    setLoading(true);
    const FINAL_PROMT = AI_PROMPT.replace(
      "{location}",
      formData?.location.display_name
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setopenDailog(false);
        onGenerateTrip();
      });
  };

  // Handle input change and fetch suggestions from OSM
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        // Fetch location suggestions from OSM (Nominatim)
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1`
        );
        setSuggestions(response.data); // Store suggestions in state
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };

  // Handle when a suggestion is selected
  const handleSelect = (place) => {
    setQuery(place.display_name); // Set input value to selected location
    setSuggestions([]); // Clear suggestions after selection
    // console.log("Selected Location:", place); // You can save this location data as needed
    handleInputChange("location", place);
  };

  return (
    <div
      className="px-5 sm:px-10 md:px-32 lg:px-56 xl:px-72 w-full flex flex-col"
      style={{
        backgroundImage: "url('/form4.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="font-bold text-3xl sm:text-4xl pt-10 font-sarala flex items-center gap-2">
        Tell us your travel preferences
        <img src="/chat.png" alt="Travel Icon" className="h-12 w-12" />
      </h2>

      <p className="mt-3 text-gray-500 text-lg sm:text-xl font-passion">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10 font-passion">
        <div>
          <div className="flex items-center gap-2">
            <img src="/destination.png" alt="Travel Icon" className="h-9 w-9" />
            <h2 className="text-lg sm:text-xl my-3 font-bold">
              What is Your Destination?
            </h2>
          </div>

          {/* Location Search Bar */}
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            className="backdrop-blur-sm bg-transparent w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for a location..."
          />

          {/* Display Suggestions */}
          {suggestions.length > 0 && (
            <ul className="backdrop-blur-lg bg-transparent absolute w-full sm:w-[500px] md:w-[700px] lg:w-[900px] xl:w-[1110px] bg-white border mt-1 rounded-lg shadow-lg z-10">
              {suggestions.map((place) => (
                <li
                  key={place.place_id}
                  onClick={() => handleSelect(place)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-5 sm:gap-9">
        <div className="w-full sm:w-1/2">
          <div className="flex items-center gap-2">
            <img
              src="/days.png"
              alt="Travel Icon"
              className="h-8 sm:h-9 w-8 sm:w-9"
            />
            <h2 className="text-lg sm:text-xl my-3 font-bold">
              How Many Days Are You Planning?
            </h2>
          </div>
          <input
            placeholder="Ex. 3"
            type="number"
            className="backdrop-blur-sm bg-transparent w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div className="w-full sm:w-1/2">
          <div className="flex items-center gap-2">
            <img
              src="/calendar.png"
              alt="Travel Icon"
              className="h-8 sm:h-9 w-8 sm:w-9"
            />
            <h2 className="text-lg sm:text-xl my-3 font-bold">
              Choose Your Travel Date
            </h2>
          </div>
          <input
            type="date"
            name="date"
            onChange={(e) => handleInputChange("date", e.target.value)}
            className="backdrop-blur-sm bg-transparent w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <h2 className="mt-14 text-xl my-3 font-bold font-passion">
          What is Your Budget ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5 bg-transparent backdrop-blur-sm">
          {SelectBudgetOption.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border shadow-lg border-gray-300 hover:border-blue-500 hover:shadow-xl cursor-pointer rounded-lg transition flex justify-between items-center
                ${formData?.budget == item.title && "shadow-lg border-gray-950"}
              `}
            >
              {/* left content */}
              <div>
                {/* <h2 className="text-3xl">{item.icon}</h2> */}
                <h2 className="font-bold text-lg sm:text-xl">{item.title}</h2>
                <h2 className="text-sm sm:text-lg text-gray-500">
                  {item.desc}
                </h2>
              </div>

              {/* right cnotent */}
              <img src={item.img} className="h-20 sm:h-24 w-20 sm:w-24" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mt-14 text-xl my-3 font-bold font-passion">
          Who do you plan on traveling with on your next adventure ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5 bg-transparent backdrop-blur-sm">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border shadow-lg border-gray-300 hover:border-blue-500 hover:shadow-xl cursor-pointer rounded-lg transition flex justify-between items-center
              ${
                formData?.traveler == item.people && "shadow-lg border-gray-950"
              }
              `}
            >
              <div>
                {/* <h2 className="text-3xl">{item.icon}</h2> */}
                <h2 className="font-bold text-lg sm:text-xl">{item.title}</h2>
                <h2 className="text-sm sm:text-lg text-gray-500">
                  {item.desc}
                </h2>
              </div>

              <img src={item.img} className="h-20 sm:h-24 w-20 sm:w-24" />
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <button
          disabled={loading}
          onClick={onGenerateTrip}
          className="h-12 px-6 sm:px-8 text-lg sm:text-xl bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border-2 border-black cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2 ">
              <AiOutlineLoading3Quarters className="!h-6 !w-6  text-inherit animate-spin text-blue-400" />
              Loading...
            </span>
          ) : (
            "Generate Trip"
          )}
        </button>
      </div>

      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              {/* <img src='/user.png' /> */}
              <h2 className="font-bold text-xl mt-7">Sing In With Google</h2>
              <p className="text-lg">
                Sing in to the App with Google authentication securely
              </p>
              <Button onClick={login} className="w-full mt-5 text-xl">
                <FcGoogle className="h-12 w-10" />
                Sing In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
