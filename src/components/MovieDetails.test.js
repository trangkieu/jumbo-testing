import renderer from "react-test-renderer";
import {MovieDetails} from "./listings/MovieDetails";
import mockMovieDetails from "../data/movieDetails";
import React from "react";

describe('Movie details', () => {

    const component = renderer.create(<MovieDetails details={mockMovieDetails}/>);
    test('snapshot renders', () => {
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    // verify image urls
    const images = component.root.findAllByType('img');
    let backdropImageCount = 0;
    let posterImageCount = 0;
    images.map(img => {
        it('backdrop image ', () => {
            if (img.props.id === "backdropImg") {
                expect(img.props.src).toEqual('http://image.tmdb.org/t/p/original' + '/93xA62uLd5CwMOAs37eQ7vPc1iV.jpg');
                backdropImageCount++;
            }

        })
        it('poster image ', () => {
            if (img.props.id === "posterImg") {
                expect(img.props.src).toEqual('http://image.tmdb.org/t/p/original' + '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg');
                posterImageCount++;
            }
        })
    });
    it('backdrop image counts', () => {
        expect(backdropImageCount).toEqual(1);
    });
    it('poster image counts', () => {
        expect(posterImageCount).toEqual(1);
    });

    //verify other text data
    const divs = component.root.findAllByType('div');
    let yearReleaseCount = 0;
    let votePercentageCount = 0;
    let runtimeCount = 0;

    it('year release details', () =>{
        divs.map( d => {
            if (d.props.id === 'yearRelease') {
                expect(d.props.children).toEqual(2018);
                yearReleaseCount++;
            }
            if(d.props.id === 'votePercentage') {
                expect(d.props.children.toString().replace(/,/g,'')).toEqual("80% User Score");
                votePercentageCount++;
            }
            if(d.props.id === 'runtime') {
                expect(d.props.children.toString().replace(/,/g,'')).toEqual("2hr 15min");
                runtimeCount++;
            }
            if(d.props.id === 'movieDescriptions') {
                const descriptions = d.props.children;
                const titleChild = descriptions.props.children[0];
                const overviewChild = descriptions.props.children[1];
                it('movie title ', () => {
                    expect(titleChild.props.children.toString().replace(/,/g,'')).toEqual("Bohemian Rhapsody");

                });
                it('movie overiew', () => {
                    expect(overviewChild.props.children.toString().replace(/,/g,'')).toEqual("Singer Freddie Mercury guitarist Brian May drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.");

                })
            }

        })
    })

    it('year release count ', () => {
        expect(yearReleaseCount).toEqual(1);
    })
    it('vote percentage count ', () => {
        expect(votePercentageCount).toEqual(1);
    })
    it('runtime percentage count ', () => {
        expect(runtimeCount).toEqual(1);
    })
});