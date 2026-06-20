// context that stores the data that multiple component needs
import React, { useState, useAffect } from "react";
// calls me when the authcontext loads

function AuthContext(){
    const [user, setUser] = useState(null);

    useAffect(() => {
        // call me endpoint
         fetch("http://localhost:3000/me", {
                credentials: "include"
            })
        .then(res => res.json()) // converting json to javascript object
        .then(data => {
            console.log(data);
            });// data is a variable name for the object
        }, []);








}