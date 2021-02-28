import React from 'react'
import './ServerInfo.css'

function ServerInfo({
    server
}) {
    let total = 0;

    if(server.dungeons !== undefined) {
        server.dungeons.forEach(dungeon => {
            let totalDk = 0;
            dungeon.dailyKamas.forEach(dk => {
                totalDk += dk.amount;
            });
            total += totalDk;
        });
    }

    return (
        <h4 className="server-info-title">
            Kamas on {server.serverName}: {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
        </h4>
    );
}

export default ServerInfo;