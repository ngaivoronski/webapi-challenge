import React, { useState, useEffect } from 'react';
import axios from 'axios';

const defaultAction = {
    description: "",
    notes: ""
}

function AddAction(props) {
    const [newAction, setNewAction] = useState(defaultAction);

    const changeHandler = e => {
        e.preventDefault();
        setNewAction({...newAction, [e.target.name]: e.target.value})
    }

    const submitAction = e => {
        e.preventDefault();
        axios.post(`http://localhost:4000/api/projects/${props.match.params.id}/actions`, newAction)
        .then(props.history.push(`/projects/${props.match.params.id}`))
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <h1>Add a Action!</h1>
            <form onSubmit={submitAction}>
                <label htmlFor="decription">Description: </label>
                <input type="text" name="description" value={newAction.description} onChange={changeHandler}></input>
                <br />
                <label htmlFor="notes">Notes: </label>
                <textarea type="text" name="notes" value={newAction.notes} onChange={changeHandler}></textarea>
                <br />
                <button type="submit">Submit Action</button>
            </form>
        </div>
    );
}

export default AddAction;
