import React from 'react';
import SignUp from './signUp';
import Home from './Home';
import Login from './login';
import MissingPerson from './missingpersons';
import Crimes from './crime';
import ReportCrime from './registerCrime';
import MissingPersonForm from './missingPersonForm';
import DrawerUndockedExample from './Navbar';
import Complain from './complain';
import RegisterComplain from './registerComplain';
import {
    BrowserRouter,
    Route,
    Switch,
    withRouter
} from 'react-router-dom';
import Navbar from './Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {History} from 'history';

// const customHistory = createBrowserHistory();
const Routes = () =>(
    <BrowserRouter >
        <Switch>
        <MuiThemeProvider>
            <DrawerUndockedExample/>
            {/* <Route exact path ='/' component={SignUp} />
            <Route path ='/home' component={Home} />*/}
            <Route exact path ='/' component={Crimes} />
            <Route path ='/crime' component={Crimes} />                        
            <Route path ='/login'  component={Login} /> 
            <Route path ='/missingpersons' component={MissingPerson} />
            <Route path = '/registerCrime' component={ReportCrime} />
            <Route path = '/missingPersonForm' component={MissingPersonForm} />
            <Route path ='/signUp'  component={SignUp} />
            <Route path ='/complain'  component={Complain} />
            <Route path ='/registerComplain'  component={RegisterComplain} />
            
            
                  
                        
                        
            {/* <Route path ='/contact' component={Contact} />             */}
        </MuiThemeProvider>
        </Switch>
            
    </BrowserRouter>
) 

export default Routes;