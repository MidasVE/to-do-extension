import React, { Component } from "react";

export default class NoteDate extends Component {
    removeButton;

    constructor(props) {
        super(props);

        this.state = {
            date: "",
        };

        if (this.props.date.length) {
            this.removeButton = (
                <button onClick={this.handleClick}>Verwijder einddatum</button>
            );
        }
    }

    handleChange = (e) => {
        this.removeButton = (
            <button onClick={this.handleClick}>Verwijder einddatum</button>
        );
        this.setState(
            {
                date: e.currentTarget.value,
            },
            () => {
                this.props.onChange(this.state.date);
            }
        );
    };

    handleClick = () => {
        this.props.onRemove();
    };

    render() {
        return (
            <div>
                {this.props.date}
                <input
                    type="date"
                    value={this.state.date}
                    onChange={this.handleChange}
                />
                {this.removeButton}
            </div>
        );
    }
}
