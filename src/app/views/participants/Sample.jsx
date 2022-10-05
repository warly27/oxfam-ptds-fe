import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import { TableCell, TableRow } from '@material-ui/core';

// const styles = (theme = {
//   root: {}
// });

const columns = [
  {
    name: 'userId',
    label: 'User Id',
    options: {
      filter: true,
    },
  },
  {
    name: 'title',
    label: 'Title',
    options: {
      filter: true,
    },
  },
  {
    name: 'body',
    label: 'Body',
    options: {
      filter: true,
    },
  },
];

const Sample = () => {
  const [data, setData] = useState();
  const [comments, setComments] = useState();
  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const getDatas = fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // this.setState({ data: data });
        setData(data);
      })
      .catch((err) => console.log('error:', err));
  }, [setData, setComments]);

  const handleClick = (value) => {
    console.log('value', value.id);
    const { id } = value;
    const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
    const getComments = fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // this.setState({ comments: data });
        setData(data);
        setComments(comments);
      })
      .catch((err) => console.log('error:', err));
  };

  const options = {
    filterType: 'textField',
    fixedHeader: true,
    sort: true,
    search: true,
    selectableRows: 'multiple',
    responsive: 'scrollMaxHeight',
    rowsPerPage: 15,
    rowHove: true,
    selectableRowsHeader: false,
    expandableRows: true,
    expandableRowsOnClick: true,
    renderExpandableRow: (rowData, rowMeta) => {
      return (
        <TableRow>
          <TableCell colSpan={6}>{comments && JSON.stringify(comments)}</TableCell>
        </TableRow>
      );
    },
    onRowsClick: (rowData, rowMeta) => {
      console.log('rowData', rowData);
      handleClick(data[rowMeta.dataIndex]);
    },
    onRowsExpand: (curExpanded, allExpanded) => {
      console.log('rowExpand', curExpanded, allExpanded[0]);
      handleClick(data[allExpanded[0].dataIndex]);
    },
  };

  return (
    <>
      <MUIDataTable title={'Sample'} data={data} columns={columns} options={options} />
    </>
  );
};

export default Sample;
