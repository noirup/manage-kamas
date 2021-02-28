import React, {useEffect, useState, useContext} from 'react'
import { AuthenticationContext } from '../../contexts/Authentication/Authentication';
import DungeonNavbar from './DungeonNavbarView/DungeonNavbar'; 

function DungeonNavbarContainer({
    server
}) {
    
    const context = useContext(AuthenticationContext);
    const [dungeons, setDungeons] = useState([]);
    const [activeKey, setActiveKey] = useState("");
    const [newDungeon, setNewDungeon] = useState("");
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
      if (server.dungeons !== undefined && server.dungeons !== null) {
        setDungeons(server.dungeons);
        setActiveKey((server.dungeons[0] !== undefined && server.dungeons[0] !== null) 
          ? (server.dungeons[0].dungeonName + server.dungeons[0].id) : "");
      }
    }, [server]);

    const submitNewDungeon = async () => {
      let newServer = server;
      newServer.dungeons = null;
      return await fetch("/api/dungeon/add_dungeon", {
        method: "post",
        body: JSON.stringify({
          dungeonName: newDungeon,
          server: newServer
        }),
        headers: {
          'Content-Type': "application/json",
          'Authorization': ("Bearer " + context.JWT)
        }
      }).then(resp => {
        return resp.ok ? resp.json() : [];
      }).then((dungeon) => {
        if (dungeon !== undefined) {
          let newDungeons = dungeons;
          newDungeons.push(dungeon);    
          setDungeons(newDungeons);
          server.dungeons = newDungeons;
          setActiveKey(newDungeon+dungeon.id);
        }
      }).catch(err => {
        console.log(err);
      });
    }

    const onChangeNewDungeonEvent = (e) => {
        setNewDungeon(e.target.value);
    }
  
    const onSubmitNewDungeon = (e) => {
        e.preventDefault();
        if (newDungeon) {
            submitNewDungeon();
            setNewDungeon("");
        }
    }
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSelectChangeEvent = (k) => {
        k === "newDungeon" + server.id ? handleShow() : setActiveKey(k);
    };

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const deleteDungeon = async dungeon => {
      let newServer = server;
      newServer.dungeons = null;
      return await fetch("/api/dungeon/delete_dungeon", {
        method: "delete",
        body: JSON.stringify({
          id: dungeon.id,
          server: newServer
        }),
        headers: {
          'Content-Type': "application/json",
          'Authorization': ("Bearer " + context.JWT)
        }
      }).then(resp => {
        return resp.ok ? resp.json() : [];
      }).then((dungeons) => {
        if (dungeons !== undefined) {
          setDungeons(dungeons);
          server.dungeons = dungeons;
          setActiveKey((dungeons[0] !== undefined && dungeons[0] !== null) 
            ? (dungeons[0].dungeonName + dungeons[0].id) : "");
        }
      }).catch(err => {
        console.log(err);
      });
    }

    return (
        <DungeonNavbar serverId={server.id}
            dungeons={dungeons}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            onChangeNewDungeonEvent={onChangeNewDungeonEvent}
            onSubmitNewDungeon={onSubmitNewDungeon}
            newDungeon={newDungeon}
            show={show}
            handleClose={handleClose}
            onSelectChangeEvent={onSelectChangeEvent}
            showDelete={showDelete}
            handleCloseDelete={handleCloseDelete}
            handleShowDelete={handleShowDelete}
            deleteDungeon={deleteDungeon} />
    )
}

export default DungeonNavbarContainer;