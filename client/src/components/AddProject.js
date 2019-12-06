import React, { useState, useEffect } from 'react';
import axios from 'axios';

const defaultProject = {
    name: "",
    description: "",
}

function AddProject(props) {
    const [newProject, setNewProject] = useState(defaultProject);

    const changeHandler = e => {
        e.preventDefault();
        setNewProject({...newProject, [e.target.name]: e.target.value})
    }

    const submitProject = e => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/projects', newProject)
        .then(props.history.push('/'))
        .catch(err => {
            console.log(err);
        })
        setNewProject(defaultProject);
    }

    return (
        <div>
            <h1>Add a project!</h1>
            <form onSubmit={submitProject}>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" value={newProject.name} onChange={changeHandler}></input>
                <br />
                <label htmlFor="description">Description: </label>
                <textarea type="text" name="description" value={newProject.description} onChange={changeHandler}></textarea>
                <br />
                <button type="submit">Submit Project</button>
            </form>
        </div>
    );
}

export default AddProject;
