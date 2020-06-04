import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import Grid from "../common/Grid";


class SearchResults extends Component{


    render() {
       if (this.props.results !== null) {

           return (
               <Grid items={this.props.results} maxDisplay={this.props.results.length}
                     detailsHook={this.props.detailsHook}
               />
           );
       } else {
           return <div>return nothing</div>
       }
    }

}

export default withRouter(SearchResults)


