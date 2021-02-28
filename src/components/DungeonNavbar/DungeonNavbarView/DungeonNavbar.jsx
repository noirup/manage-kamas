import React from 'react'
import './DungeonNavbar.css'
import { Tabs, Tab, Button } from "react-bootstrap";
import AddDungeon from "../../AddDungeonModal/AddDungeon";
import DeleteDungeon from "../../DeleteDungeonModal/DeleteDungeon";
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
    onSelectChangeEvent,
    showDelete,
    handleCloseDelete,
    handleShowDelete,
    deleteDungeon
}) {

    return (
        <Tabs activeKey={activeKey} onSelect={onSelectChangeEvent} transition={false} id="noanim-tab-example">
            {dungeons.map(d => 
                <Tab eventKey={d.dungeonName + d.id} key={d.dungeonName + d.id} title={d.dungeonName}>
                    {activeKey === (d.dungeonName + d.id) ? 
                        <>
                            <Button variant="danger" className="delete-button-style" onClick={handleShowDelete} >Delete</Button>
                            <DeleteDungeon 
                                deleteDungeon={deleteDungeon}
                                dungeon={d}
                                show={showDelete}
                                handleClose={handleCloseDelete} />
                            <DailyKamasContainer dungeon={d} />
                        </> : ""}
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