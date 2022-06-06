import React from 'react';
import {Tracker} from 'yeskendyr';
import Main from './MainPage';
import { Button, Divider } from 'antd';
import './App.css';

export interface eventLogs {
    cursor: cursorLog[];
    scrollbar: scrollbarLog[];
    touch: touchLog[];
    wheel: wheelLog[];
}

export interface cursorLog {
    x: number; // X coordinate
    y: number; // Y coordinate
    m: number; // moment in millisecond
    t: number; // time stamp
}

export interface scrollbarLog {
    h: number; // height
    m: number; // moment in millisecond
    t: number; // time stamp
}

export interface touchLog {
    x: number; // X coordinate
    y: number; // Y coordinate

    m: number; // moment in millisecond
    t: number; // time stamp

    rX: number; //touch radius X
    rY: number; //touch radius Y

    f: number; //force
}

export interface wheelLog {
    x: number; // X coordinate
    y: number; // Y coordinate
    z: number; // Z coordinate
    m: number; // moment in millisecond
    t: number; // time stamp
}

function App() {

    const initial: string[]= []; //'[]'
    const [list, set] = React.useState([...initial]);

    const initialLigListValue: eventLogs = {
        cursor: [],
        scrollbar: [],
        touch: [],
        wheel: []
    };
    const [store, action] = React.useState(initialLigListValue)

    function displayState() {
        console.log('state: ',{
            store: store,
            redis: list
        })
    }
    // console.log('store: ', store);
    // console.log('list: ', list);
    return (
        <div
            className="App"
            style={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                background: 'white'//'#ecf0f1' '#bdc3c7'
            }}>
            <div>
                <Button
                    onClick={()=>displayState()}
                    type={"primary"}
                    block
                >
                    Display State in Console
                </Button>
                <Divider />
                <Tracker
                    store={store}
                    action={action}

                    assumption={(assumption: object)=>console.log(assumption)}

                    cursor
                    scroll
                    touch={false}
                >
                    <Main
                        store={store}
                        action={action}

                        list={list}
                        set={set}
                    />
                </Tracker>
            </div>
        </div>
  );
}

export default App;
