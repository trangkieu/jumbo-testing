import React, {Component} from 'react';
import Single from './Single';

export default class Grid extends Component {
    renderList() {
        let displayItems = this.props.items;
        return displayItems.slice(0, this.props.maxDisplay).map((item) => (
            <Single key={item.id} item={item} detailsHook={this.props.detailsHook} errorHook={this.props.errorHook}
            />
        ));
    }


    render() {
        return (
            <section className="listing">
                {this.renderList()}
            </section>
        )
    }
}
