import {
    faCalendarAlt,
    faCalendarPlus,
    faCalendarTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatRelative } from "date-fns";
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
                  date: this.props.date,
                  isExpired: new Date(this.props.date) <= Date.now(),
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
                isExpired: new Date(e.currentTarget.value) <= Date.now(),
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
            date: "",
        });
        this.props.onRemove();
    };

    dateFormatted() {
        return this.props.date
            ? formatRelative(new Date(this.props.date), new Date(), {
                  locale: locale,
              })
            : "";
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            return;
        }

        this.props.date
            ? this.setState({
                  date: this.props.date,
                  dateAdded: this.props.date.length ? true : false,
              })
            : this.setState({
                  date: "",
                  dateAdded: false,
              });
    }

    render() {
        return (
            <div className="flex justify-end">
                <span
                    className={
                        "mr-1" + (this.state.isExpired ? " text-red-500" : "")
                    }
                >
                    {this.dateFormatted()}
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
                {this.state.dateAdded && (
                    <button className="ml-1" onClick={this.handleClick}>
                        <FontAwesomeIcon icon={faCalendarTimes} />
                    </button>
                )}
            </div>
        );
    }
}
