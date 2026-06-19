// context that stores the data that multiple component needs
import React, { useState, useAffect } from "react";
// calls me when the authcontext loads

function AuthContext(){
    const [user, setUser] = useState(null);

    useAffect(() => {
        // call me endpoint

        }, []);















}