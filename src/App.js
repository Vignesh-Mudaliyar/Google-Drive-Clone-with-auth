import './App.css';
import Signup from './components/Authentication/signup';
import { AuthProvider } from './Contexts/authcontext';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Profile from './components/Authentication/profile';
import Login from './components/Authentication/login';
import ResetPassword from './components/Authentication/resetpassword';
import UpdateProfile from './components/Authentication/updateProfile';
import PrivateRoute from './components/Authentication/privateRoute';
import Dashboard from './components/Google-Drive/Dashboard';


function App() {
  return (
   
      <AuthProvider>
        <Router>
            <Switch>
              {/* Google-Drive */}
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/folder/:folderId" component={Dashboard} />


              {/* User */}
              <PrivateRoute path="/user" component={Profile} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />

              {/* Authentication */}
              <Route path="/signup" component={Signup} />
              <Route  path="/login" component={Login} />
              <Route  path="/reset-password" component={ResetPassword} />
            </Switch>
        </Router>
    </AuthProvider>
     
  );
}

export default App;
