import React, { Component } from "react";
import Input from "./Input";
import List from "./List";
import ClearNotes from "./ClearNotes";
import ls from "local-storage";
import Clock from "./Clock";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
            date: "",
            notesCleared: false,
            clearButtonVisible: ls.get("clearbutton"),
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

        ls.set("clearbutton", show);
    };

    render() {
        return (
            <div className="flex">
                <div className="bg-gray-100 text-gray-600 min-h-screen flex-grow p-12">
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
                <div className="bg-blue-200 text-gray-600 p-12">
                    <Clock></Clock>
                </div>
            </div>
        );
    }
}

export default App;
