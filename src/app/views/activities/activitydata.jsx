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
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import days from "dayjs";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import VisibilityIcon from "@mui/icons-material/Visibility";

const ActivitiesData = ({
  handleDeleteActivity,
  setShowAddModal,
  activityList,
  setCurrentId,
  setShowParticipantModal,
  setIsEdit,
  setCurrentData,
  setShowModal,
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

  const onClickEdit = (data) => {
    console.log("[data]: ", data);

    const currentData = {
      description: data[4],
      title: data[1],
      project_id: data[8],
      venue: data[2],
      date: data[3].props.children,
      user_id: data[6],
      type: data[9],
      id: data[0],
    };

    console.log("[currentData]: ", currentData);

    setCurrentData(currentData);
    setShowModal(true);
    setIsEdit(true);
  };

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
        display: false,
      },
    },
    {
      name: "title",
      label: "Activity Title",
      options: {
        filter: true,
      },
    },
    {
      name: "venue",
      label: "Venue",
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
      name: "description",
      label: "Description",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      name: "project_code",
      label: "Project",
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
    {
      name: "project_id",
      options: {
        display: false,
      },
    },
    {
      name: "type",
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
                        <strong>Description: </strong>
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
                          text={<GroupAddIcon />}
                          size="small"
                          disabled={rowData[6] === "1"}
                        />
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() => onClickEdit(rowData)}
                          text={<ModeEditIcon />}
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
    print: false,
  };
  return (
    <div className="App">
      <ThemeProvider theme={getMuiTheme}>
        {/* total amount of the current page: {total} */}
        <MUIDataTable
          title={"Activities Records"}
          options={options}
          columns={columns}
          data={data}
        />
      </ThemeProvider>
    </div>
  );
};

export default ActivitiesData;
