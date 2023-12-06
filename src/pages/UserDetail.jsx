import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAdminAuth } from "../context/AdminContext";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import { useTheme } from "../context/ThemeContext";

const UserDetail = () => {
  const params = useParams();
  const { userData } = useAdminAuth();
  const { theme } = useTheme();

  //filterin correct data
  const data = userData.filter((user) => user.id === params.id);

  //style for active page
  const activeStyle = {
    backgroundColor: theme === "light" ? "#E5E5E5" : "#373a40",
  };

  return (
    <div className="user-detail-container">
      <ul>
        <Link to="/dashboard" className="bg-primary display-f">
          Back to Users page
          <ReplyIcon className="ml-1" />
        </Link>
        {/* end for higlight problem */}
        <NavLink
          to={`/dashboard/${params.id}`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
          end
        >
          Profile
        </NavLink>
        <NavLink
          to={`/dashboard/${params.id}/adminMeasurement`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Measurement
        </NavLink>
        <NavLink
          to={`/dashboard/${params.id}/adminPayment`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Payment
        </NavLink>
        <NavLink
          to={`/dashboard/${params.id}/adminMeal`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Meal
        </NavLink>
        <NavLink
          to={`/dashboard/${params.id}/adminMemberTracking`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Member Tracking
        </NavLink>
        <NavLink
          to={`/dashboard/${params.id}/adminImages`}
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Images
        </NavLink>
      </ul>

      <Outlet context={{ data, params }} />
    </div>
  );
};

export default UserDetail;
