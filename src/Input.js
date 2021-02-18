import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

export default class Input extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            text: "",
            date: "",
            error: "",
        };
    }

    handleChange(e) {
        if (e.target.type === "text") {
            this.setState({
                text: e.target.value,
            });
        } else {
            this.setState({
                date: e.target.value,
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text !== "") {
            this.setState({ error: "" });
            this.props.onChange({
                text: this.state.text,
                date: this.state.date,
            });
            this.setState({
                text: "",
                date: "",
            });
        } else {
            this.setState({ error: "Vul een to do in." });
        }
    }

    render() {
        return (
            <form>
                <input
                    placeholder="Voeg hier to-do toe"
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.text}
                />
                <div className="date-input">
                    <label htmlFor="dateInputGeneral">
                        <FontAwesomeIcon icon={faCalendarPlus} />
                    </label>
                    <input
                        id="dateInputGeneral"
                        onChange={this.handleChange}
                        type="date"
                        value={this.state.date}
                    />
                </div>
                <span className="error">{this.state.error}</span>
                <button onClick={this.handleSubmit}>Voeg to-do toe</button>
            </form>
        );
    }
}
