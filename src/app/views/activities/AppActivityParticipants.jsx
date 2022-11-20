import React, { useState, useCallback, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material";

import axios from "../../utils/axios";
import { isEmpty } from "lodash";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxHeight: "80vh",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  overflow: "auto",
};

const ActivityParticipantsModal = ({
  showParticipantModal,
  setShowParticipantModal,
  currentId,
}) => {
  // const [beneficiaryList, setBeneficiaryList] = useState([]);
  const [participantsList, setParticipantsList] = useState([]);

  const fetchParticipantsData = useCallback(async () => {
    const getAllUsersResult = await axios.get(
      `${BASE_URL}/project/getParticipantActivity?id=${currentId}`
    );

    setParticipantsList(getAllUsersResult?.data?.data);
  }, [currentId]);

  useEffect(() => {
    if (!isEmpty(currentId)) {
      fetchParticipantsData();
    }
  }, [currentId, fetchParticipantsData]);

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

  const handleClose = () => {
    setShowParticipantModal((prev) => !prev);
  };

  const columns = [
    {
      name: "participant_activities_id",
      label: "ID",
      options: {
        filter: true,
      },
    },
    {
      name: "first_name",
      label: "Name",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const fname = tableMeta?.rowData[1];
          const mname = tableMeta?.rowData[2];
          const lname = tableMeta?.rowData[3];
          return <>{`${fname} ${mname} ${lname}`}</>;
        },
      },
    },
    {
      name: "middle_name",
      label: "",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      name: "last_name",
      label: "",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      name: "organization",
      label: "Organization",
      options: {
        display: true,
      },
    },
    {
      name: "designation",
      label: "Designation",
      options: {
        display: true,
      },
    },
    {
      name: "age",
      label: "Age",
      options: {
        display: true,
      },
    },
    {
      name: "contact_number",
      label: "Mobile Wallet",
      options: {
        display: true,
      },
    },
    {
      name: "civil_status",
      label: "Civil Status",
      options: {
        display: false,
      },
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        display: false,
      },
    },
    {
      name: "is_deleted",
      label: "Is Deleted",
      options: {
        display: false,
      },
    },
    {
      name: "createdAt",
      label: "Submitted",
      options: {
        display: false,
      },
    },
    {
      name: "updatedAt",
      label: "Approve",
      options: {
        display: false,
      },
    },
  ];

  const options = {
    selectableRows: "none",
    expandableRows: false,
    download: false,
    filter: false,
    search: false,
    print: false,
    viewColumns: false,
  };

  return (
    <Modal
      open={showParticipantModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <ThemeProvider theme={getMuiTheme}>
            <MUIDataTable
              title={"Activity Participants"}
              options={options}
              columns={columns}
              data={participantsList}
            />
          </ThemeProvider>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ActivityParticipantsModal;
