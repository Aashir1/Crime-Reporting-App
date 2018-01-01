import React from 'react';
import ReportCrime from './registerCrime';
import fire from './firebase';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Avatar } from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import '../index.css';
import MediaQuery from 'react-responsive';
import {
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500,
} from 'material-ui/styles/colors';


const style = {
    card: {
        width: '60%',
        margin: "0 auto",
        marginTop: '10px'
    },
    cardRes:{
        width: '100%',
        margin: "0 auto",
        marginTop: '10px'
    }
    ,
    cardHeader: {
        display: 'inlineBlock',
        backgroundColor: "lightGray",
        paddingRight: '0px'
    }
}

class Crimes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayName:"",
            dataArray: []
        }
        this.database = fire.database().ref('/Reporting-App/crimeReport');

        this.colorArray = [blue300, indigo900, orange200, deepOrange300, pink400, purple500];
    }
    registerCrime = () => {
        JSON.stringify(localStorage.setItem('object', 'crime'));
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({displayName:user.displayName})
                this.props.history.push('./registerCrime');
            } else {
                this.props.history.push('./login');
            }
        })
    }
    componentWillMount() {
        this.database.on('child_added', snapshot => {
            let tempArray = this.state.dataArray;
            let commingData = snapshot.val();
            let obj = {};
            obj['name'] = commingData.name;
            obj['contact'] = commingData.contact;
            obj['description'] = commingData.description;
            obj['time'] = commingData.time;
            tempArray.push(obj);
            this.setState({ dataArray: tempArray });

        })
    }
    render() {
        console.log(this.state.dataArray);
        return (
            <div>
                <RaisedButton onClick={this.registerCrime} style={{ margin: '5px' }} label="Report Crime" primary={true} />
                <h1>
                    Crimes
                </h1>
                {
                    this.state.dataArray.map((eachObj) => {
                        return (
                            <div>
                                <MediaQuery query='(min-width: 558px)'>
                                    <Card style={style.card} className="crimes">
                                        <CardHeader
                                            title="Crime Reported "
                                            subtitle={`At ${new Date(eachObj.time).toLocaleString()}`}
                                            style={style.cardHeader}>
                                            <Avatar
                                                color={deepOrange300}
                                                backgroundColor={this.colorArray[Math.floor(Math.random() * 6)]}
                                                size={30}
                                                style={{ float: 'left', marginRight: "7px" }}
                                            // style={style}
                                            >
                                                {`${eachObj.name.slice(0, 1).toUpperCase()}`}
                                            </Avatar>
                                        </CardHeader>
                                        <CardTitle title="Crime Description" subtitle={`By ${eachObj.name}`} />
                                        <CardText>
                                            {`${eachObj.description}`}
                                        </CardText>
                                    </Card>
                                </MediaQuery>

                                <MediaQuery query='(max-width: 558px)'>
                                    <Card style={style.cardRes} className="crimes">
                                        <CardHeader
                                            title="Crime Reported "
                                            subtitle={`At ${new Date(eachObj.time).toLocaleString()}`}
                                            style={style.cardHeader}>
                                            <Avatar
                                                color={deepOrange300}
                                                backgroundColor={this.colorArray[Math.floor(Math.random() * 6)]}
                                                size={30}
                                                style={{ float: 'left', marginRight: "7px" }}
                                            // style={style}
                                            >
                                                {`${eachObj.name.slice(0, 1).toUpperCase()}`}
                                            </Avatar>
                                        </CardHeader>
                                        <CardTitle title="Crime Description" subtitle={`By ${eachObj.name}`} />
                                        <CardText>
                                            {`${eachObj.description}`}
                                        </CardText>
                                    </Card>
                                </MediaQuery>
                                {/* <Card style={style.card} className="crimes">
                                    <CardHeader
                                        title="Crime Reported "
                                        subtitle={`At ${new Date(eachObj.time).toLocaleString()}`}
                                        style={style.cardHeader}>
                                        <Avatar
                                            color={deepOrange300}
                                            backgroundColor={this.colorArray[Math.floor(Math.random() * 6)]}
                                            size={30}
                                            style={{ float: 'left', marginRight: "7px" }}
                                        // style={style}
                                        >
                                            {`${eachObj.name.slice(0, 1).toUpperCase()}`}
                                        </Avatar>
                                    </CardHeader>
                                    <CardTitle title="Crime Description" subtitle={`By ${eachObj.name}`} />
                                    <CardText>
                                        {`${eachObj.description}`}
                                    </CardText>
                                </Card> */}
                            </div>

                        )
                    })
                }
            </div>
        );
    }
}

export default Crimes;