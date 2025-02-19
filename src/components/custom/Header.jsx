import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for mobile menu
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

function Header() {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

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
        setOpenDialog(false);
        window.location.reload();
      });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Animation variants for the dropping letters
  const letterVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 100 },
    }),
  };

  return (
    <div className="p-4 shadow-sm flex justify-between items-center bg-[#fffef5]">
      {/* Left Side - Logo & Name */}
      <div className="flex items-center gap-2">
        <img
          src="/travel-logo-1.png"
          alt="Travel Icon"
          className="h-12 w-12 -mt-3 sm:h-14 sm:w-14"
        />

        {/* Animated text with dropping letters */}
        <motion.h1
          className="font-awesome mt-4 text-3xl sm:text-6xl text-[#2c4d67] cursor-pointer flex"
          initial="hidden"
          animate="visible"
        >
          {"GoSmart".split("").map((letter, i) => (
            <motion.span key={i} custom={i} variants={letterVariants}>
              {letter}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-5">
        {user ? (
          <>
            <a href="/create-trip">
              <Button
                variant="outline"
                className="rounded-full h-10 sm:h-12 w-32 sm:w-34 text-sm sm:text-lg bg-[#fffef5]"
              >
                + Create Trip
              </Button>
            </a>
            <a href="/My-trips">
              <Button
                variant="outline"
                className="rounded-full h-10 sm:h-12 w-24 sm:w-28 text-sm sm:text-lg bg-[#fffef5]"
              >
                My Trip
              </Button>
            </a>
            <Popover>
              <PopoverTrigger className="flex items-center">
                <img
                  src={user.picture}
                  alt="User Profile"
                  className="h-10 sm:h-[55px] w-10 sm:w-[55px] rounded-full border-2 border-blue-100 sm:border-4"
                  onError={(e) => (e.target.src = "/user.png")}
                />
                <h2 className="hidden sm:block font-passion text-blue-600 ml-1">
                  Hi,{" "}
                  <span className="text-black text-lg">{user.given_name}</span>
                </h2>
              </PopoverTrigger>
              <PopoverContent className="bg-transparent w-40 border-red-500 hover:bg-red-700 hover:border-red-950">
                <h2
                  className="cursor-pointer font-bold text-lg text-red-700 text-center hover:text-white"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button
            className="rounded-full h-10 sm:h-12 w-24 sm:w-28 text-sm sm:text-lg"
            onClick={() => setOpenDialog(true)}
          >
            Sign In
          </Button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden flex items-center"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <FiX className="text-3xl" />
        ) : (
          <FiMenu className="text-3xl" />
        )}
      </button>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#fffef5] shadow-lg p-5 flex flex-col items-center gap-3 md:hidden z-50">
          {user ? (
            <>
              <a href="/create-trip">
                <Button
                  variant="outline"
                  className="rounded-full h-10 w-28 text-lg"
                >
                  + Create Trip
                </Button>
              </a>
              <a href="/My-trips">
                <Button
                  variant="outline"
                  className="rounded-full h-10 w-28 text-lg"
                >
                  My Trip
                </Button>
              </a>
              <img
                src={user.picture}
                alt="User Profile"
                className="h-12 w-12 rounded-full border-2"
                onError={(e) => (e.target.src = "/user.png")}
              />
              <h2 className="text-lg text-blue-600">
                Hi, <span className="text-black">{user.given_name}</span>
              </h2>
              <button
                className="text-lg text-red-700 font-bold border border-red-500 px-4 py-2 rounded-md hover:bg-red-700 hover:text-white"
                onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Button
              className="rounded-full h-10 w-28 text-lg"
              onClick={() => setOpenDialog(true)}
            >
              Sign In
            </Button>
          )}
        </div>
      )}

      {/* Dialog for Sign-In */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/travel-logo-1.png" alt="Logo" />
              <h2 className="font-bold text-xl mt-7">Sign In With Google</h2>
              <p className="text-lg">
                Sign in to the App with Google authentication securely
              </p>
              <Button onClick={login} className="w-full mt-5 text-xl">
                <FcGoogle className="h-10 w-10" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
