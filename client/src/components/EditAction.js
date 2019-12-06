import React, { useState, useEffect } from 'react';
import axios from 'axios';

const defaultAction = {
    description: "",
    notes: ""
}

function EditAction(props) {
    const [editAction, setEditAction] = useState(defaultAction);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/projects/${props.match.params.id}/actions/${props.match.params.actionID}`)
        .then(res => {
            setEditAction({
                description: res.data.description,
                notes: res.data.notes
            });
        })
        .catch(err => {
            console.log(err);
        })
    },[]);

    const changeHandler = e => {
        e.preventDefault();
        setEditAction({...editAction, [e.target.name]: e.target.value})
    }

    const submitEdits = e => {
        e.preventDefault();
        axios.put(`http://localhost:4000/api/projects/${props.match.params.id}/actions/${props.match.params.actionID}`, editAction)
        .then(props.history.push(`/projects/${props.match.params.id}`))
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <h1>Edit an Action!</h1>
            <form onSubmit={submitEdits}>
                <label htmlFor="decription">Description: </label>
                <input type="text" name="description" value={editAction.description} onChange={changeHandler}></input>
                <br />
                <label htmlFor="notes">Notes: </label>
                <textarea type="text" name="notes" value={editAction.notes} onChange={changeHandler}></textarea>
                <br />
                <button type="submit">Submit Action</button>
            </form>
        </div>
    );
}

export default EditAction;
