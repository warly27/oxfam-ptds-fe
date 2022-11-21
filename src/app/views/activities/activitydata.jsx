import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import MUIDataTable from "mui-datatables";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Paper from "@material-ui/core/Paper";
import Button from "app/components/controls/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import days from "dayjs";
import AddIcon from "@mui/icons-material/Add";

import VisibilityIcon from "@mui/icons-material/Visibility";

const ActivitiesData = ({
  handleDeleteActivity,
  setShowAddModal,
  activityList,
  setCurrentId,
  setShowParticipantModal,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(activityList);
  }, [activityList]);

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              backgroundColor: "#e9ffdb",
            },
          },
        },
      },
    });

  const handleClick = (value) => {
    setShowAddModal(true);
    setCurrentId(value);
  };

  const onClickDelete = (id) => {
    handleDeleteActivity({ id });
  };

  // const onClickEdit = (data) => {
  //   console.log("[data]: ", data);

  //   const currentData = {
  //     email: data[3],
  //     companyWebsite: data[5],
  //     phone: data[6],
  //     partnerCode: data[2],
  //     company: data[1],
  //     companyAddress: data[4],
  //     id: data[0],
  //   };

  //   setCurrentData(currentData);
  //   setShowModal(true);
  // };

  const onClickView = (id) => {
    setCurrentId(id);
    setShowParticipantModal(true);
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        customBodyRender: (value, _meta, _uValue) => {
          return <>{days(value).format("MM/DD/YYYY")}</>;
        },
      },
    },
    {
      name: "venue",
      options: {
        display: false,
      },
    },
    {
      name: "creator_id",
      options: {
        display: false,
      },
    },
    {
      name: "creator_role",
      options: {
        display: false,
      },
    },
  ];

  const options = {
    filter: true,
    selectableRows: "none",
    // responsive: 'scrollMaxHeight',
    expandableRows: true,
    onRowsDelete: (rowsDeleted, dataRows) => {
      console.log(dataRows[0]);
      console.log(rowsDeleted.data);
    },
    renderExpandableRow: (rowData, rowMeta) => {
      return (
        <>
          <tr>
            <td colSpan={6}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                        <strong>Venue: </strong>
                        {rowData[4]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Created By: </strong>
                        {rowData[5]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Creator Role: </strong> {rowData[6]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() => handleClick(rowData[0])}
                          text={<AddIcon />}
                          size="small"
                          disabled={rowData[6] === "1"}
                        />
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() => onClickView(rowData[0])}
                          text={<VisibilityIcon />}
                          size="small"
                          disabled={rowData[6] === "1"}
                        />
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() => onClickDelete(rowData[0])}
                          text={<DeleteOutlineIcon />}
                          size="small"
                          disabled={rowData[6] === "1"}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </td>
          </tr>
        </>
      );
    },
    // onRowsClick: (rowData, rowMeta) => {
    //   console.log("rowData", rowData);
    //   handleClick(data[rowMeta?.dataIndex]);
    // },
    onRowsExpand: (curExpanded, allExpanded) => {
      console.log("[curExpanded]", curExpanded);
      console.log("[allExpanded]", allExpanded);
    },
  };
  return (
    <div className="App">
      <ThemeProvider theme={getMuiTheme}>
        {/* total amount of the current page: {total} */}
        <MUIDataTable
          title={"Activities"}
          options={options}
          columns={columns}
          data={data}
        />
      </ThemeProvider>
    </div>
  );
};

export default ActivitiesData;
