import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCoPresent, MdVerifiedUser } from "react-icons/md";
import { FaUsersViewfinder } from "react-icons/fa6";
import {
  FaBell,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import {
  BiSolidDashboard,
  BiSolidHome,
  BiSolidLogInCircle,
  BiSolidPhoneCall,
} from "react-icons/bi";
import { TbProgressBolt } from "react-icons/tb";
import { MdAssignmentAdd } from "react-icons/md";

function Header() {
  const { user, logout, getAvatar } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/");
    toast.success("Logged out", {
      autoClose: 1000,
      pauseOnHover: false,
      hideProgressBar: true,
      theme: "dark",
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleNotificationMenu = () => {
    setIsNotificationOpen((prev) => !prev);
    setIsProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
    setIsNotificationOpen(false);
  };

  const menuItems = [];

  if (user) {
    if (user.role === "student") {
      menuItems.push({
        label: "Dashboard",
        path: "/student/dashboard",
        icon: <BiSolidDashboard />,
      });
      menuItems.push({
        label: "Apply Leave",
        path: "/student/apply-leave",
        icon: <BsFillSendArrowUpFill />,
      });
      menuItems.push({
        label: "Track Leave",
        path: "/student/track-leave",
        icon: <TbProgressBolt />,
      });
    } else if (user.role === "warden") {
      menuItems.push({
        label: "Dashboard",
        path: "/warden/dashboard",
        icon: <BiSolidDashboard />,
      });
      menuItems.push({
        label: "View Leave Requests",
        path: "/warden/view-leave",
        icon: <FaUsersViewfinder />,
      });
      menuItems.push({
        label: "View Attendance",
        path: "/warden/view-attendance",
        icon: <MdCoPresent/> ,
      });
    } else if (user.role === "class_coordinator") {
      menuItems.push({
        label: "Dashboard",
        path: "/coordinator/dashboard",
        icon: <BiSolidDashboard />,
      });
      menuItems.push({
        label: "View Leave Requests",
        path: "/coordinator/view-leave",
        icon: <FaUsersViewfinder />,
      });
      menuItems.push({
        label: "View Attendance",
        path: "/coordinator/view-attendance",
        icon: <MdCoPresent/> ,
      });
    } else if (user.role === "principal") {
      menuItems.push({
        label: "Dashboard",
        path: "/principal/dashboard",
        icon: <BiSolidDashboard />,
      });
      menuItems.push({
        label: "View Leave Requests",
        path: "/principal/view-leave",
        icon: <FaUsersViewfinder />,
      });
      menuItems.push({
        label: "View Attendance",
        path: "/principal/view-attendance",
        icon: <MdCoPresent/> ,
      });
      menuItems.push({
        label: "User Approval",
        path: "/principal/approval",
        icon: <MdVerifiedUser/>,
      });
    }
  } else {
    menuItems.push({ label: "Home", path: "/", icon: <BiSolidHome /> });
    menuItems.push({ label: "About", path: "/about", icon: <FaInfoCircle /> });
    menuItems.push({
      label: "Contact Us",
      path: "/contact",
      icon: <BiSolidPhoneCall />,
    });
  }

  return (
    <header className="bg-black border-b border-gray-900 text-white py-6 fixed top-0 left-0 right-0 px-6 flex items-center justify-between z-20 shadow-lg">
      <GiHamburgerMenu
        className="block text-xl md:hidden cursor-pointer"
        onClick={toggleMobileMenu}
      />
      <Link to="#" className="text-2xl font-bold">
        <img src="/logo.svg" alt="Logo" className="max-h-5 md:max-h-7" />
      </Link>
      <nav className="hidden md:flex space-x-8 text-base font-semibold">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`hover:text-gray-300 transition-colors duration-200 flex gap-2 items-center ${
              location.pathname === item.path ? "text-blue-400" : ""
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      {user ? (
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-800 p-1"
              onClick={toggleNotificationMenu}
            >
              <FaBell className="text-xl cursor-pointer text-white" />
            </button>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-gray-200 rounded-lg shadow-lg">
                <ul>
                  <li className="p-2 border-b border-gray-700">
                    Notification 1
                  </li>
                  <li className="p-2 border-b border-gray-700">
                    Notification 2
                  </li>
                  <li className="p-2">Notification 3</li>
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <div className="w-8 h-8 border border-gray-600 rounded-full">
              <img
                src={getAvatar(user)}
                alt="User Avatar"
                className="w-full h-full rounded-full border object-cover object-top cursor-pointer"
                onClick={toggleProfileMenu}
              />
            </div>
            {isProfileMenuOpen && (
              <div className="absolute right-0 p-2 mt-2 w-48 bg-gray-800 text-gray-200 rounded-lg shadow-lg">
                <div className="p-2 border-b border-gray-700">
                  <p className="font-bold">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <ul>
                  <li className="p-2 hover:bg-gray-700 transition-all rounded-md mt-2 duration-200">
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center"
                    >
                      <FaUserCircle className="mr-2" />
                      Profile
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-gray-700 transition-all rounded-md duration-200">
                    <Link
                      to="/settings"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center"
                    >
                      <FaCog className="mr-2" />
                      Settings
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-gray-700 transition-all rounded-md duration-200">
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <nav className="flex space-x-8 text-base font-semibold">
          <Link
            to="/auth/login"
            className={`hover:text-gray-300 transition-colors duration-200 flex items-center gap-1 ${
              location.pathname === "/auth/login" ? "text-blue-400" : ""
            }`}
          >
            <BiSolidLogInCircle />
            Login
          </Link>
          <Link
            to="/auth/register"
            className={`hover:text-gray-300 transition-colors duration-200 flex items-center gap-1 ${
              location.pathname === "/auth/register" ? "text-blue-400" : ""
            }`}
          >
            <MdAssignmentAdd />
            Register
          </Link>
        </nav>
      )}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-10 transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileMenu}
      ></div>
      <nav
        className={`fixed top-0 left-0 w-64 h-full bg-gray-900 z-20 p-6 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <ul className="space-y-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`block text-gray-400 hover:text-white transition-colors duration-200 ${
                  location.pathname === item.path ? "text-blue-400" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
