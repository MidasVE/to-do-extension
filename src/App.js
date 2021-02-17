import "./App.css";
import React, { Component } from "react";
import Input from "./Input";
import List from "./List";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
        };

        this.changeInput = this.changeInput.bind(this);
    }

    changeInput(newInput) {
        this.setState({
            input: newInput.text,
            date: newInput.date,
        });
    }

    render() {
        return (
            <div className="App">
                <Input onChange={this.changeInput} />
                <List input={this.state.input} date={this.state.date} />
            </div>
        );
    }
}

export default App;
