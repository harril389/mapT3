import React, { Component } from 'react';
import { Tasks } from '../api/tasks.js';
import AppContext from "./appContext.js"//mmmmmmmmmmmmmmm
export default class Task extends Component {
    toggleChecked() {
        this.props.handleChange(this.props.task.gmt) ;
        // alert(this.props.task.gmt);
    }
    deleteThisTask() {
        Tasks.remove(this.props.task._id);
    }
    render() {
        return (
            <a className="hover-a" onClick={this.toggleChecked.bind(this)}>
            <div className="country-name">
                <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                    </button>
                {/* <input
                    type="checkbox"
                    readOnly
                    checked={!!this.props.task.checked}
                    
                /> */}
                <span className="text">{this.props.task.text}, GMT: {this.props.task.gmt}</span>
            </div>
            </a>
        );
    }
}
