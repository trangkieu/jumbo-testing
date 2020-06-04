import Grid from "../common/Grid";
import React from "react";
import Search from "./Search";

export const PopularMovies = ({popularMovies, detailsHook, resultsHook, errorHook}) => {
    const popularMoviesDisplay = popularMovies !== null ?
        <Grid items={popularMovies} maxDisplay={6}
              detailsHook={detailsHook}
              errorHook={errorHook}
        /> : <div/>;

    return (
        <div>
            <Search resultsHook={resultsHook} errorHook={errorHook}/>
            <div id="popular-movies" >Popular Movies</div>
            <div>
                {popularMoviesDisplay}
            </div>
        </div>
    )
}