import React, {useState} from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import {Clocks} from './clock.jsx'
import {ListCountries} from '../api/lists'
import CountryTime from './countryTime'
import './clock.css'
export const App = () => {
  const listCountry = useTracker(() => {
    Meteor.subscribe("countries")
    return ListCountries.find().fetch();
  });
  const [timeGMT, setTimeGmt] = useState("+7");
  const [nameGMT, setNameGmt] = useState("Viet Nam");
  const changeGMT = (a,b) =>{
    setTimeGmt(b)
    setNameGmt(a)
  }
  // console.log(timeGMT)
  return(
    <div className="param">
      <div className="para-div">
      {
        listCountry.map(country=>
          <a className="tag-a" key={country._id} onClick={e=>changeGMT(country.text,country.timeGmt)}>
            <div className="tag-div">Country: {country.text} - Time GMT: {country.timeGmt}</div>
          </a>
        )
      }
      </div>
      <div className="para-div-1">
      <Clocks changeGmtHour={timeGMT} changeGmtName={nameGMT}/>
      </div>
    </div>
  )
};
