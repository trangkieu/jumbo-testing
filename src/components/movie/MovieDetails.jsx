import React from "react";
import moment from "moment";

export const MovieDetails = ({details}) => {

    const releaseDate = new Date(moment(details.release_date, "YYYY-MM-DD"));
    const votePercentage = Number(details.vote_average).toFixed(2) * 10;
    const runTime = Number(details.runtime);
    const runTimeHour = Math.floor(runTime / 60);
    const runTimeMinutes = runTime % 60;
    return (

        <div>
            <div className="row">
                <div className="row__divide-2 about-additional-data">
                    <div className="card-image flow-text layer-20 bottom">
                        <img id="backdropImg" src={'http://image.tmdb.org/t/p/original' + details.backdrop_path}
                             alt="backdrop"/>
                    </div>
                    <div className="card-image flow-text layer-10">
                        <img id="posterImg" src={'http://image.tmdb.org/t/p/original' + details.poster_path}
                             alt="poster"/>
                    </div>
                    <div className="card-image flow-text layer-20 bottom">
                        <div id="yearRelease">
                            {releaseDate.getFullYear()}
                        </div>
                        <div id="votePercentage">
                            {votePercentage}% User Score
                        </div>
                        <div id="runtime">
                            {runTimeHour}hr {runTimeMinutes}min
                        </div>
                    </div>

                    {/*<div id="poster-img">*/}
                    {/*    <img src={'http://image.tmdb.org/t/p/original' + details.poster_path}*/}
                    {/*         alt="poster"/>*/}
                    {/*</div>*/}
                    {/*<div id="backdrop-img">*/}
                    {/*    <img src={'http://image.tmdb.org/t/p/original' + details.backdrop_path}*/}
                    {/*         alt="backdrop"/>*/}
                    {/*</div>*/}

                    <div id="movieDescriptions" className="row__divide-2__col-1 layer-30">
                        <div>
                            <h2>{details.title}</h2>
                            <p>{details.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}