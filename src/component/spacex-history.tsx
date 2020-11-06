import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

interface Column {
  id: 'id' | 'title' | 'event_date_utc' | 'event_date_unix' | 'flight_number' | 'details' | 'links';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: Column[] = [
  { id: 'id', label: 'ID', minWidth: 60 },
  { id: 'title', label: 'Title', minWidth: 100 },
  {
    id: 'event_date_utc',
    label: 'Event Date (UTC)',
    minWidth: 170,
  },
  {
    id: 'event_date_unix',
    label: 'Event Date(Unix)',
    minWidth: 170,
  },
  {
    id: 'flight_number',
    label: 'Flight Number',
    minWidth: 60,
  },
  {
    id: 'details',
    label: 'Details',
    minWidth: 170,
  },
  {
    id: 'links',
    label: 'Links',
    minWidth: 170,
  },
];

const linkdata: Links[] = [
    {id:'article', label:'Article'},
    {id:'reddit', label:'Reddit'},
    {id:'wikipedia', label:'Wikipedia'},

];

interface Links {
    id: 'article' | 'reddit' | 'wikipedia' 
    label: string;
    minWidth?: number;
    align?: 'right';
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  React.useEffect(() => {
    fetch('https://api.spacexdata.com/v3/history').then(results => results.json()).then((data) => {
    setData(data);
    console.log('data', data);
    });
}, []);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value === null ? '---' : typeof(value) === 'object' ? linkdata.map((data) => {
                            const nextVal = value[data.id];
                        return <span key={data.id}>{data.label}:{(nextVal === null) ? '---' : nextVal}<br/></span>
                        }) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
