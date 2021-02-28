import React from 'react'
import './DungeonNavbar.css'
import { Tabs, Tab, Button } from "react-bootstrap";
import AddDungeon from "../../AddDungeonModal/AddDungeon";
import DeleteDungeon from "../../DeleteDungeonModal/DeleteDungeon";
import DailyKamasContainer from "../../DailyKamasPage/DailyKamas.container";
import ServerInfo from '../../ServerInfo/ServerInfo';

function DungeonNavbar({
    server,
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
        <>
            <ServerInfo
                server={server} />
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
                <Tab eventKey={"newDungeon"+server.id} key={"newDungeon"+server.id} title="Add">
                    <AddDungeon 
                        onSubmitNewDungeon={onSubmitNewDungeon}
                        newDungeon={newDungeon}
                        onChangeNewDungeonEvent={onChangeNewDungeonEvent}
                        show={show}
                        handleClose={handleClose} />
                </Tab>
            </Tabs>
        </>
    )
}

export default DungeonNavbar;