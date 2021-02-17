import "./List.css";
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

        this.clearNotes = this.clearNotes.bind(this);
        this.confirmClear = this.confirmClear.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeNote = this.removeNote.bind(this);
    }

    addNote(input, date) {
        const newNote = {
            text: input,
            id: Date.now(),
            date: date,
            order: this.getHighestOrder(this.state.notes) + 1,
        };

        this.setState(
            (state) => ({
                notes: state.notes.concat(newNote),
            }),
            () => {
                ls.set("notes", this.state.notes);
            }
        );
    }

    confirmClear() {
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
    }

    clearNotes() {
        this.setState(
            {
                notes: [],
            },
            () => {
                ls.clear();
            }
        );
    }

    handleChange(change, id) {
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
        }
    }

    removeNote(id) {
        const newNotes = this.state.notes.filter((obj) => {
            return obj.id !== id;
        });
        this.setState(
            {
                notes: newNotes,
            },
            () => {
                ls.set("notes", this.state.notes);
            }
        );
    }

    dragNote(id) {
        this.setState({
            dragId: id,
        });
    }

    dropNote(id) {
        const dragNote = this.state.notes.find(
            (note) => note.id === this.state.dragId
        );
        const dropNote = this.state.notes.find(
            (note) => note.id === parseInt(id)
        );

        const dragNoteOrder = dragNote.order;
        const dropNoteOrder = dropNote.order;

        const newNotes = this.state.notes.map((note) => {
            console.log(note);
            if (note.id === this.state.dragId) {
                note.order = dropNoteOrder;
            }
            if (note.id === parseInt(id)) {
                note.order = dragNoteOrder;
            }
            return note;
        });

        this.setState({
            notes: newNotes,
        });
    }

    getHighestOrder(notes) {
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
    }

    componentDidMount() {
        this.setState({
            notes: ls.get("notes") ?? [],
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            return;
        }
        this.addNote(this.props.input, this.props.date);
    }

    render() {
        return (
            <div>
                {this.state.notes
                    .sort((a, b) => a.order - b.order)
                    .map((note) => (
                        <Note
                            text={note.text}
                            key={note.id}
                            id={note.id}
                            date={note.date}
                            onChange={this.handleChange}
                        />
                    ))}
                <button onClick={this.confirmClear} type="reset">
                    Verwijder alle to-do&apos;s
                </button>
            </div>
        );
    }
}
