import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// test file
import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import mockPopularMovies from "../data/popularMovies";
import mockMovieDetails from "../data/movieDetails";
import mockSearchMovies from "../data/search-movies";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
});

it("integration test ", () => {
    const mockFetchPromise = Promise.resolve({ // 3
        json: () => mockPopularMovies,
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const wrapper = mount(<App />); // 5

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://api.themoviedb.org/3/movie/popular?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US');

    process.nextTick(() => { // 6
        expect(wrapper.state().popularMovies).toEqual(mockPopularMovies.results);
        global.fetch.mockClear(); // 7


// test select details
        it('select first movie ', () => {
            const mockFetchMovieDetails = Promise.resolve({ // 3
                json: () => mockMovieDetails,
            });

            global.fetch = jest.fn().mockImplementation(() => mockFetchMovieDetails);

            const eachMovie = wrapper.find('#eachMovie');
            expect(eachMovie.length).toBe(4); // it finds it alright

            eachMovie[0].simulate('click');

            process.nextTick(() => { // 6
                expect(wrapper.state().selectedItem).toEqual(mockFetchMovieDetails);
                global.fetch.mockClear(); // 7

            });
        })

        // test search for movies
        it('search for a movie using the button', () => {
            const mockFetchSearchMovies = Promise.resolve({ // 3
                json: () => mockSearchMovies,
            });

            global.fetch = jest.fn().mockImplementation(() => mockFetchSearchMovies);

            const searchButton = wrapper.find('#searchImg');
            expect(searchButton.length).toBe(0); // it finds it alright

            searchButton[0].simulate('click');

            process.nextTick(() => { // 6
                expect(wrapper.state().searchResults).toEqual(mockFetchSearchMovies);
                global.fetch.mockClear(); // 7

            });
        })

    });


});


