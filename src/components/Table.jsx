import React, { useState } from "react"
import { Link } from "react-router-dom"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
// import DeleteIcon from "@mui/icons-material/Delete"

const List = ({ data }) => {
  // console.log(data)
  // const [data, setData] = useState(data)

  // const handleDelete = (id) => {
  //   console.log("deleted")
  //   setData(data.filter((item) => item.id !== id))
  // }

  //   const actionColumn = [
  //     {
  //       field: "action",
  //       headerName: "Action",
  //       width: 200,
  //       renderCell: (params) => {
  //         return (
  //           <div className="cellAction">
  //             <Link
  //               to={`/dashboard/${params.row.id}`}
  //               style={{ textDecoration: "none" }}
  //             >
  //               <div className="viewButton">View</div>
  //             </Link>
  //             <div
  //               className="deleteButton"
  //               onClick={() => handleDelete(params.row.id)}
  //             >
  //               Delete
  //             </div>
  //           </div>
  //         )
  //       },
  //     },
  //   ]

  function convertTime(timestamp) {
    const date = new Date(timestamp.seconds * 1000).toDateString()
    // console.log(date)
    return date
  }
  return (
    <>
      <TableContainer
        sx={{ maxHeight: 624, minWidth: 700 }}
        component={Paper}
        className="table"
      >
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Image</TableCell>
              <TableCell className="tableCell">Tracking ID</TableCell>
              <TableCell className="tableCell">Name</TableCell>
              <TableCell className="tableCell">Surname</TableCell>
              <TableCell className="tableCell">Time</TableCell>
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
                <TableCell className="tableCell">{row.uid}</TableCell>
                <TableCell className="tableCell">
                  {row.profileInfo.name}
                </TableCell>
                <TableCell className="tableCell">
                  {row.profileInfo.surname}
                </TableCell>
                <TableCell className="tableCell">
                  {convertTime(row.profileInfo.timeStamp)}
                </TableCell>
                <TableCell className="tableCell">
                  <Link to={`/dashboard/${row.uid}`}>
                    <span className="view">View</span>
                  </Link>
                  <span className="delete">Delete</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div className="datatable">
        <div style={{ height: 400, width: "100%" }}>
          <div className="datatableTitle">
            Add New User
            <Link to="/users/new" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            rows={userRows}
            columns={userColumns.concat(actionColumn)}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div> */}
    </>
  )
}

export default List
