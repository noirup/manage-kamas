import React, {useEffect, useState, useContext} from 'react'
import { AuthenticationContext } from '../../contexts/Authentication/Authentication';
import DailyKamasForm from './DailyKamasForm/DailyKamasForm'; 
import { Alert } from "react-bootstrap";
import DailyKamasTable from './DailyKamasTable/DailyKamasTable'; 
import DailyKamasChart from './DailyKamasChart/DailyKamasChart';

function DailyKamasContainer({
    dungeon
}) {

    const context = useContext(AuthenticationContext);
    const [dailyKamas, setDailyKamas] = useState([]);
    const [validated, setValidated] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [amount, setAmount] = useState("");
    const [text, setText] = useState("");
    const [isDailyAmount, setDailyAmount] = useState(false);
    const [currentTotal, setCurrentTotal] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentCols, setCurrentCols] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const NUMBER_OF_COLS_PER_PAGE = 5;

    useEffect(() => {
        if (dungeon.dailyKamas !== undefined) {
            let totalDk = 0;
            dungeon.dailyKamas.forEach(dk => {
                totalDk += dk.amount;
            });
            setCurrentTotal(totalDk);
            setDailyKamas(dungeon.dailyKamas.sort((a, b) => {
                let aDate = Date(a.entryDate);
                let bDate = Date(b.entryDate);
                return aDate === bDate ? b.id - a.id : bDate - aDate;
            }));
        }
        setCurrentPage(0);
        let newCurrentCols = [];
        for (let i = 0; i < dailyKamas.length && i < ((currentPage+1)*NUMBER_OF_COLS_PER_PAGE); i++) {
          newCurrentCols.push(dailyKamas[i]);
        }
        setCurrentCols(newCurrentCols);
    }, [dungeon, dailyKamas]);

    const submitDailyKamas = async () => {
        let newDungeon = dungeon;
        newDungeon.dailyKamas = null;
        return await fetch("/api/daily_kamas/add_daily_kamas", {
            method: "post",
            body: JSON.stringify({
            entryDate: startDate,
            amount: amount,
            dungeonDto: newDungeon
            }),
            headers: {
            'Content-Type': "application/json",
            'Authorization': ("Bearer " + context.JWT)
            }
        }).then(resp => {
            return resp.ok ? resp.json() : [];
        }).then((dkList) => {
            if (dkList !== undefined) {
                dungeon.dailyKamas = dkList;
                let totalDk = 0;
                dkList.forEach(dk => {
                    totalDk += dk.amount;
                });
                setAmount("");
                setCurrentTotal(totalDk);
                setDailyKamas(dkList.sort(function(a, b){return new Date(b.entryDate)-new Date(a.entryDate)}));
            }
        }).catch(err => {
            setText(<Alert variant="warning">An error occurred while adding the new entry</Alert>);
            console.log(err);
        });
    }

    const onSubmitEvent = async (e) => {
        e.preventDefault();
        if (startDate && amount && e.currentTarget.checkValidity() && (isDailyAmount || (!isDailyAmount && amount !== currentTotal))) {
            setValidated(true);
            await submitDailyKamas();
            setValidated(false);
        }
    }

    const onDeleteSelectionEvent = async (e) => {
        e.preventDefault();
        if (selectedRows && selectedRows.length > 0) {
            let tempDungeon = dungeon;
            tempDungeon.dailyKamas = null;
            selectedRows[0].dungeonDto = tempDungeon;
            return await fetch("/api/daily_kamas/delete_daily_kamas", {
                method: "post",
                body: JSON.stringify(selectedRows),
                headers: {
                'Content-Type': "application/json",
                'Authorization': ("Bearer " + context.JWT)
                }
            }).then(resp => {
                return resp.ok ? resp.json() : [];
            }).then((dkList) => {
                if (dkList !== undefined) {
                    dungeon.dailyKamas = dkList;
                    let totalDk = 0;
                    dkList.forEach(dk => {
                        totalDk += dk.amount;
                    });
                    setCurrentTotal(totalDk);
                    setDailyKamas(dkList.sort(function(a, b){return new Date(b.entryDate)-new Date(a.entryDate)}));
                    setSelectedRows([]);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    const handlePageClick = (data) => {
        handlePagination(data.selected)
    };

    const handlePagination = (nbr) => {
        let newCurrentCols = [];
        for (let i = (((nbr+1)*NUMBER_OF_COLS_PER_PAGE)-NUMBER_OF_COLS_PER_PAGE); i<dailyKamas.length && i<((nbr+1)*NUMBER_OF_COLS_PER_PAGE); i++) {
          newCurrentCols.push(dailyKamas[i]);
        }
        setCurrentCols(newCurrentCols);
        setCurrentPage(nbr);
    }

    return (
        <div className="daily-kamas-style" >
            <DailyKamasForm 
                dungeonId={dungeon.id}
                validated={validated}
                startDate={startDate}
                setStartDate={setStartDate}
                setAmount={setAmount}
                onSubmitEvent={onSubmitEvent}
                text={text}
                isDailyAmount={isDailyAmount} 
                setDailyAmount={setDailyAmount}
                currentTotal={currentTotal} />
            {dailyKamas.length !== 0 ? 
                <>
                    <DailyKamasChart
                        dailyKamas={dailyKamas}/>
                    <DailyKamasTable 
                        dailyKamas={dailyKamas}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        onDeleteSelectionEvent={onDeleteSelectionEvent}
                        handlePageClick={handlePageClick}
                        currentCols={currentCols}
                        currentPage={currentPage}
                        nbrOfColsPerPage={NUMBER_OF_COLS_PER_PAGE} />
                </> : ""
            }
            
        </div>
    )
}

export default DailyKamasContainer;