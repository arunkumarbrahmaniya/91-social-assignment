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
  id: 'payload_id' | 'norad_id' | 'cap_serial' | 'reused' | 'customers' | 'nationality' | 'manufacturer'
  | 'payload_type' | 'payload_mass_kg' | 'payload_mass_lbs' | 'orbit' | 'orbit_params' | 'mass_returned_kg'
   | 'mass_returned_lbs' | 'flight_time_sec' | 'cargo_manifest';
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'right';
}

const columns: Column[] = [
    { id: 'payload_id', label: 'Payload ID', minWidth: 100, maxWidth: 200 },
    { id: 'norad_id', label: 'Norad ID', minWidth: 100 },
    { id: 'cap_serial', label: 'Cap Sr', minWidth: 60 },
    { id: 'reused', label: 'Reused', minWidth: 50 },
    {id: 'customers', label: 'Customers', minWidth: 50},
    { id: 'nationality', label: 'Nationality', minWidth: 100 },
    { id: 'manufacturer', label: 'Manufacturer', minWidth: 60 },
    { id: 'payload_type', label: 'Payload Type', minWidth: 110 },
    { id: 'payload_mass_kg', label: 'P.Mass(Kg)', minWidth: 60 },
    { id: 'payload_mass_lbs', label: 'P.Mass(Lbs)', minWidth: 60 },
    { id: 'orbit', label: 'Orbit', minWidth: 30 },
    { id: 'orbit_params', label:'Orbit Param', minWidth: 60},
    { id: 'mass_returned_kg', label: 'M.Returned(Kg)', minWidth: 60 },
    { id: 'mass_returned_lbs', label: 'M.Returned(Lbs)', minWidth: 60 },
    { id: 'flight_time_sec', label: 'Flt.Time(sec)', minWidth: 60 },
    { id: 'cargo_manifest', label: 'Cargo Manifest', minWidth: 130 },
];

interface orbitParams {
    id: 'reference_system' | 'regime' | 'longitude' |
    'semi_major_axis_km' | 'eccentricity' | 'periapsis_km' | 'apoapsis_km'
    | 'inclination_deg' | 'period_min' | 'lifespan_years' | 'epoch' |
    'mean_motion' | 'raan'| 'arg_of_pericenter' | 'mean_anomaly';
    label: string;
    minWidth?: number;
    align?: 'right';
  }
  const orbitParamColumns: orbitParams[] = [
    { id: 'reference_system', label: 'Ref.System', minWidth: 100 },
    { id: 'regime', label: 'Regime', minWidth: 100 },
    { id: 'longitude', label: 'Longitude', minWidth: 100 },
    { id: 'semi_major_axis_km', label: 'MajorAxis', minWidth: 100 },
    { id: 'eccentricity', label: 'Eccentricity', minWidth: 100 },
    { id: 'periapsis_km', label: 'Periapsis', minWidth: 100 },
    { id: 'apoapsis_km', label: 'Apoapsis', minWidth: 100 },
    { id: 'inclination_deg', label: 'InclinationDeg', minWidth: 100 },
    { id: 'period_min', label: 'PeriodMin', minWidth: 100 },
    { id: 'lifespan_years', label: 'Lifespan Year', minWidth: 100 },
    { id: 'epoch', label: 'Epoch', minWidth: 100 },
    { id: 'mean_motion', label: 'Mean Motion', minWidth: 100 },
    { id: 'raan', label: 'Raan', minWidth: 100 },
    { id: 'arg_of_pericenter', label: 'Arg of Pericenter', minWidth: 100 },
    { id: 'mean_anomaly', label: 'Mean Anomaly', minWidth: 100 },
];
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTableAddress() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  React.useEffect(() => {
    fetch('https://api.spacexdata.com/v3/payloads').then(results => results.json()).then((data) => {
    setData(data);
    console.log('datapay', data);
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
                      <TableCell key={column.id} align={column.align} style={{maxWidth:150, overflowY:'scroll'}}>
                        {typeof(value) === 'string' ? value :
                        typeof(value) === 'boolean' ? JSON.stringify(value).toUpperCase()
                        : Array.isArray(value) ? <div>{value+','}</div> : typeof(value) === 'number'
                        ? value : !value ? '---' : orbitParamColumns.map((data) => {
                            return (<span key={data.id}>{data.label}:{value[data.id]}</span>)
                            })}
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
