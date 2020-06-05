import React, {Component} from 'react'
import {MOVIE_SEARCH_RESULTS} from "../common/Constants";
import {withRouter} from 'react-router-dom';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchString: null,
        }
    }

    setSearchString(e) {
        if (e.keyCode === 13) { // enter key goes straight to search
            this.search();
        } else {
            this.setState({searchString: e.target.value});
        }

    }

    search() {
        if (this.state.searchString === null || this.state.searchString === '') {
            this.props.errorHook('Please enter a search string');
        } else {

            const url = "https://api.themoviedb.org/3/search/movie?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US&page=1&include_adult=false&query=" + this.state.searchString;

            fetch(url)
                .then(response => {
                    return response.json();

                }).then(results => {
                this.props.resultsHook(results.results);
                this.props.history.push(MOVIE_SEARCH_RESULTS);
            })
                .catch(error => {
                    this.props.errorHook('Error while searching for movies: ' + error);
                })
        }
    }

    render() {
        return (
            <div className="search-input">
                <input type="text" placeholder="Search" onKeyUp={this.setSearchString.bind(this)} width="400px"
                       height="50px"/> &nbsp;

                <img src="images/magnifying-glass-3-xxl.png" width="20px" height="20px" alt="search-button"
                     onClick={this.search.bind(this)}/>

            </div>

        );
    }
}

export default withRouter(Search)


