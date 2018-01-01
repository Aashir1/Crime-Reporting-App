import React from 'react';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TimePicker from 'material-ui/TimePicker';
import Paper from 'material-ui/Paper';
const styles = {
    block: {
      maxWidth: 250,
    },
    radioButton: {
      marginBottom: 16,
    },
    textField:{
        width: '100%',
    },
  };
  const style = {
    height: "100%",
    width: '100%',
    margin: 20,
    padding:'25px',
    display: 'inline-block',
  };
class AnyDepartReport extends React.Component{  
    constructor(props){
        super(props);
        this.state= {
            name:"",
            email:"",
            contact:"",
            description:"",
            time:""
        }
    }
    updateState = (event, stateName) =>{
        let obj = {};
        obj[stateName] = event.target.value;
        this.setState(obj);
        console.log()
    }

    render(){
        return(
            <div style={{width:'70%', margin:'0 auto'}}>
                <Paper style={style} zDepth={1}>
                    <h1 style={{textAlign: 'center'}}>Department Complain</h1>
                    <TextField
                        value={this.state.name}
                        onChange={(event)=>{this.updateState(event, 'name')}}
                        style={styles.textField}
                        hintText="Enter Name"
                        floatingLabelText="Name"
                        /><br />
                    <TextField
                        value={this.state.email}                    
                        onChange={(event)=>{this.updateState(event, 'email')}}                    
                        style={styles.textField}
                        hintText="Email"
                        floatingLabelText="Eamil"
                        /><br />
                    <TextField
                        type='number'
                        value={this.state.contact}
                        onChange={(event)=>{this.updateState(event, 'contact')}}                                        
                        style={styles.textField}
                        hintText=""
                        floatingLabelText="Contact No"
                    /><br />
                    <TextField
                        style={styles.textField}
                        value={this.state.description}
                        onChange={(event)=>{this.updateState(event, 'description')}}                    
                        hintText=""
                        floatingLabelText="Complain Description"
                        multiLine={true}
                        rows={2}
                    /><br />
                    <TimePicker
                        value={this.state.time}
                        onChange={(event)=>{this.updateState(event, 'time')}}
                        hintText="Select Time"
                    />
                </Paper>
            </div>
        );
    }
}

export default AnyDepartReport;