import {
    faCalendarAlt,
    faCalendarPlus,
    faCalendarTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, formatRelative } from "date-fns";
import { nlBE } from "date-fns/locale";
import React, { Component } from "react";
import "./Input.css";

const formatRelativeLocale = {
    lastWeek: "'Vorige' eeee",
    yesterday: "'Gisteren'",
    today: "'Vandaag'",
    tomorrow: "'Morgen'",
    nextWeek: "'Volgende' eeee",
    other: "dd.MM.yyyy",
};

const locale = {
    ...nlBE,
    formatRelative: (token) => formatRelativeLocale[token],
};

export default class NoteDate extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.date
            ? {
                  date: "",
                  dateAdded: this.props.date.length ? true : false,
              }
            : {
                  date: "",
                  dateAdded: false,
              };
    }

    handleChange = (e) => {
        this.setState(
            {
                date: e.currentTarget.value,
                dateAdded: true,
            },
            () => {
                if (!this.props.isNewNote) {
                    this.props.onChange(this.state.date);
                }
            }
        );
    };

    handleClick = () => {
        this.setState({
            dateAdded: false,
        });
        if (this.props.isNewNote) {
            this.setState({
                date: "",
            });
        } else {
            this.props.onRemove();
        }
    };

    dateFormatted(isNewNote) {
        if (isNewNote) {
            return this.state.date
                ? format(new Date(this.state.date), "d MMMM yyyy", {
                      locale: nlBE,
                  })
                : "";
        } else {
            return this.props.date
                ? formatRelative(new Date(this.props.date), new Date(), {
                      locale: locale,
                  })
                : "";
        }
    }

    render() {
        return (
            <div className="flex justify-end">
                <span className="mr-1">
                    {this.dateFormatted(this.props.isNewNote)}
                </span>
                <div className="date-input mx-1">
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
                    <button className="ml-1" onClick={this.handleClick}>
                        <FontAwesomeIcon icon={faCalendarTimes} />
                    </button>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
