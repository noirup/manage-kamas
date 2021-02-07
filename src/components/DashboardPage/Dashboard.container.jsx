import React, {useEffect, useState, useContext} from 'react'
import { AuthenticationContext } from '../../contexts/Authentication/Authentication';
import Dashboard from './Dashboard/Dashboard'; 

function DashboardContainer() {

  const context = useContext(AuthenticationContext);
  const [servers, setServers] = useState([{serverName:""}]);
  const [activeKey, setActiveKey] = useState("");
  const [newServer, setNewServer] = useState("");

  const onKeyChangeEvent = (e) => {
    setActiveKey(e.target.text !== undefined ? e.target.text : e.target.innerHTML);
  }

  useEffect(() => {
    const getData = (async () => {
        return await fetch("/api/server/get_servers", {
            method: "get",
            headers: {
              'Content-Type': "application/json",
              'Authorization': ("Bearer " + context.JWT)
            }
        }).then(resp => {
            return resp.ok ? resp.json() : [];
        }).catch(err => console.log(err)).then((servers) => {
            setServers(servers.sort((a, b) => a.serverName.localeCompare(b.serverName)));
            setActiveKey(servers[0] !== undefined ? servers[0].serverName : "");
      });
    });
    getData();
  }, [context.JWT])

  const submitNewServer = async () => {
    return await fetch("/api/server/add_server", {
      method: "post",
      body: JSON.stringify({
        serverName: newServer
      }),
      headers: {
        'Content-Type': "application/json",
        'Authorization': ("Bearer " + context.JWT)
      }
    }).then(resp => {
      return resp.ok ? resp.json() : [];
    }).then((servers) => {
      setServers(servers.sort((a, b) => a.serverName.localeCompare(b.serverName)));
      setActiveKey(newServer);
    }).catch(err => {
      console.log(err);
    });
  }


  return (
      <Dashboard
        activeKey={activeKey}
        onKeyChangeEvent={onKeyChangeEvent}
        servers={servers}
        newServer={newServer}
        setNewServer={setNewServer}
        submitNewServer={submitNewServer} />
  )
}

export default DashboardContainer;
