import React, {Component} from 'react';
import moment from "moment";
import {withRouter} from "react-router-dom";
import {MOVIE_DETAILS} from './Constants';

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
                this.props.errorHook("error while fetching movie details" + error);
            });

    }

    render() {
        let releaseDate = new Date(moment(this.props.item.release_date, "YYYY-MM-DD"));
        let monthName = moment(releaseDate).format('MMMM');
        return (

            <div id="eachMovie" onClick={() => this.getMovieDetails(this.props.item)}>
                <div className="listing-img-wrapper">
                    <img src={'http://image.tmdb.org/t/p/original' + this.props.item.poster_path}
                         alt={this.props.item.title}/>
                </div>
                <div className="xlarge-font">{this.props.item.title}</div>
                <div>{monthName} {releaseDate.getFullYear()}</div>
            </div>

        );
    }

}


export default withRouter(Single);