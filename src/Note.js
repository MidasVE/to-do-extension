import React, { Component } from "react";

export default class Note extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChange(this.props.id);
    }

    render() {
        return (
            <div>
                {this.props.text} {this.props.date}
                <button onClick={this.handleClick}>Verwijder to-do</button>
            </div>
        );
    }
}
