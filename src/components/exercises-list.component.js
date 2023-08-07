/*this file has two components : Exercise (implemented as a functional react component) and ExercisesList (class component)
difference between functional react component and class component is that 
is the lack of state and lifecycle methods in functional components. 
i.e if only to use for accepting props and return datasets -> use functional components instead of class*/


import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
  )
  

export default class ExercisesList extends Component{
    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = { exercises:[]};

    }
    componentDidMount(){
        axios.get('http://localhost:5000/exercises/')
        .then(response=>{
            this.setState({ exercises: response.data});
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    deleteExercise(id) {  //takes object id to be deleted
        axios.delete('http://localhost:5000/exercises/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          exercises: this.state.exercises.filter(el => el._id !== id)
        })
      } //db will also have to delete that particular entry; react makes it easy; it will auto update the page with that new state. 
    //we use 'filter', we are only going to return el if el.id!= id 
    //means: if the existing id in the db != id we are deleting then pass it back to the exercises array. 

      exerciseList() {
        return this.state.exercises.map(currentexercise => {
          return <Exercise /*<-Exercise is a component*/ exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
      }



    render(){
        return (
    <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() } 
          </tbody>
        </table>
      </div>
    )
    }
}