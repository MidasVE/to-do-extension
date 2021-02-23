import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

export default class ClearNotes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            btnClicked: false,
        };
    }

    handleMouseDown = () => {
        this.setState({
            btnClicked: true,
        });
    };

    handleMouseUp = () => {
        this.setState({
            btnClicked: false,
        });
    };

    handleClick = () => {
        this.props.onChange();
    };

    render() {
        return (
            <div>
                <button
                    className={
                        "m-4 px-4 py-2 bg-indigo-400 rounded-full shadow text-white transition-transform" +
                        (this.state.btnClicked ? " pressed" : "")
                    }
                    onClick={this.handleClick}
                    type="reset"
                    ref={this.btn}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                >
                    <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                    Verwijder alle to-do&apos;s
                </button>
            </div>
        );
    }
}
