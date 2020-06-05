import React from "react";
import moment from "moment";

export const MovieDetails = ({details}) => {

    const releaseDate = new Date(moment(details.release_date, "YYYY-MM-DD"));
    const votePercentage = Number(details.vote_average).toFixed(2) * 10;
    const runTime = Number(details.runtime);
    const runTimeHour = Math.floor(runTime / 60);
    const runTimeMinutes = runTime % 60;
    return (


        <div className="details">
            <div className="details-header">
                <div className="poster-details">
                    <img id="posterImg" src={'http://image.tmdb.org/t/p/original' + details.poster_path}
                         alt="poster"/>
                </div>
                <div className="details-section">
                    <div id="movie-title" className="movie-title">{details.title}</div>
                    <div id="rating" className="large-font">{releaseDate.getFullYear()} &#183; {votePercentage}% User Score</div>
                    <div id="runtime" className="large-font">{runTimeHour}hr {runTimeMinutes}min</div>
                </div>

                <div className="backdrop-details">
                    <img id="backdropImg" src={'http://image.tmdb.org/t/p/original' + details.backdrop_path}
                         alt="backdrop"/>
                </div>
            </div>
            <div className="overview">
                <div className="overview-title">Overview</div>
                <div id="movieDescriptions" className="overview-desc"><p>{details.overview}</p></div>

            </div>
        </div>

    )
}