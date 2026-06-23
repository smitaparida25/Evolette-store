// context that stores the data that multiple component needs
import React, { useState, useEffect, createContext } from "react";
// calls me when the authcontext loads

const AuthContext = createContext(); // shared space

function AuthContextProvider({ children }){
    const [user, setUser] = useState(null);

    useEffect(() => {
        // call me endpoint
         fetch("http://localhost:3000/me", {
                credentials: "include"
            })
        .then(res => res.json()) // converting json to javascript object
        .then(data => {
            setUser(data.user);
            console.log(data);
            });// data is a variable name for the object
        }, []);

    return (
            <AuthContext.Provider value={{ user, setUser }}>
                {/* everything inside this will have access to the shared data */}
                {children}
            </AuthContext.Provider>
        );

}
export { AuthContext, AuthContextProvider };