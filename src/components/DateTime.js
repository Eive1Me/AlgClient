import React from 'react';
import "../DateTime.css";

export class DateTime extends React.Component {
    state = {
        currentDateTime: new Date(),
    }

    getTime(datetime) {
        const options = { hour: '2-digit', minute: '2-digit' };
        return datetime.toLocaleTimeString('ru-RU', options);
    }

    getDate(datetime) {
        const options = { weekday: 'short', month: 'long', day: 'numeric' };
        return datetime.toLocaleDateString('ru-RU', options);
    }

    render() {
        setInterval(function()
        {
            const time = new Date();
            this.setState({currentDateTime: time});
        }.bind(this), 1000);

        return (
            <div className="DateTime-container">
                <p className="DateTime-time">{this.getTime(this.state.currentDateTime)}</p>
                <p className="DateTime-date">{this.getDate(this.state.currentDateTime)}</p>
            </div>
        );
    };
}