import React, { Component } from 'react';
import './Stage.css';
import "antd/dist/antd.css";
import {Button} from "antd";
//import { Card, Col, Row } from 'antd';
//import HorizontalScroll from 'react-scroll-horizontal'
import { AiOutlineDelete , AiOutlinePlus} from "react-icons/ai";

class Stage extends Component {
    state={
        taskTitle:"",
    }

    addTask = ()=>{

    }

    render() {
        let localStorageData = JSON.parse(localStorage.getItem(this.props.username));
        let taskArray = localStorageData.boards[this.props.board].map(obj => {
            let tasks = Object.values(obj)
            return tasks.map((task) => {
                return (<li>{task}</li>)
            })
        })
        let array = localStorageData.boards[this.props.board].map(obj => {
            return Object.keys(obj)
        })
        let index = array.findIndex((ele) => {
            return ele == this.props.stageName
        })

        taskArray = Object.values(localStorageData.boards[this.props.board][index][this.props.stageName]).map(ele => { return <li>{ele}</li> })
      
        return (
                <div className="Stage">
                    <div className="Title">
                        {this.props.stageName}
                    </div>
                    <div className="Tasks">
                        {taskArray}
                    </div>
                    <div className="IconView">
                        <Button className="Button" type="primary" size="small" onClick={()=>{this.props.onAddTask( this.state.taskName)}}><AiOutlinePlus /> Task</Button>
                        <Button className="Button" type="primary" size="small"><AiOutlineDelete />   Stage</Button>
                        <Button className="Button" type="primary" size="small">Rearrange</Button>
                    </div>
                </div>
               
        )
    }
}

export default Stage;