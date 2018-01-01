import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {RaisedButton} from 'material-ui';
import firebase from './firebase';
import {browserHistory} from 'react-router';
import fire from './firebase';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userName: "",
            email:"",
            password:""
        }
        
    }
    updateField = (stateName, ev) =>{
        let obj = {};
        obj[stateName] = ev.target.value;
        this.setState(obj);
        console.log(this.state.stateName);
    }
    submit = () =>{
        console.log(`UserName: ${this.state.userName}`);
        console.log(`email: ${this.state.email}`);
        console.log(`password: ${this.state.password}`);
        if(this.state.userName.trim() !== "" ){
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((user)=>{
                let name = this.state.userName;
                user.updateProfile({
                    displayName: name
                }).then((user)=>{
                    JSON.stringify(localStorage.setItem('currentUser', user.uid));
                    console.log('profile is updated: ' + user);
                    this.props.history.push('/');
                }).catch(error=>alert(error.message));
            })
            .catch(error=>console.log(error.message));
        }
    }
    navigateLogin = () =>{
        this.props.history.push('/login');
    }

    render(){
        return(
            <div>
                <MuiThemeProvider>
                    <div style={{width:'50%', margin:'0 auto', textAlign:'center'}}>
                        <h1>SignUp</h1>
                        <TextField
                            onChange={(event)=>{this.updateField('userName', event)}}
                            value={this.state.userName}
                            hintText="User Name"
                            floatingLabelText="Username"
                        /><br />
                        <TextField
                            onChange={(event)=>{this.updateField('email', event)}}
                            value={this.state.email}                        
                            hintText=""
                            floatingLabelText="Email"
                        /><br />
                        <TextField
                            onChange={(event)=>{this.updateField('password', event)}}
                            value={this.state.password}                        
                            type="password"
                            hintText=""
                            floatingLabelText="Password"
                        /><br />
                        <div style={{width:'100%', textAlign:'center'}}>
                            <RaisedButton onClick={this.submit} label="Submit" primary={true} style={{margin: '12px'}} />
                            <RaisedButton onClick={this.navigateLogin} label="Login" primary={true} style={{margin: '12px'}} />
                        </div>
                    </div>
                    
                </MuiThemeProvider>
            </div>
        );
    }
}

export default SignUp;