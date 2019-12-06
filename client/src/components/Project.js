import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList(props) {
    const [project, setProject] = useState({});
    // const [comments, setComments] = useState([]);
    // const [editing, setEditing] = useState(false);
    // const [editValue, setEditValue] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:4000/api/projects/${props.match.params.id}`)
        .then(res => {
            setProject(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    },[]);

    // const deletePost = () => {
    //     axios.delete(`http://localhost:5000/api/posts/${props.match.params.id}`)
    //     .then(props.history.push('/'))
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }

    // const editPost = () => {
    //     if (!editing) {
    //         setEditing(true);
    //         setEditValue({
    //             title: post.title,
    //             contents: post.contents,
    //         })
    //     } else {
    //         setEditing(false);
    //         axios.put(`http://localhost:5000/api/posts/${props.match.params.id}`, editValue)
    //         .then(res => {
    //             setPost(res.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //     }
    // }

    // const editChange = e => {
    //     e.preventDefault();
    //     setEditValue({...editValue, [e.target.name]: e.target.value});
    // }

    const editProject = () => {
        console.log(project.actions);
    }

    const deleteProject = () => {
        console.log("delete!");
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
                    <p>Status: {project.completed ? "Completed" : "Open"}</p>
                </div>
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
                <button>Add Action</button>
                {/* onClick={() => props.history.push(`/posts/${props.match.params.id}/addcomment`)} */}
            </div>
        );
    }

    

    
}

export default PostList;
