import React, { Component } from "react";

export default class Note extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    handleClick() {
        this.props.onChange("remove", this.props.id);
    }

    handleDrag() {
        this.props.onChange("drag", this.props.id);
    }

    handleDrop(e) {
        this.props.onChange("drop", e.currentTarget.id);
    }

    render() {
        return (
            <div
                draggable={true}
                id={this.props.id}
                onDragOver={(e) => e.preventDefault()}
                onDragStart={this.handleDrag}
                onDrop={this.handleDrop}
            >
                {this.props.text} {this.props.date}
                <button onClick={this.handleClick}>Verwijder to-do</button>
            </div>
        );
    }
}
