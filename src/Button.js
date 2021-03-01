import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

export default class Button extends Component {
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
            <div className={this.props.className}>
                <button
                    className={
                        "ml-4 px-4 py-2 bg-indigo-400 rounded-full shadow text-white transition-transform whitespace-nowrap" +
                        (this.state.btnClicked ? " pressed" : "")
                    }
                    onClick={this.handleClick}
                    ref={this.btn}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                >
                    <FontAwesomeIcon icon={this.props.icon} className="mr-2" />
                    {this.props.text}
                </button>
            </div>
        );
    }
}
