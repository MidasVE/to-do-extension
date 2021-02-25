import React, { Component } from "react";
import Input from "./Input";
import List from "./List";
import Button from "./Button";
import ls from "local-storage";
import Clock from "./Clock";
import { faList, faSort, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
            date: "",
            category: "",
            notesCleared: false,
            buttonsVisible: ls.get("buttons"),
            isGrouped: ls.get("isGrouped"),
        };
    }

    changeInput = (newInput) => {
        this.setState({
            input: newInput.text,
            date: newInput.date,
            category: newInput.category,
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

    toggleGrouped = () => {
        this.setState(
            {
                isGrouped: this.state.isGrouped ? false : true,
            },
            () => {
                ls.set("isGrouped", this.state.isGrouped);
            }
        );
    };

    toggleClearButton = (show) => {
        this.setState({
            buttonsVisible: show,
        });

        ls.set("buttons", show);
    };

    render() {
        return (
            <div className="flex">
                <div className="bg-gray-100 text-gray-600 text-base min-h-screen flex-grow p-12 flex flex-col justify-between relative">
                    <div>
                        <Input onChange={this.changeInput} />
                        <List
                            input={this.state.input}
                            date={this.state.date}
                            category={this.state.category}
                            notesCleared={this.state.notesCleared}
                            toggleClearButton={this.toggleClearButton}
                            isGrouped={this.state.isGrouped}
                        />
                    </div>
                    {this.state.buttonsVisible && (
                        <div className="flex fixed bottom-8 w-min right-1/4 pr-8">
                            <Button
                                onChange={this.toggleGrouped}
                                icon={this.state.isGrouped ? faSort : faList}
                                text={
                                    this.state.isGrouped
                                        ? "Sorteer to-do's op prio"
                                        : "Groepeer to-do's"
                                }
                                className="animate-fadein "
                            />
                            <Button
                                onChange={this.clearNotes}
                                icon={faTrashAlt}
                                text="Verwijder alle to-do's"
                                className="animate-fadein "
                            />
                        </div>
                    )}
                </div>
                <div className="bg-blue-200 text-gray-600 p-12 w-1/4 flex-shrink-0">
                    <Clock></Clock>
                </div>
            </div>
        );
    }
}

export default App;
