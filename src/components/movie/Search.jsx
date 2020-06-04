import React, {Component} from 'react'
import {MOVIE_SEARCH_RESULTS} from "../common/Constants";
import {withRouter} from 'react-router-dom';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchString: null
        }
    }

    setSearchString(e) {
        this.setState({searchString: e.target.value});

    }

    search() {
        const url = "https://api.themoviedb.org/3/search/movie?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US&page=1&include_adult=false&query=" + this.state.searchString;

        fetch(url)
            .then(response => {
                return response.json();

            }).then(results => {
            this.props.resultsHook(results.results);
            this.props.history.push(MOVIE_SEARCH_RESULTS);
        })
            .catch(error => {
                console.error("Error while searching for movies ", error);
            })
    }

    render() {
        return (
            <div className="inline">
                    <input type="text" placeholder="Search" onKeyUp={this.setSearchString.bind(this)}
                           background-color="white" color="#34eb4f" border-radius="40px"/>

                    <img src="images/magnifying-glass-3-xxl.png" width="20px" height="20px" align="right"
                         onClick={this.search.bind(this)} alt="search-button" float="right"/>
            </div>

        );
    }

}

export default withRouter(Search)


