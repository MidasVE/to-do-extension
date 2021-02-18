import {
    faCalendarPlus,
    faCalendarTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import "./Input.css";

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
                <div className="date-input">
                    <label htmlFor={"dateInput" + this.props.id}>
                        <FontAwesomeIcon icon={faCalendarPlus} />
                    </label>
                    <input
                        id={"dateInput" + this.props.id}
                        type="date"
                        value={this.state.date}
                        onChange={this.handleChange}
                    />
                </div>
                {this.state.showRemoveButton ? (
                    <button onClick={this.handleClick}>
                        <FontAwesomeIcon icon={faCalendarTimes} />
                    </button>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
