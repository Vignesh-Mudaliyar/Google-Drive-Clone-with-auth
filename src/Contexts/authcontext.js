import react,{ createContext,useContext, useState } from "react";
import { useEffect } from "react";
import { auth } from '../firebase';


const AuthContext = react.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [userState,setuserState] =useState();
    const [loading,setLoading] =useState(true);

    useEffect(()=>{
        const unsuscribe = auth.onAuthStateChanged((user)=>{
            setuserState(user)
             setLoading(false);   
        })
        return unsuscribe;
    },[]);

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout(){
        return auth.signOut();
    }

    function resetpassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    function emailUpdate(email){
        return userState.updateEmail(email);
    }

    function passwordUpdate(password){
        return userState.updatePassword(password);
    }

    const value={
        userState,
        signup,
        login,
        logout,
        resetpassword,
        emailUpdate,
        passwordUpdate
    }
    return(
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
    ); 
}