import Grid from "./Grid";
import React from "react";
import Search from "./Search";

export const PopularMovies = ({popularMovies, detailsHook, resultsHook}) => {
    const popularMoviesDisplay = popularMovies !== null ?
        <Grid items={popularMovies} maxDisplay={6}
              detailsHook={detailsHook}
        /> : <div/>;

    return (
        <div>
            <Search resultsHook={resultsHook}/>
            <div id="popular-movies" >Popular Movies</div>
            <div>
                {popularMoviesDisplay}
            </div>
        </div>
    )
}