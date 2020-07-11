import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Tasks } from '../api/tasks.js';
import Task from './Task.js';
import Clock from './Clock.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {hourGMT: "+7"};
  }
  handleSubmit(event) {
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.world).value.trim();
    const gmt = ReactDOM.findDOMNode(this.refs.GMT).value.trim();
    Tasks.insert({
      text,
      gmt,
      createdAt: new Date(),
    });

    ReactDOM.findDOMNode(this.refs.world).value = '';
    ReactDOM.findDOMNode(this.refs.GMT).value = '';
  }
  changeHour = (click)=>{
    this.setState({hourGMT: click});
    console.log(click);
  }
  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} handleChange={this.changeHour} />
    ));
  }

  render() {
    return (
      <div className="container">       
        <div className="header-time">
          <div className="add-country">
            <h1>Clock World</h1>
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="world"
                placeholder="Tên nước"
                required
              />
              <input
                type="text"
                ref="GMT"
                placeholder="GMT"
                required
              />
              <button className="button-submit">submit</button>
            </form>
          </div>
          <div className="list-country">
            {this.renderTasks()}
          </div>
        </div>
        <div>
          <Clock GMT={this.state.hourGMT}/>
        </div>
      </div>
    );
  }
}
export default withTracker(() => {
  return {
    tasks: Tasks.find().fetch(),
  };
})(App);