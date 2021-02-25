import React, { Component } from "react";
import Note from "./Note";
import ls from "local-storage";
import { confirmAlert } from "react-confirm-alert";
import "./ConfirmAlert.css";

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            groupedNotes: [],
            dragId: 0,
            isGrouped: this.props.isGrouped,
        };
    }

    addNote = (input, date, category) => {
        const newNote = {
            text: input,
            id: Date.now(),
            date: date,
            category: category,
            order: this.getHighestOrder(this.state.notes) + 1,
            backgroundColor: this.differentBgColor(
                this.getHighestOrder(this.state.notes) + 1
            ),
        };

        const newNotes = this.state.notes.concat(newNote);

        this.props.toggleClearButton(true);

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
            closeOnClickOutside: true,
        });
    };

    clearNotes = () => {
        this.props.toggleClearButton(false);

        this.setState(
            {
                notes: [],
                groupedNotes: [],
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

        if (newNotes.length === 0) {
            this.props.toggleClearButton(false);
        }
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

    updateNotes = (newNotes) => {
        this.setState(
            {
                notes: newNotes,
                groupedNotes: this.groupNotes(newNotes, "category"),
            },
            () => {
                ls.set("notes", this.state.notes);
            }
        );
    };

    groupNotes = (notes, key) => {
        let groupedNotes = this.groupBy(notes, key);
        return Object.entries(groupedNotes);
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

    differentBgColor = (order) => {
        switch (order % 5) {
            case 1:
                return "green";
            case 2:
                return "indigo";
            case 3:
                return "yellow";
            case 4:
                return "red";
            case 0:
                return "blue";
        }
    };

    groupBy = (data, key) => {
        if (!data) {
            return {};
        }

        return data.reduce(function (storage, item) {
            var group = item[key];
            if (group === undefined) {
                group = "";
            }
            storage[group] = storage[group] || [];
            storage[group].push(item);
            return storage;
        }, {});
    };

    componentDidMount() {
        this.setState({
            notes: ls.get("notes") ?? [],
            groupedNotes: this.groupNotes(ls.get("notes"), "category") ?? [],
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            return;
        }

        if (
            prevProps.input !== this.props.input ||
            prevProps.date !== this.props.date ||
            prevProps.category !== this.props.category
        ) {
            this.addNote(
                this.props.input,
                this.props.date,
                this.props.category
            );
        }

        if (this.props.notesCleared) {
            this.confirmClear();
        }

        if (this.props.isGrouped !== prevProps.isGrouped) {
            this.setState({
                isGrouped: this.props.isGrouped,
            });
        }
    }

    render() {
        return (
            <div className="flex flex-wrap items-start">
                {this.state.isGrouped
                    ? this.state.groupedNotes.sort().map((groupedNote, i) => {
                          let category = groupedNote[0];
                          let notes = groupedNote[1];

                          return (
                              <div key={i} className="flex w-full flex-wrap">
                                  {category !== "" ? (
                                      <h3 className="w-full font-bold text-lg">
                                          {category}
                                      </h3>
                                  ) : (
                                      ""
                                  )}
                                  {notes.map((note) => (
                                      <Note
                                          text={note.text}
                                          key={note.id}
                                          id={note.id}
                                          order={note.order}
                                          date={note.date}
                                          category={note.category}
                                          draggable={false}
                                          onChange={this.handleChange}
                                          backgroundColor={note.backgroundColor}
                                          last={this.state.notes.length === 1}
                                      />
                                  ))}
                              </div>
                          );
                      })
                    : this.state.notes
                          .sort((a, b) => a.order - b.order)
                          .map((note) => (
                              <Note
                                  text={note.text}
                                  key={note.id}
                                  id={note.id}
                                  order={note.order}
                                  date={note.date}
                                  category={note.category}
                                  draggable={true}
                                  onChange={this.handleChange}
                                  backgroundColor={note.backgroundColor}
                                  last={this.state.notes.length === 1}
                              />
                          ))}
            </div>
        );
    }
}
