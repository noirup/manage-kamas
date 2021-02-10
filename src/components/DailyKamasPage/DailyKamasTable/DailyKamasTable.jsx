import * as React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Button } from "react-bootstrap";
import * as moment from 'moment';

const columns = [
  { field: 'entryDate', valueFormatter: ({value}) => {moment(value).format('D-MM-YYYY')}, headerName: 'Date', type:'date', width: 150 },
  { field: 'amount', 
    valueFormatter: ({value}) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "), 
    headerName: 'Amount', type: 'number', width: 150 },
];

function DailyKamasTable({
    dailyKamas,
    setSelectedRows,
    onDeleteSelectionEvent
}) {

  return (
    <div style={{ height: 495, width: 400, backgroundColor: 'rgb(114, 165, 167)', borderRadius: '2%', boxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important' }}>
      <Button onClick={onDeleteSelectionEvent} style={{ height: 35, margin:5 }} variant="light" type="submit">Delete Selection</Button>
      <div style={{ height: 450, width: 400, backgroundColor: 'rgb(114, 165, 167)' }}>
        <DataGrid
          showToolbar
          localeText={{
              toolbarDensity: 'Size',
              toolbarDensityLabel: 'Size',
              toolbarDensityCompact: 'Small',
              toolbarDensityStandard: 'Medium',
              toolbarDensityComfortable: 'Large',
          }}
          components={{
              Toolbar: GridToolbar,
          }} 
          rows={dailyKamas} 
          columns={columns} 
          pageSize={5}
          checkboxSelection
          onSelectionChange={(newSelection) => {
            setSelectedRows(newSelection);
          }} ></DataGrid>
      </div>
    </div>
  );
}

export default DailyKamasTable;