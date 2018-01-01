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
class MissingPersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            contact: "",
            description: "",
            time: 0,
            age:0,
            reactAlert : false
        }
    }
    updateState = (event, stateName) => {
        this.setState({reactAlert: false})
        
        let obj = {};
        obj[stateName] = event.target.value;
        this.setState(obj);
        console.log()
    }
    submiMissingReport = () => {
        let obj = {
            name: this.state.name,
            email: this.state.email,
            contact: this.state.contact,
            description: this.state.description,
            time: this.state.time,
            age: this.state.age
        }
        if (obj.name !== "" && this.emailValidate(obj.email) && obj.description !== "" && obj.time !== "" && obj.description !== "" && obj.contact !== "" && obj.age !== "") {
            console.log('chala')
            this.setState({reactAlert: false});            
            fire.database().ref('/Reporting-App/missingPersons').push(obj)
                .then((user) => {
                    if (user) {
                        console.log('data has been submitted');

                        this.props.history.push('/missingpersons');
                    }
                })
                .catch((error) => {
                    alert(error.message);
                })
        } else {
            this.setState({reactAlert: true})
            // alert('badly formated form');
        }

    }
    setTime = (x, event) => {
        this.setState({reactAlert: false})
        
        console.log(new Date(event.getTime()));
        let time = event;
        // console.log(JSON.stringify(x))
        this.setState({ time: event.getTime() })

    }
    emailValidate = (email) => {

        if (/^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        return (false)
    }
    render() {
        return (
            <div style={{ width: '70%', margin: '0 auto' }}>
                <Paper style={style} zDepth={1}>
                    <h1 style={{ textAlign: 'center' }}>Missing Person</h1>
                    <TextField
                        value={this.state.name}
                        onChange={(event) => { this.updateState(event, 'name') }}
                        style={styles.textField}
                        hintText=""
                        floatingLabelText="Missing Person Name"
                    /><br />
                    <TextField
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
                        type='number'
                        // value={this.state.age}
                        onChange={(event) => { this.updateState(event, 'age') }}
                        style={styles.textField}
                        hintText=""
                        floatingLabelText="Age"
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
                        <RaisedButton label="Submit" onClick={this.submiMissingReport} secondary={true} style={{ width: "100%", marginTop: "20px" }} />
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
    componentDidMount(){
        console.log(this.props.show1)
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

export default MissingPersonForm;