import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const initialValue = {
    title: "",
    director: "",
    metascore: "",
    stars: []
}

function MovieUpdate(props) {
    const {push} = useHistory();
    const {id} = useParams();
    const [update, setUpdate] = useState(initialValue)

    useEffect (()=>
        {axios.get(`http://localhost:5000/api/movies/${id}`)
            .then (res=> {setUpdate(res.data)})
            .catch(err=> console.log("error: ", err))
        }, [id]
    )

    const changeHandler = e => {
        setUpdate({...update, [e.target.name]: e.target.value});
        console.log(update)
    }

    const putUpdate = e => {
        e.preventDefault();
        axios.put (`http://localhost:5000/api/movies/${id}`, update)
        .then(res=>{props.setMovieList(res);
        push(`/movies/${id}`)})
        .catch(err=>console.log(err))
    }

    console.log(update)

    return (
        <div>
            <form onSubmit={putUpdate}>
                <label>Movie Name: <input name="title" placeholder="Movie Name" value={update.title} onChange={changeHandler}></input></label>
                <label>Director: <input name="director" placeholder="Director" value={update.director} onChange={changeHandler}></input></label>
                <label>MetaScore: <input name="metascore" placeholder="Metascore" value={update.metascore} onChange={changeHandler}></input></label>
                <label>Starring: <input name="stars" placeholder="Stars" value={update.stars} onChange={changeHandler}></input></label>
                <button> Submit Changes</button>
            </form>
        </div>
    )
}

export default MovieUpdate;