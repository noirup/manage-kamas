import React, {useEffect, useState, useContext} from 'react'
import { AuthenticationContext } from '../../contexts/Authentication/Authentication';
import DailyKamasForm from './DailyKamasForm/DailyKamasForm'; 
import { Alert } from "react-bootstrap";

function DailyKamasContainer({
    dungeon
}) {

    const context = useContext(AuthenticationContext);
    const [dailyKamas, setDailyKamas] = useState([]);
    const [validated, setValidated] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [amount, setAmount] = useState(0);
    const [text, setText] = useState("");

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
                setDailyKamas(dailyKamas.sort((a, b) => a.entryDate - b.entryDate));
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
                setDailyKamas(dkList.sort((a, b) => a.entryDate - b.entryDate));
            }
            return true
        }).catch(err => {
            console.log(err);
        });
    }

    const onSubmitEvent = async (e) => {
        console.log()
        if (startDate && amount && e.currentTarget.checkValidity()) {
            setValidated(true);
            const resp = await submitDailyKamas();
            if(!resp){
                setValidated(false);
                setText(<Alert variant="warning">An error occurred while adding the new entry</Alert>);
            }
        }
    }

    return (
        <>
        <DailyKamasForm 
            validated={validated}
            startDate={startDate}
            setStartDate={setStartDate}
            setAmount={setAmount}
            onSubmitEvent={onSubmitEvent}
            text={text} />
            <div>{dailyKamas.map(dk => <p>{dk.amount}</p>)}</div>
        </>
    )
}

export default DailyKamasContainer;