import * as React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import * as moment from 'moment';

const columns = [
  { field: 'entryDate', valueFormatter: ({value}) => moment(value, 'DD-MM-YYYY'), headerName: 'Date', type:'date', width: 150 },
  { field: 'amount', 
    valueFormatter: ({value}) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "), 
    headerName: 'Amount', type: 'number', width: 150 },
];

function DailyKamasTable({
    dailyKamas
}) {
  return (
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
        pageSize={5} ></DataGrid>
    </div>
  );
}

export default DailyKamasTable;