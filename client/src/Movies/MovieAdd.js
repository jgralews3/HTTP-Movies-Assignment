import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialValue = {
    title: "",
    director: "",
    metascore: "",
    stars: []
}

function AddMovie(){
    const {push} = useHistory();
    const [newMovie, setNewMovie] = useState(initialValue)

    const changeHandler = e => {
        if(e.target.name === "stars"){
            setNewMovie({...newMovie, [e.target.name]: e.target.value.split(', ')})
        } else{
        setNewMovie({...newMovie, [e.target.name]: e.target.value});
        }
        console.log(newMovie)
    }

    const postMovie = (e) => {
        axios.post(`http://localhost:5000/api/movies`, newMovie)
        .then(()=>push(`/`))
        .catch(err=>console.log("post error:", err))
    }

    return (<div>
        <h2>Add New Movie to List</h2>
        <form onSubmit={postMovie}>
                <label>Movie Name: <input name="title" placeholder="Movie Name" onChange={changeHandler}></input></label>
                <label>Director: <input name="director" placeholder="Director" onChange={changeHandler}></input></label>
                <label>MetaScore: <input name="metascore" placeholder="Metascore" onChange={changeHandler}></input></label>
                <label>Starring: <input name="stars" placeholder="Stars" onChange={changeHandler}></input></label>
                <button>Add Movie</button>
            </form>

    </div>)
}

export default AddMovie;