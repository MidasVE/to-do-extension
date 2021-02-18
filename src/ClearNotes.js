import React, { Component } from "react";

export default class ClearNotes extends Component {
    handleClick = () => {
        this.props.onChange();
    };

    render() {
        return (
            <div>
                <button onClick={this.handleClick} type="reset">
                    Verwijder alle to-do&apos;s
                </button>
            </div>
        );
    }
}
