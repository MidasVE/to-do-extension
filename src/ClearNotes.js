import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

export default class ClearNotes extends Component {
    handleClick = () => {
        this.props.onChange();
    };

    render() {
        return (
            <div>
                <button onClick={this.handleClick} type="reset">
                    <FontAwesomeIcon icon={faTrashAlt} />
                    Verwijder alle to-do&apos;s
                </button>
            </div>
        );
    }
}
