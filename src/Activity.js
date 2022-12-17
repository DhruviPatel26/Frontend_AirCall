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
    const [archived, setArchived] = useState([])
    const [tab, setTab] = useState('activity')

    useEffect(() => {
        axios.get('https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities')
            .then(res => {
                const tempLogHolder = [];
                res.data.forEach(log => {
                    if (!!log.to) {
                        tempLogHolder.push(log);
                    }
                })
                const arch = [], act = []
                tempLogHolder.map(activity => {
                    if (activity.is_archived) {
                        arch.push(activity)
                    } else {
                        act.push(activity)
                    }
                })
                setActivities(act)
                setArchived(arch)
            })
            .catch(err => {
                console.log(err)
            });
    })

    const archiveAll = () => {
        let count = 0;
        activities.map(activity => {
            axios.patch(`https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${activity.id}`, {
                is_archived: true
            })
                .then(res => {
                    count += 1
                    if (count == activities.length) {
                        setArchived([...activities, ...archived]);
                        setActivities([])
                    }
                })
                .catch(err => {
                    console.log(err)
                });
        })
    }

    const reset = () => {
        axios.patch(`https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/reset`)
            .then(res => {
                setTab('activity')
                setActivities(activities)
            })
            .catch(err => {
                console.log(err)
            });
    }


    return (
        <div className='call-wrapper'>
            {tab == 'activity' ? <div className='wrapbtn'>
                <button className="reset" onClick={reset}>Reset</button>
                <button className="archive_all" onClick={archiveAll}>Archive all</button>
                <button onClick={() => setTab('archived')}>Archived</button>
            </div> :
                <div className="wrapbtn" >
                    <button className="back" onClick={() => setTab('activity')}>Back</button>
                    <button className="unarch" onClick={reset}>Unarchive All</button>
                </div>
            }
            {
                (() => {
                    let list = tab == 'activity' ? activities : archived
                    return list
                })().map(activity =>
                    <div key={activity.id} className='call_container'>
                        <p>
                            {(() => {
                                switch (activity.call_type) {
                                    case "answered": return <img src="../images/arrow.png" />
                                    case "missed": return <img src="../images/missed-call.png" />
                                    case "voicemail": return <img src="../images/voice-message.png" />
                                }
                            })()}
                        </p>
                        <a className="callerto" href={`/details/${activity.id}`}>{activity.to}</a>
                        <button className="archive" activity={activity} onClick={() => {
                            {
                                axios.patch(`https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${activity.id}`, {
                                    is_archived: tab == 'activity' ? true : false
                                })
                                    .then(res => {
                                        if (tab == 'activity') {
                                            setArchived([...archived, activity])
                                            setActivities(activities.filter(a => a != activity))
                                        } else {
                                            setActivities([...activities, activity])
                                            setArchived(archived.filter(a => a != activity))
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    });
                            }
                        }}>{tab == 'activity' ? 'Archive' : 'Unarchive'}<img src="../images/arch.png" /></button>
                        {/* <Link to={`/details/${activity.id}`}>{activity.to}</Link> */}


                        <div className="call_time">
                            {moment(activity.created_at).format("h:mm a")}

                        </div>

                    </div>
                )
            }

        </div>

    )
}
export default Activity;
