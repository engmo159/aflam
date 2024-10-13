import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart, FaLock } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdReviews } from "react-icons/md";
import { setToken } from "../../redux/slices/tokenSlice";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";

const ProfileMenu = () => {
  const { userData } = useSelector((state) => state.userAuthReducer);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useSelector((state) => state.themeReducer);
  const [loggedOut, setLoggedOut] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Toast notification logic
  const notifySuccess = () => {
    toast.success("You have logged out successfully!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme,
      transition: Bounce,
      onClose: () => {
        navigate("/");

        dispatch(setToken(null));
        closeMenu();
      },
    });
  };

  useEffect(() => {
    if (loggedOut) {
      notifySuccess();
    }
  }, [loggedOut]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto hover:bg-transparent active:bg-transparent focus-visible:bg-transparent focus-visible:border-none">
          <Typography className="hidden lg:block text-black dark:text-white font-bold text-xl">
            {userData?.displayName ? (
              userData?.displayName
            ) : (
              <BeatLoader color="#ff0000" size={8} />
            )}
          </Typography>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform text-red-500 ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList
        className={`p-1 ${
          theme == "dark" && "bg-gray-900"
        } outline-none border-none min-w-72 mt-2.5`}>
        {/* Favorite */}
        <Link to="/favorites">
          <MenuItem
            onClick={closeMenu}
            className={`flex items-center gap-6 border-none ${
              theme == "dark" ? "hover:bg-blue-gray-800" : "hover:bg-red-50 "
            } transition-all`}>
            <FaRegHeart
              className={`${
                theme == "dark" ? "text-white" : "text-black"
              } text-xl`}
            />
            <Typography
              variant="h6"
              className={`${
                theme == "dark" ? "text-white" : "text-black"
              } uppercase`}>
              Favorite
            </Typography>
          </MenuItem>
        </Link>
        {/* Reviews */}
        <Link to="/reviews">
          <MenuItem
            onClick={closeMenu}
            className={`flex items-center gap-6 border-none ${
              theme == "dark" ? "hover:bg-blue-gray-800" : "hover:bg-red-50 "
            } transition-all`}>
            <MdReviews
              className={`${
                theme == "dark" ? "text-white" : "text-black"
              } text-xl`}
            />
            <Typography
              variant="h6"
              className={`${
                theme == "dark" ? "text-white" : "text-black"
              } uppercase`}>
              Reviews
            </Typography>
          </MenuItem>
        </Link>
        {/* Password Update */}
        <Link to="/password-update">
          <MenuItem
            onClick={closeMenu}
            className={`flex items-center gap-6 border-none ${
              theme == "dark" ? "hover:bg-blue-gray-800" : "hover:bg-red-50 "
            } transition-all`}>
            <FaLock
              className={`${
                theme == "dark" ? "text-white" : "text-black"
              } text-xl`}
            />
            <Typography
              variant="h6"
              className={`${
                theme == "dark" ? "text-white" : "text-black"
              } uppercase`}>
              Password Update
            </Typography>
          </MenuItem>
        </Link>
        {/* Logout */}
        <MenuItem
          onClick={() => setLoggedOut(true)}
          className={`flex items-center gap-6 border-none ${
            theme == "dark" ? "hover:bg-blue-gray-800" : "hover:bg-red-50 "
          } transition-all`}>
          <IoIosLogOut
            className={`${
              theme == "dark" ? "text-white" : "text-black"
            } text-xl`}
          />

          <Typography
            variant="h6"
            className={`${
              theme == "dark" ? "text-white" : "text-black"
            } uppercase`}>
            Log Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
