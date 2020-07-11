import React,{useEffect} from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Clock } from '../api/clocks'
import './clock.css';
export const Clocks = (props) => {
  const {clockr} = useTracker(() => {
    Meteor.subscribe("clocks")
    return ({
        clockr : Clock.find().fetch(),
    })
  });
  var timeGmt = 0
if (props.changeGmtHour === "+1") {
  timeGmt = 6
}
else if (props.changeGmtHour === "+2") {
  timeGmt = 5
}
else if (props.changeGmtHour === "+3") {
  timeGmt = 4
}
else if (props.changeGmtHour === "+4") {
  timeGmt = 3     
}
else if (props.changeGmtHour === "+5") {
  timeGmt = 2 
}
else if (props.changeGmtHour === "+6") {
  timeGmt = 1
}
  return (
      <div className="para">
        <div>
        <div className="country-name-s">{props.changeGmtName}</div>
        {
          clockr.map(aa=><div key={aa._id} style={{color:"red", fontSize:"115px", fontWeight:"600", textAlign:"center", width:"100%"}}>{aa.hours-timeGmt}:{aa.mins}:{aa.secs}</div>)
        }
        </div>
      </div>
  );
};