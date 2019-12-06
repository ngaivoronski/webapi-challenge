import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectList(props) {


    return (
        <div>
        <h1>Projects</h1>
        <button onClick={() => props.history.push('/addproject')}>Add a Project!</button>
        {props.projects.map(project => {
            return(
            <div style={{'border':'1px solid black'}} onClick={() => props.history.push(`/projects/${project.id}`)}>
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <p>Status: {project.completed ? "Completed" : "Open"}</p>
            </div>
            )
        })}
        </div>
    );
}

export default ProjectList;
