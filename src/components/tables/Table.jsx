import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { convertTime } from "../../utils/utils";

const List = ({ data }) => {
  return (
    <>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <Table stickyHeader className={`table`} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Image</TableCell>
                <TableCell className="tableCell">Actions</TableCell>
                <TableCell className="tableCell">Name</TableCell>
                <TableCell className="tableCell">Surname</TableCell>
                <TableCell className="tableCell">Time</TableCell>
                <TableCell className="tableCell">Tracking ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.uid}>
                  <TableCell className="tableCell">
                    <div className="cellWrapper display-f align-center">
                      <img
                        src={row.profileInfo.picture}
                        alt=""
                        className="avatarImage"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="tableCell text">
                    <Link to={`/dashboard/${row.uid}`}>
                      <span className="view">View</span>
                    </Link>
                  </TableCell>

                  <TableCell className="tableCell text">
                    {row.profileInfo.name}
                  </TableCell>
                  <TableCell className="tableCell text">
                    {row.profileInfo.surname}
                  </TableCell>
                  <TableCell className="tableCell text">
                    {convertTime(row.profileInfo.timeStamp)}
                  </TableCell>
                  <TableCell className="tableCell text">{row.uid}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default List;
