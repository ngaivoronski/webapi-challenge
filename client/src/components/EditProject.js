import React, { useState, useEffect } from 'react';
import axios from 'axios';

const defaultProject = {
    name: "",
    description: "",
}

function EditProject(props) {
    const [editProject, setEditProject] = useState(defaultProject);
    
    useEffect(() => {
        axios.get(`http://localhost:4000/api/projects/${props.match.params.id}`)
        .then(res => {
            setEditProject({
                name: res.data.name,
                description: res.data.description
            });
        })
        .catch(err => {
            console.log(err);
        })
    },[]);

    const changeHandler = e => {
        e.preventDefault();
        setEditProject({...editProject, [e.target.name]: e.target.value})
    }

    const submitEdits = e => {
        e.preventDefault();
        axios.put(`http://localhost:4000/api/projects/${props.match.params.id}`, editProject)
        .then(props.history.push(`/projects/${props.match.params.id}`))
        .catch(err => {
            console.log(err);
        })
        setEditProject(defaultProject);
    }

    return (
        <div>
            <h1>Add a project!</h1>
            <form onSubmit={submitEdits}>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" value={editProject.name} onChange={changeHandler}></input>
                <br />
                <label htmlFor="description">Description: </label>
                <textarea type="text" name="description" value={editProject.description} onChange={changeHandler}></textarea>
                <br />
                <button type="submit">Submit Edits</button>
            </form>
        </div>
    );
}

export default EditProject;
