import React, { useState, useEffect, useContext } from "react";
import AppContext from './appContext'
import './clock.css';
const Clock = (props) => {
    const value = useContext(AppContext);
    console.log("12: "+value)
    var timeGmt = 0
    var temp = false
    var idHour 
    // console.log("clock"+props.GMT)
    // console.log("time server: "+ {serverTime})
    useEffect(() => {
        myfunction(timeGmt,temp)
    },[]);
    const myfunction = () => {
        setTimeout(function(){
            var hours = new Date().getHours();
            var hdegree = hours * 15 - 15;
            var hrotate = "rotate(" + hdegree + "deg)";
            document.getElementById("hour").style.transform = hrotate;
        },1000)
        const setDate = () =>{          
            var seconds = new Date().getSeconds();
            var sdegree = seconds * 6;
            var srotate = "rotate(" + sdegree + "deg)";
            document.getElementById("sec").style.transform = srotate;

            var mins = new Date().getMinutes();
            var mdegree = mins * 6 - 6;
            var mrotate = "rotate(" + mdegree + "deg)";
            document.getElementById("min").style.transform = mrotate;
        }
        idHour = setInterval(setDate, 1000); 
    };
    const setHour = () =>{
        var hours = new Date().getHours()- timeGmt;
        var hdegree = hours * 30 - 30;
        var hrotate = "rotate(" + hdegree + "deg)";
        document.getElementById("hour").style.transform = hrotate;
    }
    if (props.GMT === "+1") {
        timeGmt = 6
        setHour(timeGmt)
    }
    else if (props.GMT === "+2") {
        timeGmt = 5
        setHour(timeGmt)
    }
    else if (props.GMT === "+3") {
        timeGmt = 4
        setHour(timeGmt)
    }
    else if (props.GMT === "+4") {
        timeGmt = 3
        setHour(timeGmt)     
    }
    else if (props.GMT === "+5") {
        timeGmt = 2
        setHour(timeGmt)  
    }
    else if (props.GMT === "+6") {
        timeGmt = 1
        setHour(timeGmt)
    }
    return (
        <div className="para">
            <div className="display-time">
                <div className="border-display">
                    <div className="hour-display">
                        Hour:
                    </div>
                    <div className="minute-display">
                        <div style={{color:"white"}}>Min</div><div style={{color:"black"}}>ute:</div>
                </div>
                    <div className="second-display">
                        Second:
                </div>
                </div>
            </div>
            <div id="hour" className="hour-clock">
                <div className="hour-time hour1">01</div>
                <div className="hour-time hour2" style={{ color: "rgb(0, 0, 0)",fontWeight:"600" }}>24</div>
                <div className="hour-time hour3">23</div>
                <div className="hour-time hour4">22</div>
                <div className="hour-time hour5">21</div>
                <div className="hour-time hour6">20</div>
                <div className="hour-time hour7">19</div>
                <div className="hour-time hour8" style={{ color: "rgb(0, 0, 0)",fontWeight:"600" }}>18</div>
                <div className="hour-time hour9">17</div>
                <div className="hour-time hour10">16</div>
                <div className="hour-time hour11">15</div>
                <div className="hour-time hour12">14</div>
                <div className="hour-time hour13">13</div>
                <div className="hour-time hour14" style={{ color: "rgb(0, 0, 0)",fontWeight:"600" }}>12</div>
                <div className="hour-time hour15">11</div>
                <div className="hour-time hour16">10</div>
                <div className="hour-time hour17">09</div>
                <div className="hour-time hour18">08</div>
                <div className="hour-time hour19">07</div>
                <div className="hour-time hour20" style={{ color: "rgb(0, 0, 0)",fontWeight:"600" }}>06</div>
                <div className="hour-time hour21">05</div>
                <div className="hour-time hour22">04</div>
                <div className="hour-time hour23">03</div>
                <div className="hour-time hour24">02</div>
            </div>
            <div id="min" className="minute-clock">
                <div className="ms-time ms1">01</div>
                <div className="ms-time ms60" style={{ color: "rgb(0, 0, 0)",fontWeight:"600" }}>00</div>
                <div className="ms-time ms59">59</div>
                <div className="ms-time ms58">58</div>
                <div className="ms-time ms57">57</div>
                <div className="ms-time ms56">56</div>
                <div className="ms-time ms55">55</div>
                <div className="ms-time ms54">54</div>
                <div className="ms-time ms53">53</div>
                <div className="ms-time ms52">52</div>
                <div className="ms-time ms51">51</div>
                <div className="ms-time ms50">50</div>
                <div className="ms-time ms49">49</div>
                <div className="ms-time ms48">48</div>
                <div className="ms-time ms47">47</div>
                <div className="ms-time ms46">46</div>
                <div className="ms-time ms45" style={{ color: "rgb(0, 0, 0)",fontWeight:"600" }}>45</div>
                <div className="ms-time ms44">44</div>
                <div className="ms-time ms43">43</div>
                <div className="ms-time ms42">42</div>
                <div className="ms-time ms41">41</div>
                <div className="ms-time ms40">40</div>
                <div className="ms-time ms39">39</div>
                <div className="ms-time ms38">38</div>
                <div className="ms-time ms37">37</div>
                <div className="ms-time ms36">36</div>
                <div className="ms-time ms35">35</div>
                <div className="ms-time ms34">34</div>
                <div className="ms-time ms33">33</div>
                <div className="ms-time ms32">32</div>
                <div className="ms-time ms31">31</div>
                <div className="ms-time ms30" style={{ color: "rgb(0, 0, 0)",fontWeight:"600" }}>30</div>
                <div className="ms-time ms29">29</div>
                <div className="ms-time ms28">28</div>
                <div className="ms-time ms27">27</div>
                <div className="ms-time ms26">26</div>
                <div className="ms-time ms25">25</div>
                <div className="ms-time ms24">24</div>
                <div className="ms-time ms23">23</div>
                <div className="ms-time ms22">22</div>
                <div className="ms-time ms21">21</div>
                <div className="ms-time ms20">20</div>
                <div className="ms-time ms19">19</div>
                <div className="ms-time ms18">18</div>
                <div className="ms-time ms17">17</div>
                <div className="ms-time ms16">16</div>
                <div className="ms-time ms15" style={{ color: "rgb(0, 0, 0)",fontWeight:"600" }}>15</div>
                <div className="ms-time ms14">14</div>
                <div className="ms-time ms13">13</div>
                <div className="ms-time ms12">12</div>
                <div className="ms-time ms11">11</div>
                <div className="ms-time ms10">10</div>
                <div className="ms-time ms9">09</div>
                <div className="ms-time ms8">08</div>
                <div className="ms-time ms7">07</div>
                <div className="ms-time ms6">06</div>
                <div className="ms-time ms5">05</div>
                <div className="ms-time ms4">04</div>
                <div className="ms-time ms3">03</div>
                <div className="ms-time ms2">02</div>
            </div>
            <div id="sec" className="second-clock">
                <div className="se-time ms1">01</div>
                <div className="se-time ms60" style={{ color: "rgb(0, 0, 0)",fontWeight:"600" }}>60</div>
                <div className="se-time ms59">59</div>
                <div className="se-time ms58">58</div>
                <div className="se-time ms57">57</div>
                <div className="se-time ms56">56</div>
                <div className="se-time ms55">55</div>
                <div className="se-time ms54">54</div>
                <div className="se-time ms53">53</div>
                <div className="se-time ms52">52</div>
                <div className="se-time ms51">51</div>
                <div className="se-time ms50">50</div>
                <div className="se-time ms49">49</div>
                <div className="se-time ms48">48</div>
                <div className="se-time ms47">47</div>
                <div className="se-time ms46">46</div>
                <div className="se-time ms45" style={{ color: "rgb(0, 0, 0)",fontWeight:"600" }}>45</div>
                <div className="se-time ms44">44</div>
                <div className="se-time ms43">43</div>
                <div className="se-time ms42">42</div>
                <div className="se-time ms41">41</div>
                <div className="se-time ms40">40</div>
                <div className="se-time ms39">39</div>
                <div className="se-time ms38">38</div>
                <div className="se-time ms37">37</div>
                <div className="se-time ms36">36</div>
                <div className="se-time ms35">35</div>
                <div className="se-time ms34">34</div>
                <div className="se-time ms33">33</div>
                <div className="se-time ms32">32</div>
                <div className="se-time ms31">31</div>
                <div className="se-time ms30" style={{ color: "rgb(0, 0, 0)",fontWeight:"600" }}>30</div>
                <div className="se-time ms29">29</div>
                <div className="se-time ms28">28</div>
                <div className="se-time ms27">27</div>
                <div className="se-time ms26">26</div>
                <div className="se-time ms25">25</div>
                <div className="se-time ms24">24</div>
                <div className="se-time ms23">23</div>
                <div className="se-time ms22">22</div>
                <div className="se-time ms21">21</div>
                <div className="se-time ms20">20</div>
                <div className="se-time ms19">19</div>
                <div className="se-time ms18">18</div>
                <div className="se-time ms17">17</div>
                <div className="se-time ms16">16</div>
                <div className="se-time ms15" style={{ color: "rgb(0, 0, 0)",fontWeight:"600" }}>15</div>
                <div className="se-time ms14">14</div>
                <div className="se-time ms13">13</div>
                <div className="se-time ms12">12</div>
                <div className="se-time ms11">11</div>
                <div className="se-time ms10">10</div>
                <div className="se-time ms9">09</div>
                <div className="se-time ms8">08</div>
                <div className="se-time ms7">07</div>
                <div className="se-time ms6">06</div>
                <div className="se-time ms5">05</div>
                <div className="se-time ms4">04</div>
                <div className="se-time ms3">03</div>
                <div className="se-time ms2">02</div>
            </div>
        {/* <a onClick={myfunction()}>click</a> */}
        </div>
    )
}

export default Clock;