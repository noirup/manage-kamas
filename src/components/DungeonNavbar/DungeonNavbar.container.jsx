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

    useEffect(() => {
      const getData = (async () => {
          return await fetch("/api/dungeon/get_dungeons", {
              method: "post",
              body: JSON.stringify(server),
              headers: {
                'Content-Type': "application/json",
                'Authorization': ("Bearer " + context.JWT)
              }
          }).then(resp => {
              return resp.ok ? resp.json() : [];
          }).then((dungeons) => {
            if (dungeons !== undefined) {
                setDungeons(dungeons);
                setActiveKey(dungeons[0] !== undefined ? dungeons[0].dungeonName : "");
            }
        }).catch(err => console.log(err));
      });
      getData();
    }, [context.JWT, server]);

    const submitNewDungeon = async () => {
      return await fetch("/api/dungeon/add_dungeon", {
        method: "post",
        body: JSON.stringify({
          dungeonName: newDungeon,
          server: server
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
            setActiveKey(dungeons[0] !== undefined ? dungeons[0].dungeonName : "");
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
            console.log(newDungeon)
            submitNewDungeon();
            setNewDungeon("");
        }
    }
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSelectChangeEvent = (k) => {
        k === "newDungeon" ? handleShow() : setActiveKey(k);
    };

    return (
        <DungeonNavbar server={server}
            dungeons={dungeons}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            onChangeNewDungeonEvent={onChangeNewDungeonEvent}
            onSubmitNewDungeon={onSubmitNewDungeon}
            newDungeon={newDungeon}
            show={show}
            handleClose={handleClose}
            handleShow={handleShow}
            onSelectChangeEvent={onSelectChangeEvent} />
    )
}

export default DungeonNavbarContainer;