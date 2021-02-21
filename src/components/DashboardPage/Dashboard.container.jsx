import React, {useEffect, useState, useContext} from 'react'
import { AuthenticationContext } from '../../contexts/Authentication/Authentication';
import Dashboard from './Dashboard/Dashboard'; 

function DashboardContainer() {

  const context = useContext(AuthenticationContext);
  const [servers, setServers] = useState([{serverName:""}]);
  const [activeKey, setActiveKey] = useState("");
  const [newServer, setNewServer] = useState("");

  useEffect(() => {
    const getData = (async () => {
        return await fetch("/api/server/get_sub_classes_servers", {
            method: "get",
            headers: {
              'Content-Type': "application/json",
              'Authorization': ("Bearer " + context.JWT)
            }
        }).then(resp => {
            return resp.ok ? resp.json() : [];
        }).catch(err => console.log(err)).then((servers) => {
          if (servers !== undefined) {
            setServers(servers.sort((a, b) => a.serverName.localeCompare(b.serverName)));
            setActiveKey(servers[0] !== undefined ? servers[0].serverName : "");
          }
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
    }).then((server) => {
      if (server !== undefined) {
        let newServers = servers;
        newServers.push(server);
        setServers(servers.sort((a, b) => a.serverName.localeCompare(b.serverName)));
        setActiveKey(newServer);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  const onKeyChangeEvent = (e) => {
    setActiveKey(e.target.text !== undefined ? e.target.text : e.target.innerHTML);
  }

  const onChangeNewServerEvent = (e) => {
      setNewServer(e.target.value);
  }

  const onSubmitNewServer = () => {
      if (newServer) {
          submitNewServer();
          setNewServer("");
      }
  }

  return (
      <Dashboard
        activeKey={activeKey}
        onKeyChangeEvent={onKeyChangeEvent}
        servers={servers}
        newServer={newServer}
        onChangeNewServerEvent={onChangeNewServerEvent}
        onSubmitNewServer={onSubmitNewServer} />
  )
}

export default DashboardContainer;
