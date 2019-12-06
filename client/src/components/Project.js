import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList(props) {
    const [project, setProject] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:4000/api/projects/${props.match.params.id}`)
        .then(res => {
            setProject(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    },[]);

    const editProject = () => {
        props.history.push(`/projects/${props.match.params.id}/edit`)
    }

    const addAction = () => {
        props.history.push(`/projects/${props.match.params.id}/addaction`)
    }

    const deleteProject = () => {
        axios.delete(`http://localhost:4000/api/projects/${props.match.params.id}`)
        .then(props.history.push('/'))
        .catch(err => {
            console.log(err);
        })
    }

    const toggleProjectCompletion = () => {
        let editedProj = {
            name: project.name,
            description: project.description,
            completed: project.completed
        }

        if(project.completed === false) {
            setProject({...project, completed: true});
            editedProj.completed = true;
        } else {
            setProject({...project, completed: false});
            editedProj.completed = false;
        }

        axios.put(`http://localhost:4000/api/projects/${props.match.params.id}`, editedProj)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    if(!project.actions) {
        return(
            <div>Loading Data</div>
        )
    } else {
        return(
            <div>
                <h1>Project</h1>
                <div className="project-div">
                    <h4>{project.name}</h4>
                    <p>{project.description}</p>
                    <p onClick={toggleProjectCompletion}>Status: {project.completed ? "Completed" : "Open"}</p>
                </div><br />
                <button onClick={editProject}>Edit Project</button>
                <button onClick={deleteProject}>Delete Project</button>
                <h1>Actions</h1>
                {project.actions.map(action => {
                    return(
                        <div className="action-div">
                            <p><b>{action.description}</b></p>
                            <p>Notes: {action.notes}</p>
                            <p>Status: {action.completed ? "Completed" : "Open"}</p>
                        </div>
                    )
                })}
                <button onClick={addAction}>Add Action</button>
            </div>
        );
    }

    

    
}

export default PostList;
