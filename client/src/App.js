import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieUpdate from './Movies/MovieUpdate'
import MovieAdd from './Movies/MovieAdd'
import axios from 'axios';

const App = () => {

  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  console.log("app level movies:", movieList)

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setMovieList={setMovieList} />
      </Route>

      <Route path="/update-movie/:id">
        <MovieUpdate setMovieList={setMovieList}/>
      </Route>

      <Route path="/add-movie">
        <MovieAdd />
      </Route>
    </>
  );
};

export default App;
