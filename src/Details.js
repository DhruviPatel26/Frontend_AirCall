import React from 'react'
import Activity from './Activity'
import moment from 'moment'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Details() {
    const [activityDetails, setActivityDetails] = useState([]);
    const data = [];
    const params = useParams();

    useEffect(() => {
        axios.get('https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/' + params.id)
            .then(res => {
                setActivityDetails(res.data);
            })
            .catch(err => {
                console.log(err)
            });

    }, []);

    data.push(activityDetails);
    return (
        <div className='call-wrapper'>

            {
                data.map((details, i) =>
                    <div key={i} className='call_container'>
                        <div className='dial_no'>Caller No: {details.to}</div>
                        <div className='date'> Date:{moment(details.created_at).format("YYYY:MM:DD")}</div><br></br>
                        <div className='duration'> Duration: {details.duration}</div><br></br>
                        <div className='bound'> {details.direction}<br></br>{details.call_type}</div>


                        <div className="time">
                            Time: {moment(details.created_at).format("h:mm a")}

                        </div>

                    </div>
                )
            }

        </div>
    )
}


export default Details