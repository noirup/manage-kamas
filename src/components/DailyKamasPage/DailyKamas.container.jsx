import React, {useEffect, useState, useContext} from 'react'
import { AuthenticationContext } from '../../contexts/Authentication/Authentication';
import DailyKamasForm from './DailyKamasForm/DailyKamasForm'; 
import { Alert } from "react-bootstrap";
import DailyKamasTable from './DailyKamasTable/DailyKamasTable'; 

function DailyKamasContainer({
    dungeon
}) {

    const context = useContext(AuthenticationContext);
    const [dailyKamas, setDailyKamas] = useState([]);
    const [validated, setValidated] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [amount, setAmount] = useState(0);
    const [text, setText] = useState("");
    const [isDailyAmount, setDailyAmount] = useState(false);
    const [currentTotal, setCurrentTotal] = useState(0);
    const [selectedRows, setSelectedRows] = useState({rowIds: []});

    useEffect(() => {
      const getData = (async () => {
          return await fetch("/api/daily_kamas/get_all_by_dungeon", {
              method: "post",
              body: JSON.stringify(dungeon),
              headers: {
                'Content-Type': "application/json",
                'Authorization': ("Bearer " + context.JWT)
              }
          }).then(resp => {
              return resp.ok ? resp.json() : [];
          }).then((dailyKamas) => {
            if (dailyKamas !== undefined) {
                let totalDk = 0;
                dailyKamas.forEach(dk => {
                    totalDk += dk.amount;
                });
                setCurrentTotal(totalDk);
                setDailyKamas(dailyKamas);
            }
        }).catch(err => console.log(err));
      });
      getData();
    }, [context.JWT]);

    const submitDailyKamas = async () => {
        return await fetch("/api/daily_kamas/add_daily_kamas", {
            method: "post",
            body: JSON.stringify({
            entryDate: startDate,
            amount: amount,
            dungeonDto: dungeon
            }),
            headers: {
            'Content-Type': "application/json",
            'Authorization': ("Bearer " + context.JWT)
            }
        }).then(resp => {
            return resp.ok ? resp.json() : [];
        }).then((dkList) => {
            if (dkList !== undefined) {
                let totalDk = 0;
                dkList.forEach(dk => {
                    totalDk += dk.amount;
                });
                setCurrentTotal(totalDk);
                setDailyKamas(dkList);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const onSubmitEvent = async (e) => {
        e.preventDefault();
        if (startDate && amount && e.currentTarget.checkValidity()) {
            if (!isDailyAmount) {
                setAmount(amount-currentTotal);
            }
            setValidated(true);
            const resp = await submitDailyKamas();
            if(!resp){
                setValidated(false);
                setText(<Alert variant="warning">An error occurred while adding the new entry</Alert>);
            }
        }
    }

    const onDeleteSelectionEvent = async (e) => {
        e.preventDefault();
        if (selectedRows) {
            let dkRowsToBeDeleted = [];
            let isFirst = true;
            selectedRows.rowIds.forEach(s => {
                if (isFirst) {
                    dkRowsToBeDeleted.push({
                        id: s,
                        dungeonDto: dungeon
                    });
                    isFirst = false;
                } else {
                    dkRowsToBeDeleted.push({
                        id: s
                    });
                }
            });
            return await fetch("/api/daily_kamas/delete_daily_kamas", {
                method: "post",
                body: JSON.stringify(dkRowsToBeDeleted),
                headers: {
                'Content-Type': "application/json",
                'Authorization': ("Bearer " + context.JWT)
                }
            }).then(resp => {
                return resp.ok ? resp.json() : [];
            }).then((dkList) => {
                if (dkList !== undefined) {
                    let totalDk = 0;
                    dkList.forEach(dk => {
                        totalDk += dk.amount;
                    });
                    setCurrentTotal(totalDk);
                    setDailyKamas(dkList);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    return (
        <>
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
            <DailyKamasTable 
                dailyKamas={dailyKamas}
                setSelectedRows={setSelectedRows}
                onDeleteSelectionEvent={onDeleteSelectionEvent} />
            
        </>
    )
}

export default DailyKamasContainer;