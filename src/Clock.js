import React, { Component } from "react";

export default class Clock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date(),
        });
    }

    render() {
        return (
            <div className="flex flex-col items-center sticky justify-center clock-container">
                <div className="text-9xl">
                    {this.state.date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
                <div className="text-4xl">
                    {this.state.date.toLocaleDateString()}
                </div>
            </div>
        );
    }
}
