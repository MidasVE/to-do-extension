import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import NoteDate from "./NoteDate";

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
        if (e.target.type === "date") {
            this.setState({
                date: e.target.value,
            });
        } else {
            this.setState({
                text: e.target.value,
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
            <form className="note w-60 m-4 bg-red-200">
                <TextareaAutosize
                    placeholder="+ Voeg to-do toe"
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.text}
                    spellCheck="false"
                />
                <div className="flex justify-end items-center flex-wrap">
                    <span className="text-red-500 w-full text-center">
                        {this.state.error}
                    </span>
                    <div className="my-2 w-full flex justify-end">
                        <NoteDate
                            isNewNote={true}
                            onChange={this.handleDateChange}
                            onRemove={this.handleDateRemoval}
                            date={""}
                        />
                    </div>
                    <button onClick={this.handleSubmit} className="ml-1">
                        <FontAwesomeIcon icon={faPlus} size="2x" />
                    </button>
                </div>
            </form>
        );
    }
}
