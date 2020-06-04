import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

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
            searchResults: null
        }
    }

    componentDidMount() {

        fetch('https://api.themoviedb.org/3/movie/popular?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US')
            .then(response => response.json())
            .then(data => {
                // let movieResults = data.results.sort((a,b) => (a.popularity < b.popularity) ? 1 : ((b.popularity < a.popularity) ? -1 : 0));
                let movieResults = data.results; // it's already sort in popularity

                this.setState({popularMovies: movieResults});

            }).catch(error => {
            console.error("error while fetching popular movies", error);

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


    render() {

        return (
            <BrowserRouter>
                <div>
                    <div className="container">
                        <div className="green-deco1">test 1</div>
                        <div className="logo float-right">
                            <img className="logo-image" src="images/green-logo.svg" alt="logo"/>
                        </div>
                        <div className="green-deco2">test 2</div>
                    </div>


                    <div className="container">
                        <Switch>

                            <Route exact path={HOME}
                                   render={() => <PopularMovies popularMovies={this.state.popularMovies}
                                                                detailsHook={this.setSelectedDetails.bind(this)}
                                                                resultsHook={this.setSearchResults.bind(this)}/>}
                            />

                            <Route path={MOVIE_DETAILS}
                                   render={() => <MovieDetails details={this.state.selectedItem}/>}
                            />


                            <Route path={MOVIE_SEARCH_RESULTS}
                                   render={() => <SearchResults results={this.state.searchResults}
                                                                detailsHook={this.setSelectedDetails.bind(this)}/>}
                            />
                        </Switch>
                    </div>


                </div>

            </BrowserRouter>

        );
    }
}

