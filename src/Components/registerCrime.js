import React from 'react';
import fire from './firebase';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import AlertContainer from 'react-alert';
import icon from '../image/alert.png';
const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
    textField: {
        width: '100%',
    },
};
const style = {
    height: "100%",
    width: '100%',
    margin: 20,
    padding: '25px',
    display: 'inline-block',
};
class ReportCrime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            contact: "",
            description: "",
            time: 0,
            reactAlert: false
        }
    }
    submitCrime = () => {
        let obj = {
            name: this.state.name.trim(),
            email: this.state.email.trim(),
            contact: this.state.contact,
            description: this.state.description.trim(),
            time: this.state.time
        }
        // console.log(typeof(obj.name) + ' name');
        // console.log(typeof(obj.email) + ' email');
        // console.log(typeof(obj.contact) + ' contact');
        // console.log(typeof(obj.time) + ' time');
        // console.log(typeof(obj.description) + ' description');

        // console.log((obj.name !== "") + ' name');
        // console.log(this.emailValidate(obj.email) + ' email');
        // console.log(obj.contact !== ""  + ' contact');
        // console.log(obj.time !== "" + ' time');
        // console.log(obj.description !== "" + ' description');
        
        if ( obj.name !== "" && this.emailValidate(obj.email) && obj.description !== "" && obj.time !== "" && obj.description !== "" && obj.contact !== ""){
            fire.database().ref('/Reporting-App/crimeReport').push(obj)
                .then((user) => {
                    if (user) {
                        console.log('data has been submitted');

                        this.props.history.push('/crime');
                    }
                })
                .catch((error) => {
                    this.setState({reactAlert: false});
                    alert(error.message);
                })
        }else{
            this.setState({reactAlert: true})
        }

    }
    
    updateState = (event, stateName) => {
        this.setState({reactAlert: false});
        let obj = {};
        obj[stateName] = event.target.value;
        this.setState(obj);
        console.log(event.target.value)
    }
    setTime = (x, event) => {
        this.setState({reactAlert: false})
        // console.log(JSON.stringify(event))
        // console.log(JSON.stringify(x))
        this.setState({ time: event.getTime() })

    }
    emailValidate = (email) => {
        if (/^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        return (false)
    }
    phonenumber = (inputtxt) => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (inputtxt.match(phoneno)){
        return true;
    }
    else {
        return false;
    }
}


render(){
    return (
        <div style={{ width: '70%', margin: '0 auto' }}>
            <Paper style={style} zDepth={1}>
                <h1 style={{ textAlign: 'center' }}>Register Crime</h1>
                <TextField
                    value={this.state.name}
                    onChange={(event) => { this.updateState(event, 'name') }}
                    style={styles.textField}
                    hintText="Enter Name"
                    floatingLabelText="Name"
                /><br />
                <TextField
                    type="email"
                    pattern="[a-zA-Z0-9!#$%&amp;'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*"
                    value={this.state.email}
                    onChange={(event) => { this.updateState(event, 'email') }}
                    style={styles.textField}
                    hintText="Email"
                    floatingLabelText="Eamil"
                /><br />
                <TextField
                    type='number'
                    value={this.state.contact}
                    onChange={(event) => { this.updateState(event, 'contact') }}
                    style={styles.textField}
                    hintText=""
                    floatingLabelText="Contact No"
                /><br />
                <TextField
                    style={styles.textField}
                    value={this.state.description}
                    onChange={(event) => { this.updateState(event, 'description') }}
                    hintText=""
                    floatingLabelText="Complain Description"
                    multiLine={true}
                    rows={2}
                /><br />
                <TimePicker
                    format="ampm"
                    // value={this.state.time}
                    onChange={(x, event) => { this.setTime(x, event) }}
                    hintText="Select Time"
                />
                <div style={{ textAlign: "center" }}>
                    <RaisedButton label="Submit" onClick={this.submitCrime} secondary={true} style={{ width: "100%", marginTop: "20px" }} />
                </div>
            </Paper>
            <App show1={this.state.reactAlert}/>

        </div>
    );
}
}
class App extends React.Component {
    constructor(props){
        super(props);
        
    }
    alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    }
   
    // showAlert = () => {
    //     console.log(this.msg);
    //     if(this.props.show1){
    //         this.msg.show('Some text or component', {
    //           time: 2000,
    //           type: 'success',
    //           icon: <img src="path/to/some/img/32x32.png" alt="alert-Icon"/>
    //         })
    //     }
    //     else{
            
    //     }
    // }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show1 !== this.props.show1;
    }
    componentWillReceiveProps(){
        console.log('props is recived ' + this.props.show1)
        if(this.props.show1){
            this.msg.show('You must entered wrong data', {
              time: 2000,
              type: 'success',
              icon: <img src={icon} alt="alert-Icon"/>
            })
        }
        else{
            
        }
    }
   
    render () {
        
      return (
        <div>
          <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
          {/* <button onClick={this.showAlert}>Show Alert</button> */}
        </div>
      )
    }
  }

export default ReportCrime;