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
            clearButtonVisible: false,
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

    toggleClearButton = (show) => {
        this.setState({
            clearButtonVisible: show,
        });
    };

    render() {
        return (
            <div className="bg-gray-100 text-gray-600 min-h-screen">
                <List
                    input={this.state.input}
                    date={this.state.date}
                    notesCleared={this.state.notesCleared}
                    toggleClearButton={this.toggleClearButton}
                />
                <Input onChange={this.changeInput} />
                {this.state.clearButtonVisible ? (
                    <ClearNotes onChange={this.clearNotes} />
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default App;
