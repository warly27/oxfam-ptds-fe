import React, { useState, useEffect } from "react";

import MUIDataTable from "mui-datatables";
import {
  ThemeProvider,
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Button from "app/components/controls/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import dayjs from "dayjs";

import AddIcon from "@mui/icons-material/Add";

const ProjectssCodeData = ({
  projectsCodeData,
  handleConfirmUser,
  handleDeleteProjectCode,
  setCurrentId,
  setShowAddModal,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(projectsCodeData);
  }, [projectsCodeData]);

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
    console.log("value", value?.id);

    setCurrentId(value);
    setShowAddModal(true);
  };

  const onClickDeleteUser = (id, code) => {
    handleDeleteProjectCode(id, code);
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
      name: "code",
      label: "Project Code",
      options: {
        filter: true,
      },
    },
    {
      name: "name",
      label: "Project  Name",
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
        display: false,
      },
    },
    {
      name: "start_date",
      label: "Start date",
      options: {
        display: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <>{dayjs(value).format("MM/DD/YYYY")}</>;
        },
      },
    },
    {
      name: "end_date",
      label: "End date",
      options: {
        display: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <>{dayjs(value).format("MM/DD/YYYY")}</>;
        },
      },
    },
    {
      name: "type",
      label: "Type",
      options: {
        filter: true,
        display: true,
      },
    },
    {
      name: "portfoliio",
      label: "Portfoliio",
      options: {
        display: false,
      },
    },
    {
      name: "fund_source",
      label: "Fund Source",
      options: {
        display: false,
      },
    },
    {
      name: "budget",
      label: "Budget",
      options: {
        display: false,
      },
    },
    {
      name: "creator_id",
      label: "Created By",
      options: {
        display: false,
      },
    },
    {
      name: "creator_role",
      label: "Creator Role",
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
            <td colSpan={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                        <strong>Portfolio:</strong> {""}
                        {rowData[8]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Fund source:</strong> {""}
                        {rowData[9]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Budget:</strong>

                        {rowData[10]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Created By:</strong>

                        {rowData[11]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Creator Role:</strong> {rowData[12]}
                      </TableCell>

                      {/* <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() => handleClick(rowData[0])}
                          text={<AddIcon />}
                          size="small"
                          disabled={rowData[5] === "1"}
                        />
                      </TableCell> */}

                      <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() =>
                            onClickDeleteUser(rowData[0], rowData[2])
                          }
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
    download: false,
  };
  return (
    <div className="App">
      <ThemeProvider theme={getMuiTheme}>
        {/* total amount of the current page: {total} */}
        <MUIDataTable
          title={"Projects Records"}
          options={options}
          columns={columns}
          data={data}
        />
      </ThemeProvider>
    </div>
  );
};

export default ProjectssCodeData;
