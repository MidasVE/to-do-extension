import React, { Component } from "react";
import TextareaAutoResize from "react-textarea-autosize";

export default class CategoryText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.text,
        };

        this.submit = this.submit.bind(this);
    }

    handleClick = () => {
        this.props.onChange(false);
    };

    handleChange = (e) => {
        this.setState({
            text: this.capitalizeFirstLetter(e.currentTarget.value),
        });
    };

    handleSubmit = (e) => {
        if (e.code === "Enter") {
            e.preventDefault();
            e.currentTarget.blur();
            this.submit();
        }

        if (e.type === "blur") {
            this.submit();
        }
    };

    submit = () => {
        this.props.onChange(this.props.text, this.state.text.trim());
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            return;
        }

        if (prevProps.text !== this.props.text) {
            this.setState({
                text: this.props.text,
            });
        }
    }

    render() {
        return (
            <TextareaAutoResize
                onChange={this.handleChange}
                onBlur={this.handleSubmit}
                onKeyDown={this.handleSubmit}
                value={this.state.text}
                spellCheck="false"
                cacheMeasurements={true}
                className="font-bold text-lg mt-4"
            />
        );
    }
}
