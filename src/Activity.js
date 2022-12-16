import React from 'react'

import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from "react-router-dom"

import Details from "./Details"
import { useEffect, useState } from "react";
import axios from 'axios';

import moment from 'moment';
// import Activitydetails from './Activitydetails';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

function Activity() {
    const [activities, setActivities] = useState([])

    useEffect(() => {
        axios.get('https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities')
            .then(res => {
                const tempLogHolder = [];
                res.data.forEach(log => {
                    if (!!log.to) {
                        tempLogHolder.push(log);
                    }
                })
                setActivities(tempLogHolder);
            })
            .catch(err => {
                console.log(err)
            });

    })
    return (
        <div className='call-wrapper'>

            {
                activities.map(activity =>
                    <div key={activity.id} className='call_container'><p>
                            {(() => {
                                switch (activity.call_type) {
                                    case "answered": return <img src="../images/arrow.png" />
                                    case "missed": return <img src="../images/missed-call.png" />
                                    case "voicemail": return <img src="../images/voice-message.png" />
                                }
                            })()}
                        </p><Link to={`/details/${activity.id}`}>{activity.to}</Link>
                        

                        <div className="call_time">
                            {moment(activity.created_at).format("h:mm a")}

                        </div>

                    </div>
                )
            }


            <Routes>
                {/* <Route path="/activity" element={<Activity />} /> */}
                <Route path="details/:id" element={<Details />} />

            </Routes>
        </div>

    )
}
export default Activity;
