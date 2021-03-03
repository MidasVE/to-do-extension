import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ls from "local-storage";
import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import CategoryInput from "./CategoryInput";
import NoteDate from "./NoteDate";

export default class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            date: "",
            error: "",
            category: "",
            categories: ls.get("categories") || [],
        };
    }

    handleTextChange = (e) => {
        this.setState({
            text: e.target.value,
        });
    };

    handleDateChange = (date) => {
        this.setState({
            date: date,
        });
    };

    handleDateRemoval = () => {
        this.setState({
            date: "",
        });
    };

    handleCategoryChange = (category) => {
        this.setState({
            category: category,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.text !== "") {
            this.setState({ error: "" });
            this.props.onChange({
                text: this.state.text,
                date: this.state.date,
                category: this.capitalizeFirstLetter(this.state.category),
            });
            this.setState({
                text: "",
                date: "",
                category: "",
            });
        } else {
            this.setState({ error: "Vul een to do in." });
        }
    };

    capitalizeFirstLetter = (string) => {
        return (
            string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
        ).trim();
    };

    componentDidUpdate() {
        if (this.props.updatedCategories) {
            this.setState({
                categories: ls.get("categories") || [],
            });
        }
    }

    render() {
        return (
            <form className="note w-72 m-4 bg-red-200">
                <TextareaAutosize
                    placeholder="+ Voeg to-do toe"
                    onChange={this.handleTextChange}
                    type="text"
                    value={this.state.text}
                    spellCheck="false"
                />
                <CategoryInput
                    category={this.state.category}
                    categories={this.state.categories}
                    onChange={this.handleCategoryChange}
                ></CategoryInput>
                <div className="flex justify-end items-center flex-wrap">
                    <div className="my-2 w-full flex justify-end">
                        <NoteDate
                            isNewNote={true}
                            onChange={this.handleDateChange}
                            onRemove={this.handleDateRemoval}
                            date={this.state.date}
                        />
                    </div>
                    <span className="text-red-500 mr-2">
                        {this.state.error}
                    </span>
                    <button onClick={this.handleSubmit} className="ml-1">
                        <FontAwesomeIcon icon={faPlus} size="2x" />
                    </button>
                </div>
            </form>
        );
    }
}
