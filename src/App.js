import React, { Component } from "react";
import Input from "./Input";
import List from "./List";
import ClearNotes from "./ClearNotes";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
            date: "",
            notesCleared: false,
        };
    }

    changeInput = (newInput) => {
        this.setState({
            input: newInput.text,
            date: newInput.date,
        });
    };

    clearNotes = () => {
        this.setState(
            {
                notesCleared: true,
            },
            () => {
                this.setState({
                    notesCleared: false,
                });
            }
        );
    };

    render() {
        return (
            <div className="text-gray-800">
                <List
                    input={this.state.input}
                    date={this.state.date}
                    notesCleared={this.state.notesCleared}
                />
                <Input onChange={this.changeInput} />
                <ClearNotes onChange={this.clearNotes} />
            </div>
        );
    }
}

export default App;
