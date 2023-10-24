import React, { useState } from "react"
import { Link } from "react-router-dom"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import DeleteIcon from "@mui/icons-material/Delete"

const rows = [
  {
    id: 1143155,
    name: "okan",
    surname: "demirbilek",
    age: "25",
    date: "1 March",
    img: "https://www.w3schools.com/howto/img_avatar.png",
    status: "aproved",
  },
  {
    id: 1143156,
    name: "okan",
    surname: "demirbilek",
    age: "25",
    date: "1 March",
    img: "https://www.w3schools.com/howto/img_avatar.png",
    status: "pending",
  },
  {
    id: 1143157,
    name: "okan",
    surname: "demirbilek",
    age: "25",
    date: "1 March",
    img: "https://www.w3schools.com/howto/img_avatar.png",
    status: "aproved",
  },
  {
    id: 1143158,
    name: "okan",
    surname: "demirbilek",
    age: "25",
    date: "1 March",
    img: "https://www.w3schools.com/howto/img_avatar.png",
    status: "aproved",
  },
  {
    id: 1143159,
    name: "okan",
    surname: "demirbilek",
    age: "25",
    date: "1 March",
    img: "https://www.w3schools.com/howto/img_avatar.png",
    status: "pending",
  },
  {
    id: 2143159,
    name: "okan",
    surname: "demirbilek",
    age: "25",
    date: "1 March",
    img: "https://www.w3schools.com/howto/img_avatar.png",
    status: "pending",
  },
  {
    id: 3143159,
    name: "okan",
    surname: "demirbilek",
    age: "25",
    date: "1 March",
    img: "https://www.w3schools.com/howto/img_avatar.png",
    status: "pending",
  },
  {
    id: 4143159,
    name: "okan",
    surname: "demirbilek",
    age: "25",
    date: "1 March",
    img: "https://www.w3schools.com/howto/img_avatar.png",
    status: "pending",
  },
  {
    id: 5143159,
    name: "okan",
    surname: "demirbilek",
    age: "25",
    date: "1 March",
    img: "https://www.w3schools.com/howto/img_avatar.png",
    status: "pending",
  },
]

const List = () => {
  const [data, setData] = useState(rows)

  const handleDelete = (id) => {
    console.log("deleted")
    setData(data.filter((item) => item.id !== id))
  }

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
              <TableCell className="tableCell">Tracking ID</TableCell>
              <TableCell className="tableCell">Image</TableCell>
              <TableCell className="tableCell">Name</TableCell>
              <TableCell className="tableCell">Surname</TableCell>
              <TableCell className="tableCell">Age</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Status</TableCell>
              <TableCell className="tableCell">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper display-f align-center">
                    <img src={row.img} alt="" className="avatarImage" />
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.name}</TableCell>
                <TableCell className="tableCell">{row.surname}</TableCell>
                <TableCell className="tableCell">{row.age}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
                <TableCell className="tableCell">
                  <Link to={`/dashboard/${row.id}`}>
                    <span className="view">View</span>
                  </Link>
                  <span className="delete" onClick={() => handleDelete(row.id)}>
                    Delete
                  </span>
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
