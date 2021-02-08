import React from 'react'
import './DungeonNavbar.css'
import { Tabs, Tab } from "react-bootstrap";
import AddDungeon from "../../AddDungeonModal/AddDungeon";

function DungeonNavbar({
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
                <Tab eventKey={d.dungeonName} key={d.dungeonName} title={d.dungeonName}>
                    <div>{d.dungeonName}</div>
                </Tab>
            )}
            <Tab eventKey="newDungeon" key="newDungeon" title="Add">
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