import React, {Component} from 'react';
import moment from "moment";
import {withRouter} from "react-router-dom";
import {MOVIE_DETAILS} from '../Constants';
class Single extends Component {

    getMovieDetails(item) {
        let fetchUrl = 'https://api.themoviedb.org/3/movie/' + item.id + '?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US';

        fetch(fetchUrl)
            .then(response => response.json())
            .then(details => {
                this.props.detailsHook(details);
                this.props.history.push(MOVIE_DETAILS);

            })
            .catch(error => {
                console.error("error while fetching movie details", error);
            });

    }

    render() {
        let releaseDate = new Date(moment(this.props.item.release_date, "YYYY-MM-DD"));
        let monthName = moment(releaseDate).format('MMMM');
        return (
            <li className="col l6 s12">
                <div className="card card-image" onClick={() => this.getMovieDetails(this.props.item)}>
                    <div className="card-image">
                        <img src={'http://image.tmdb.org/t/p/original' + this.props.item.poster_path}
                             alt={this.props.item.title}/>
                    </div>
                    <div className="movie-title xlarge-font">{this.props.item.title}</div>
                    <div className="movie-title">{monthName} {releaseDate.getFullYear()}
                    </div>
                </div>
                <br/>
            </li>
        );
    }

}


export default withRouter(Single);