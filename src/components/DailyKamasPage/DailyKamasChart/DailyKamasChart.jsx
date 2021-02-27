import React, {useEffect} from 'react'
import './DailyKamasChart.css'
import Chart from "react-google-charts";
import * as moment from 'moment';

function DailyKamasChart({
    dailyKamas
}) {

    let list = [];

    useEffect(() => {
        list.push(['x', 'kamas']);
        dailyKamas.slice(0, 10).reverse().forEach(dk => {
            list.push([moment(dk.entryDate).format('DD/MM/YYYY'), dk.amount]);
        });
    });

    return (
        <div className="charts-style">
            <Chart 
                width={'100%'}
                height={'380px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                style={{borderRadius: '2%'}}
                data={list}
                options={{
                    hAxis: {
                    title: 'Time',
                    },
                    vAxis: {
                    title: 'Kamas',
                    },
                    float: 'right', margin: '0 0 0 20px',
                    backgroundColor: 'rgb(114, 165, 167)',
                    borderRadius: '2%'
                }}
                rootProps={{ 'data-testid': '1' }}
                />
        </div>
    )
}

export default DailyKamasChart;