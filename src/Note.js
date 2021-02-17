import React, { Component } from "react";
import NoteDate from "./NoteDate";
import NoteText from "./NoteText";

export default class Note extends Component {
    constructor(props) {
        super(props);

        this.state = {
            draggable: true,
        };
    }

    handleRemoveClick = () => {
        this.props.onChange("remove", this.props.id);
    };

    handleDrag = () => {
        this.props.onChange("drag", this.props.id);
    };

    handleDrop = (e) => {
        this.props.onChange("drop", e.currentTarget.id);
    };

    handleTextChange = (draggable, text = "") => {
        this.setState({
            draggable: draggable ? true : false,
        });

        if (draggable) {
            this.props.onChange("text", this.props.id, text);
        }
    };

    handleDateChange = (date) => {
        this.props.onChange("date", this.props.id, date);
    };

    handleDateRemoval = () => {
        this.props.onChange("dateRemove", this.props.id);
    };

    render() {
        return (
            <div
                draggable={this.state.draggable}
                id={this.props.id}
                onDragOver={(e) => e.preventDefault()}
                onDragStart={this.handleDrag}
                onDrop={this.handleDrop}
            >
                <NoteText
                    onChange={this.handleTextChange}
                    text={this.props.text}
                />
                <NoteDate
                    onChange={this.handleDateChange}
                    onRemove={this.handleDateRemoval}
                    date={this.props.date}
                />
                <button onClick={this.handleRemoveClick}>
                    Verwijder to-do
                </button>
            </div>
        );
    }
}
