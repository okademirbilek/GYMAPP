import * as React from "react";
import { motion } from "framer-motion";
// import { MenuItem } from "./MenuItem";
import { useAuth } from "../../context/AuthContext"
//icons
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"

import { Link } from "react-router-dom";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const variantsLi = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

export const Navigation = ({isOpen,toggleOpen}) => {
  const { logout } = useAuth()

  function handleClick (){
    toggleOpen(false)
    logout()
  }
  
  return  (
    <motion.ul style={{display: !isOpen && "none"}} variants={variants}>
      <motion.li  variants={variantsLi}  whileTap={{ scale: 0.95 }}>
        <Link
          to="/profile"
        >
          <PersonOutlineOutlinedIcon />
          <span>Profile</span>
        </Link>
      </motion.li>

      <motion.li  onClick={() => handleClick()} variants={variantsLi}  whileTap={{ scale: 0.95 }}>
          <ExitToAppOutlinedIcon />
          <p>Log Out</p> 
      </motion.li>

      <motion.li variants={variantsLi}  whileTap={{ scale: 0.95 }} className="colorOption">
          <DarkModeOutlinedIcon />
          <p>Dark</p>
      </motion.li>


      <motion.li variants={variantsLi}  whileTap={{ scale: 0.95 }} className="colorOption">
          <LightModeOutlinedIcon />
          <p>Light</p>
      </motion.li>
    </motion.ul>
  );
}


