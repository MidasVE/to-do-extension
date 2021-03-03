import React, { Component } from "react";

export default class CategoryInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: this.props.category,
            categories: this.props.categories,
            shownCategories: [],
        };
    }

    handleCategoryChange = (e) => {
        e.preventDefault();

        let shownCategories = this.filterCategories(
            e.currentTarget.value,
            this.state.categories
        );

        if (e.type === "click") {
            shownCategories = [];
        }

        this.setState(
            {
                category: e.currentTarget.value,
                shownCategories:
                    shownCategories.length !== this.state.categories.length
                        ? shownCategories
                        : [],
            },
            () => {
                this.props.onChange(this.state.category);
            }
        );
    };

    filterCategories = (value, categories) => {
        return categories.filter((category) => {
            return category.name.toLowerCase().includes(value.toLowerCase());
        });
    };

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                category: this.props.category,
                categories: this.props.categories,
            });
        }
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    id="category"
                    value={this.state.category}
                    onChange={this.handleCategoryChange}
                    placeholder="+ Voeg categorie toe"
                    className="absolute -top-4 -right-4 text-white bg-gray-500 py-2 px-4 rounded-3xl shadow w-min"
                />
                {this.state.shownCategories.map((category, i) => (
                    <button
                        key={i}
                        onClick={this.handleCategoryChange}
                        value={category.name}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        );
    }
}
