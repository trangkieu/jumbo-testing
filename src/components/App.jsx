import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './App.css';
import {PopularMovies} from './movie/PopularMovies';
import {MovieDetails} from './movie/MovieDetails';
import {HOME, MOVIE_DETAILS, MOVIE_SEARCH_RESULTS} from './common/Constants';
import SearchResults from "./movie/SearchResults";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popularMovies: null,
            selectedItem: null,
            searchResults: null,
            error: null
        }
    }

    componentDidMount() {

        fetch('https://api.themoviedb.org/3/movie/popular?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US')
            .then(response => response.json())
            .then(data => {
                // sort by vote average to get the popular scores
                let movieResults = data.results.sort((a,b) => (a.vote_average < b.vote_average) ? 1 : ((b.vote_average < a.vote_average) ? -1 : 0));

                console.log("movieResults ------------------------", movieResults);
                this.setState({popularMovies: movieResults});

            }).catch(error => {
            this.props.errorHook("error while fetching popular movies" + error);

        });
    }

    setSelectedDetails(movieDetails) {
        this.setState({
            selectedItem: movieDetails
        });
    }

    setSearchResults(searchResults) {
        this.setState({
            searchResults
        })
    }

    setErrorMessage(error) {
        this.setState({error});
    }


    render() {

        return (
            <BrowserRouter>
                <div>
                    <div className="logo-header">
                        <div className="green-deco1">test 1</div>
                        <div className="logo float-right">
                            <img className="logo-image" src="images/green-logo.svg" alt="logo"/>
                        </div>
                        <div className="green-deco2">test 2</div>
                    </div>
                    <div className="inline errorMessage">
                        {this.state.error}
                    </div>


                    <div className="container">
                        <Switch>

                            <Route exact path={HOME}
                                   render={() =>
                                       <PopularMovies popularMovies={this.state.popularMovies}
                                                      detailsHook={this.setSelectedDetails.bind(this)}
                                                      resultsHook={this.setSearchResults.bind(this)}
                                                      errorHook={this.setErrorMessage.bind(this)}

                                       />}
                            />

                            <Route path={MOVIE_DETAILS}
                                   render={() =>
                                       <MovieDetails details={this.state.selectedItem}
                                                     errorHook={this.setErrorMessage.bind(this)}

                                       />}
                            />


                            <Route path={MOVIE_SEARCH_RESULTS}
                                   render={() => <SearchResults results={this.state.searchResults}
                                                                detailsHook={this.setSelectedDetails.bind(this)}
                                                                errorHook={this.setErrorMessage.bind(this)}

                                   />}
                            />
                        </Switch>
                    </div>


                </div>

            </BrowserRouter>

        );
    }
}

