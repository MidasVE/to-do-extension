import React, { Component } from "react";

export default class NoteDate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: "",
            showRemoveButton: this.props.date.length ? true : false,
        };
    }

    handleChange = (e) => {
        this.setState(
            {
                date: e.currentTarget.value,
                showRemoveButton: true,
            },
            () => {
                this.props.onChange(this.state.date);
            }
        );
    };

    handleClick = () => {
        this.setState({
            showRemoveButton: false,
        });
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
                {this.state.showRemoveButton ? (
                    <button onClick={this.handleClick}>
                        Verwijder einddatum
                    </button>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
