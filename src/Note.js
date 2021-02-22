import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

    differentBgColor = () => {
        switch (this.props.order % 5) {
            case 1:
                return "green";
            case 2:
                return "indigo";
            case 3:
                return "yellow";
            case 4:
                return "red";
            case 0:
                return "blue";
        }
    };

    render() {
        return (
            <div
                className={"note bg-" + this.differentBgColor() + "-200"}
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
                <div className="flex justify-end">
                    <NoteDate
                        id={this.props.id}
                        onChange={this.handleDateChange}
                        onRemove={this.handleDateRemoval}
                        date={this.props.date}
                        newNote={false}
                    />
                    <button className="ml-2" onClick={this.handleRemoveClick}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>
            </div>
        );
    }
}
