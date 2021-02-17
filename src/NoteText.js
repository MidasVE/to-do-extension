import React, { Component } from "react";

export default class NoteText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.text,
            elementType: "div",
        };

        this.textInput = React.createRef();

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.submit = this.submit.bind(this);
    }

    handleClick() {
        this.setState(
            {
                elementType: "input",
            },
            () => {
                this.textInput.current.focus();
            }
        );

        this.props.onChange(false);
    }

    handleChange(e) {
        this.setState({
            text: e.target.value,
        });
    }

    handleSubmit(e) {
        if (e.key === "Enter") {
            this.submit();
        }

        if (e.type === "blur") {
            this.submit();
        }
    }

    submit() {
        this.setState({
            elementType: "div",
        });

        this.props.onChange(true, this.state.text);
    }

    render() {
        return this.state.elementType === "div" ? (
            <div onClick={this.handleClick}>{this.state.text}</div>
        ) : (
            <input
                ref={this.textInput}
                onChange={this.handleChange}
                onKeyDown={this.handleSubmit}
                onBlur={this.handleSubmit}
                value={this.state.text}
            ></input>
        );
    }
}
