import React, { Component } from "react";
import Input from "./Input";
import List from "./List";
import Button from "./Button";
import ls from "local-storage";
import Clock from "./Clock";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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
                <div className="bg-gray-100 text-gray-600 text-base min-h-screen flex-grow p-12 flex flex-col justify-between">
                    <div>
                        <List
                            input={this.state.input}
                            date={this.state.date}
                            notesCleared={this.state.notesCleared}
                            toggleClearButton={this.toggleClearButton}
                        />
                        <Input onChange={this.changeInput} />
                    </div>
                    {this.state.clearButtonVisible ? (
                        <Button
                            onChange={this.clearNotes}
                            icon={faTrashAlt}
                            text="Verwijder alle to-do's"
                            className="self-end justify-self-end animate-fadein"
                        />
                    ) : (
                        ""
                    )}
                </div>
                <div className="bg-blue-200 text-gray-600 p-12 w-1/5">
                    <Clock></Clock>
                </div>
            </div>
        );
    }
}

export default App;
