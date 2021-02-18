import {
    faCalendarAlt,
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
            dateAdded: this.props.date.length ? true : false,
        };
    }

    handleChange = (e) => {
        this.setState(
            {
                date: e.currentTarget.value,
                dateAdded: true,
            },
            () => {
                this.props.onChange(this.state.date);
            }
        );
    };

    handleClick = () => {
        this.setState({
            dateAdded: false,
        });
        this.props.onRemove();
    };

    render() {
        return (
            <div>
                {this.props.date}
                <div className="date-input">
                    <label htmlFor={"dateInput" + this.props.id}>
                        {this.state.dateAdded ? (
                            <FontAwesomeIcon icon={faCalendarAlt} />
                        ) : (
                            <FontAwesomeIcon icon={faCalendarPlus} />
                        )}
                    </label>
                    <input
                        id={"dateInput" + this.props.id}
                        title={
                            this.state.dateAdded
                                ? "Verander einddatum"
                                : "Voeg einddatum toe"
                        }
                        type="date"
                        value={this.state.date}
                        onChange={this.handleChange}
                    />
                </div>
                {this.state.dateAdded ? (
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
