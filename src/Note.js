import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import AnimateHeight from "react-animate-height";
import NoteDate from "./NoteDate";
import NoteText from "./NoteText";

export default class Note extends Component {
    constructor(props) {
        super(props);

        this.state = {
            draggable: true,
            height: 0,
        };
    }

    handleRemoveClick = () => {
        if (this.props.last) {
            this.setState({
                height: 0,
            });
        } else {
            this.setState({
                width: 0,
                opacity: 0,
                margin: 0,
            });
        }

        setTimeout(() => {
            this.props.onChange("remove", this.props.id);
        }, 150);
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

    componentDidMount() {
        this.setState({
            height: "auto",
        });
    }

    render() {
        return (
            <AnimateHeight
                height={this.state.height}
                duration={150}
                style={{
                    width: this.state.width,
                    opacity: this.state.opacity,
                    margin: this.state.margin,
                }}
                className="m-4 w-72 transition-all"
            >
                <div className="bg-red-200 bg-blue-200 bg-yellow-200 bg-green-200 bg-indigo-200 hidden"></div>
                <div
                    className={"note bg-" + this.props.backgroundColor + "-200"}
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
                    {!this.props.isGrouped && this.props.category && (
                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white py-2 px-4 rounded-3xl shadow">
                            {this.props.category}
                        </span>
                    )}
                    <div className="flex justify-end">
                        <NoteDate
                            id={this.props.id}
                            onChange={this.handleDateChange}
                            onRemove={this.handleDateRemoval}
                            date={this.props.date}
                            newNote={false}
                        />
                        <button
                            className="ml-2"
                            onClick={this.handleRemoveClick}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                    </div>
                </div>
            </AnimateHeight>
        );
    }
}
