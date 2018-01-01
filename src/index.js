import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import fire from './Components/firebase';
import Greeting from './App';
import registerServiceWorker from './registerServiceWorker';
import SignUp from './Components/signUp';
import Routes from './Components/Router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {MuiThemeProvider} from 'material-ui/styles';

// class App extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {open: false};
    
//   }
//   handleToggle = () => {
//     console.log('i am called');
//     this.setState({open: !this.state.open})
//   };
//   render(){
//     return(

//           <div>
//       <MuiThemeProvider>
//           <AppBar
//               title="Title"
//               iconClassNameRight="muidocs-icon-navigation-expand-more"
//               onLeftIconButtonClick={this.handleToggle}
//               />
//               <DrawerUndockedExample open={this.state.open}/>
          
//       </MuiThemeProvider>
//           </div>
//     );
//   }
// }

// class DrawerUndockedExample extends React.Component {

//     constructor(props) {
//       super(props);
//       this.state = {
//         open: false,
//         status: 'Login'
//       };
//       fire.auth().onAuthStateChanged((user)=>{
//         if(user){
//           this.setState({status: "Logout"});
//         }
//         else{
//           this.setState({status: "Login"});     
//         }
//       })
//     }
//     signInOrSignOut = () =>{
//       if(this.state.status === "Login"){
//         this.props.history.push('./login');     
//       }else{
//         fire.auth().signOut()
//         .then((user)=>{
//           if(user){
//             this.props.history.push('/');
//           }
//         })
//         .catch((error)=>{
//           console.log(error.message);
//         })
//       }
//     }
  
//     handleToggle = () => this.setState({open: !this.state.open});
  
//     changeURL = (page) => {
//       console.log(this.props);
//       this.props.history.push("/" + page);
//       this.setState({open: false}); 
//     }
  
//     render() {
//       return (
//         <MuiThemeProvider>
//           <AppBar
//               title="Title"
//               iconClassNameRight="muidocs-icon-navigation-expand-more"
//               onLeftIconButtonClick={this.handleToggle}
//               />
//           <Drawer
//             docked={false}
//             width={200}
//             open={this.state.open}
//             onRequestChange={(open) => this.setState({open})}
//           >
//             <MenuItem onClick={()=>{this.changeURL('crime')}}>Crime</MenuItem>
//             <MenuItem onClick={()=>{this.changeURL('missingpersons')}}>Missing Person</MenuItem>
//             <MenuItem onClick={this.signInOrSignOut}>{this.state.status}</MenuItem>
            

//           </Drawer>
//         </MuiThemeProvider>
//       );
//     }
//   }
// class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {open: false};
//   }

//   handleToggle = (event) => this.setState({open: !this.state.open});

//   render() {

//     const {styleFromProps} = this.props;
//     const contentStyle = {  ...styleFromProps, transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' };

//     if (this.state.open) {
//       contentStyle.marginLeft = 256;
//     }

//     return (
        
//           <MuiThemeProvider>
            
//           <AppBar title="AppTitle" onLeftIconButtonClick={this.handleToggle} />
//             <Drawer containerStyle={{height: 'calc(100% - 64px)', top: 64}} docked={true} width={200} open={this.state.open} zDepth={2}>
//               <MenuItem>Dashboard</MenuItem>
//               <MenuItem>Information</MenuItem>
//             </Drawer>

            
//           </MuiThemeProvider>
        
//     );
//   }
// }


ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
