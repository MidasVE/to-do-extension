import React, { Component } from "react";
import Note from "./Note";
import ls from "local-storage";
import { confirmAlert } from "react-confirm-alert";

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            dragId: 0,
        };
    }

    addNote = (input, date) => {
        const newNote = {
            text: input,
            id: Date.now(),
            date: date,
            order: this.getHighestOrder(this.state.notes) + 1,
        };

        const newNotes = this.state.notes.concat(newNote);

        this.updateNotes(newNotes);
    };

    confirmClear = () => {
        confirmAlert({
            title: "Bevestiging",
            message: "Ben je zeker dat je alle to-do's wil verwijderen?",
            buttons: [
                {
                    label: "Ja",
                    onClick: () => this.clearNotes(),
                },
                {
                    label: "Nee",
                },
            ],
            overlayClassName: "confirm-overlay",
            closeOnClickOutside: true,
        });
    };

    clearNotes = () => {
        this.setState(
            {
                notes: [],
            },
            () => {
                ls.clear();
            }
        );
    };

    handleChange = (change, id, input = "") => {
        switch (change) {
            case "remove":
                this.removeNote(id);
                break;
            case "drag":
                this.dragNote(id);
                break;
            case "drop":
                this.dropNote(id);
                break;
            case "text":
                this.changeText(id, input);
                break;
            case "date":
                this.changeDate(id, input);
                break;
            case "dateRemove":
                this.changeDate(id);
                break;
        }
    };

    removeNote = (id) => {
        const newNotes = this.state.notes.filter((obj) => {
            return obj.id !== id;
        });
        this.updateNotes(newNotes);
    };

    dragNote = (id) => {
        this.setState({
            dragId: id,
        });
    };

    dropNote = (id) => {
        const dragNote = this.state.notes.find(
            (note) => note.id === this.state.dragId
        );
        const dropNote = this.state.notes.find(
            (note) => note.id === parseInt(id)
        );

        const dragNoteOrder = dragNote.order;
        const dropNoteOrder = dropNote.order;

        const newNotes = this.state.notes.map((note) => {
            if (note.id === this.state.dragId) {
                note.order = dropNoteOrder;
            }
            if (note.id === parseInt(id)) {
                note.order = dragNoteOrder;
            }
            return note;
        });

        this.updateNotes(newNotes);
    };

    changeText = (id, text) => {
        if (text === "") {
            this.removeNote(id);
        } else {
            const newNotes = this.state.notes.map((note) => {
                if (note.id === parseInt(id)) {
                    note.text = text;
                }
                return note;
            });
            this.updateNotes(newNotes);
        }
    };

    changeDate = (id, date = "") => {
        const newNotes = this.state.notes.map((note) => {
            if (note.id === parseInt(id)) {
                note.date = date;
            }
            return note;
        });
        this.updateNotes(newNotes);
    };

    getHighestOrder = (notes) => {
        if (!notes.length) {
            return 0;
        }
        let orderArray = [];
        notes.map((note) => {
            let order = note.order;
            if (!order) {
                order = 0;
            }
            orderArray.push(order);
        });
        return Math.max(...orderArray);
    };

    updateNotes = (newNotes) => {
        this.setState(
            {
                notes: newNotes,
            },
            () => {
                ls.set("notes", this.state.notes);
            }
        );
    };

    componentDidMount() {
        this.setState({
            notes: ls.get("notes") ?? [],
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            return;
        }

        if (
            prevProps.input !== this.props.input ||
            prevProps.date !== this.props.date
        ) {
            this.addNote(this.props.input, this.props.date);
        }

        if (this.props.notesCleared) {
            this.confirmClear();
        }
    }

    render() {
        return (
            <div className="flex flex-wrap items-start">
                {this.state.notes
                    .sort((a, b) => a.order - b.order)
                    .map((note) => (
                        <Note
                            text={note.text}
                            key={note.id}
                            id={note.id}
                            order={note.order}
                            date={note.date}
                            onChange={this.handleChange}
                            last={this.state.notes.length === 1}
                        />
                    ))}
            </div>
        );
    }
}
