import React from 'react'
import './DungeonNavbar.css'
import { Tabs, Tab } from "react-bootstrap";
import AddDungeon from "../../AddDungeonModal/AddDungeon";
import DailyKamasContainer from "../../DailyKamasPage/DailyKamas.container";

function DungeonNavbar({
    serverId,
    dungeons,
    activeKey,
    onChangeNewDungeonEvent,
    onSubmitNewDungeon,
    newDungeon,
    show,
    handleClose,
    onSelectChangeEvent
}) {

    return (
        <Tabs activeKey={activeKey} onSelect={onSelectChangeEvent} transition={false} id="noanim-tab-example">
            {dungeons.map(d => 
                <Tab eventKey={d.dungeonName + d.id} key={d.dungeonName + d.id} title={d.dungeonName}>
                    <DailyKamasContainer dungeon={d} />
                </Tab>
            )}
            <Tab eventKey={"newDungeon"+serverId} key={"newDungeon"+serverId} title="Add">
                <AddDungeon 
                    onSubmitNewDungeon={onSubmitNewDungeon}
                    newDungeon={newDungeon}
                    onChangeNewDungeonEvent={onChangeNewDungeonEvent}
                    show={show}
                    handleClose={handleClose} />
            </Tab>
        </Tabs>
    )
}

export default DungeonNavbar;