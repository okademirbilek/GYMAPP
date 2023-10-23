import React from "react"
import SearchIcon from "@mui/icons-material/Search"
import LanguageIcon from "@mui/icons-material/Language"
import MenuIcon from "@mui/icons-material/Menu"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"

const navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper display-f justify-space-between align-center">
        <div className="search display-f justify-center gp-1">
          <input type="text" placeholder="Search" />
          <SearchIcon />
        </div>
        <div className="items display-f gp-2">
          <div className="item">
            <LanguageIcon />
            En
          </div>
          <div className="item">
            <ExitToAppIcon />
            Sign In
          </div>
          <div className="item">
            <MenuIcon />
          </div>
          <div className="item">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Avatar"
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default navbar
