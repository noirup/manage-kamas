import React from 'react';
import './DailyKamasTable.css'
import { Button, Table, Form } from "react-bootstrap";
import * as moment from 'moment';
import ReactPaginate from 'react-paginate';

function DailyKamasTable({
    dailyKamas,
    selectedRows,
    setSelectedRows,
    onDeleteSelectionEvent,
    handlePageClick,
    currentCols,
    currentPage,
    nbrOfColsPerPage
}) {

  return (
    <div className="daily-kamas-table-div">
      <Button onClick={onDeleteSelectionEvent} style={{ height: 35, margin:5 }} variant="light" type="submit">Delete Selection</Button>
      <div className="daily-kamas-sub-div">
        <Table className="daily-kamas-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentCols.map(dk => (
              <tr style={{ height: 'fit-content'}} key={"tr" + dk.id}>
                <td key={"select"+dk.id}>
                  <Form.Check onChange={
                    async() => {
                      let newSelection = [];
                      newSelection = selectedRows;
                      if (newSelection.includes(dk)) {
                        for( var i = 0; i < newSelection.length; i++){ 
                            if ( newSelection[i].id === dk.id) { 
                                newSelection.splice(i, 1); 
                            }
                        }
                      } else {
                        newSelection.push(dk);
                      }
                        await setSelectedRows(newSelection);
                      }
                    }
                    key={"checkbox"+dk.id} type="checkbox" />
                </td>
                <td key={"amount"+dk.id}>{dk.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                <td key={"entryDate"+dk.id}>{moment(dk.entryDate).format('DD/MM/YYYY')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ReactPaginate
                    pageCount={Math.floor(dailyKamas.length/nbrOfColsPerPage)+(dailyKamas.length%nbrOfColsPerPage===0 ? 0 : 1)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageClick}
                    forcePage={currentPage}
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
      </div>
    </div>
  );
}

export default DailyKamasTable;