import React, { useState, useEffect } from 'react';
import { Route, Link } from "react-router-dom";
import axios from 'axios';
import './App.css';
import ProjectList from './components/ProjectList';
import Project from './components/Project';
import AddProject from './components/AddProject';
import AddAction from './components/AddAction';
import EditProject from './components/EditProject';
import EditAction from './components/EditAction';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/projects/')
    .then(res => {
      setProjects(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  },[]);

  return (
    <div className="App">
      <Route exact path="/" 
      render={props => {
        return <ProjectList {...props} projects={projects} />;
      }}
      />
      <Route
        exact path="/projects/:id"
        render={props => {
          return <Project {...props} />;
        }}
      />

      <Route exact path="/addproject" component={AddProject} />

      <Route
        exact path="/projects/:id/edit"
        render={props => {
          return <EditProject {...props} />;
        }}
      />
      
      <Route
        path="/projects/:id/addaction"
        render={props => {
          return <AddAction {...props} />;
        }}
      />

      <Route
        exact path="/projects/:id/:actionID/edit"
        render={props => {
          return <EditAction {...props} />;
        }}
      />
    </div>
  );
}

export default App;
