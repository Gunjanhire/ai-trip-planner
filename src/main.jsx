import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/custom/Header.jsx";
import { Toaster } from "./components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Viewtrip from "./view-trip/[tripid]";
import MyTrips from "./MyTrip";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/view-trip/:tripId",
    element: <Viewtrip />,
  },
  {
    path: "/My-trips",
    element: <MyTrips />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster
        position="bottom-left"
        toastOptions={{
          classNames: {
            toast:
              "w-98 h-20 text-lg p-4 bg-orange-50 text-orange-700 border border-orange-300 shadow-md", // Adjust width, height, text size
            title: "text-orange-700 text-xl",
            description: "text-lg",
          },
        }}
      />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
