import React from 'react';
import fire from './firebase';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {withRouter} from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Button } from 'react-bootstrap';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class DrawerUndockedExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      status: 'Login'
    };
    fire.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({status: "Logout"});
      }
      else{
        this.setState({status: "Login"});     
      }
    })
  }
  signInOrSignOut = () =>{
    if(this.state.status === "Login"){
      this.props.history.push('./login');     
      this.setState({open: false});
    }else{
      fire.auth().signOut()
      .then(()=>{
        
          this.props.history.replace('/');
        }
      )
      .catch((error)=>{
        console.log(error.message);
      })
      this.setState({open: false});
    }
  }

  handleToggle = () => this.setState({open: !this.state.open});

  changeURL = (page) => {
    console.log(this.props);
    if(page === "complain"){
      fire.auth().onAuthStateChanged((user)=>{
        if(user){
          this.props.history.push("/" + page);
        }
        else{
          this.props.history.push("./login");
        }
      })
    }
    else{
      this.props.history.push("/" + page);
    }
    this.setState({open: false}); 
    
  }

  render() {
    return (
      <div>
        <AppBar
            title="Crime Reporting"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonClick={this.handleToggle}
            />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={()=>{this.changeURL('crime')}}>Crimes</MenuItem>
          <MenuItem onClick={()=>{this.changeURL('missingpersons')}}>Missing Persons</MenuItem>
          <MenuItem onClick={()=>{this.changeURL('complain')}}>Complain</MenuItem>
          <MenuItem onClick={this.signInOrSignOut}>{this.state.status}</MenuItem>
        </Drawer>
        </div>
    );
  }
}
export default withRouter(DrawerUndockedExample);