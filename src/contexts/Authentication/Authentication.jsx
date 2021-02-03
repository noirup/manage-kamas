import React, {useState} from 'react';
import { isEmpty } from '../../utils/utils';

const JWT_STORAGE_KEY="UHye6584re";

const AuthenticationContext = React.createContext({
    jsonWebToken: "",
    setJWTValue: () => {console.log("nothing yet")},
    isConnectedValue: () => {return false;}
})

const AuthenticationConsumer = AuthenticationContext.Consumer;

const AuthenticationProvider = ({children}) => {

    let item = sessionStorage.getItem(JWT_STORAGE_KEY);

    if (isEmpty(item)) {
        item = "";
    }

    const [JWT, setJWT] = useState(item);

    const isConnected = () => {
        return JWT !== "";
    };

    const jWTChange = (newJWT) => {
        setJWT(newJWT);
        sessionStorage.setItem(JWT_STORAGE_KEY, newJWT);
    };

    const providerData = {
        JWT, 
        jWTChange,
        isConnected
    };

    return (
        <AuthenticationContext.Provider value={providerData}>
            {children}
        </AuthenticationContext.Provider>
    )
};

export {
    AuthenticationContext,
    AuthenticationProvider,
    AuthenticationConsumer
}