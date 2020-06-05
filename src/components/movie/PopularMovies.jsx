import Grid from "../common/Grid";
import React from "react";
import Search from "./Search";

export const PopularMovies = ({popularMovies, detailsHook, resultsHook, errorHook}) => {
    console.log("popular movies....");
    const popularMoviesDisplay = popularMovies !== null ?
        <Grid items={popularMovies} maxDisplay={popularMovies.length}
              detailsHook={detailsHook}
              errorHook={errorHook}
        /> : <div/>;

    return (
        <div>
            <Search resultsHook={resultsHook} errorHook={errorHook}/>
            <div id="popular-movies" className="title-heading">Popular Movies</div>
            <div>
                {popularMoviesDisplay}
            </div>
        </div>
    )
}