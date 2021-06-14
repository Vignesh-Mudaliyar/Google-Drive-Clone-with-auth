import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useAuth} from '../../Contexts/authcontext'

export default function PrivateRoute({component:Component,...rest}) {
    const {userState} = useAuth()
    return (
        <Route {...rest}  render={props => {
           return userState ? <Component {...props} /> : <Redirect to="/login" />
        }}></Route>
    )
}
