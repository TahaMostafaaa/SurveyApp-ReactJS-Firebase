import React, { Component } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');


 // Initialize Firebase
var config = {
    apiKey: "AIzaSyAke3VvitRDLx9a6mlIC4f68dK0nxmwxQo",
    authDomain: "usurvey-78bd8.firebaseapp.com",
    databaseURL: "https://usurvey-78bd8.firebaseio.com",
    projectId: "usurvey-78bd8",
    storageBucket: "usurvey-78bd8.appspot.com",
    messagingSenderId: "710266403535"
  };
  firebase.initializeApp(config);

 

  export default class Usurvey extends Component{


    constructor(props){
        super(props)
        this.state = {
        uid: uuid.v1(),
        studentName: '',
        answers: { answer1: '', answer2:'', answer3:'' } ,
        isSubmitted: false
        };
        this.nameSubmit = this.nameSubmit.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.questionSubmit = this.questionSubmit.bind(this);
    }
    nameSubmit(event)
    {
        //event.preventDefault();
        var studentName = this.refs.name.value;
        this.setState( {studentName: studentName},function(){console.log(this.state);});
    }

    answerSelected(event)
    {
        var answers = this.state.answers;
        if (event.target.name === 'answer1')
            answers.answer1 = event.target.value;
        else if (event.target.name === 'answer2')
            answers.answer2 = event.target.value;
         else
            answers.answer3 = event.target.value;
        this.setState({answers: answers},function(){console.log(this.state);});
        
    }

    questionSubmit()
    {

        firebase.database().ref('uSurvey/'+this.state.uid).set(
            {
                studentName: this.state.studentName,
                answers: this.state.answers
            }
        );
        this.setState({isSubmitted: true});
      
        
    }

    render(){

       
        var studentName;
        var questions;

        if( this.state.studentName === '' && this.state.isSubmitted === false) {
            studentName = <div> <h1>Hey Student, please enter your name: </h1>
                <form onSubmit={this.nameSubmit}>
                    <input className= "namy" text="text" placeholder="Enter your name" ref="name"/>
                </form>
            </div>;
            questions = '';
        } else if ( this.state.studentName !== '' && this.state.isSubmitted === false){

            studentName = <h1>Welcome to U-Survey, {this.state.studentName}</h1>;
            questions =
            <div> <h2 >Here is some questions: </h2> 
                <form onSubmit={this.questionSubmit}> 
                    <div className="card"> 
                        <label>What kind of courses you like the most: </label><br/>
                        <input type="radio" name = "answer1" value="Technology" onChange={this.answerSelected}/>Technology
                        <input type="radio" name = "answer1" value="Design" onChange={this.answerSelected}/>Design
                        <input type="radio" name = "answer1" value="Marketing" onChange={this.answerSelected}/>Marketing
                    </div>
                    <div className="card"> 
                        <label>Your are a: </label><br/>
                        <input type="radio" name = "answer2" value="Student" onChange={this.answerSelected}/>Student
                        <input type="radio" name = "answer2" value="Employee" onChange={this.answerSelected}/>Employee
                        <input type="radio" name = "answer2" value="UnEmployee" onChange={this.answerSelected}/>UnEmployee
                    </div>
                    <div className="card"> 
                        <label>Is online learning helpfull: </label><br/>
                        <input type="radio" name = "answer3" value="Yes" onChange={this.answerSelected}/>Yes
                        <input type="radio" name = "answer3" value="No" onChange={this.answerSelected}/>No
                        <input type="radio" name = "answer3" value="Maybe" onChange={this.answerSelected}/>Maybe
                    </div>
                    <input className="feedback-button" type="submit" value = "submit"  />
                </form>
            </div>;


        }
        else 
        {
            studentName = <h1>Thanks, {this.state.studentName}</h1>;
        }

    //    throw new Error('Something went terribly worng inside this render');
        return (
            <div>
            {studentName}
            ---------------------------------
            {questions}
            </div>

        )


    }
}
