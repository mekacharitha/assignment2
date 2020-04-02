import React, { Component } from 'react';
import './Stage.css';
import "antd/dist/antd.css";
import {Button} from "antd";
//import { Card, Col, Row } from 'antd';
//import HorizontalScroll from 'react-scroll-horizontal'
import { AiOutlineDelete , AiOutlinePlus} from "react-icons/ai";
import PopUp from '../../pop-up';

class Stage extends Component {
    state={
        taskTitle:"",
        showAddTask: false,
        showRearrange: false,
        rearrangeStage:'',
    }

    handleNewTaskCancel = () => {
        this.setState({
            taskTitle: '',
            showAddTask: false,
        })
    }

    handleNewTaskSubmit = () =>{
        this.handleNewTaskCancel();
        this.props.onAddTask(this.state.taskTitle)
    }

    handleReArrangeCancel = () => {
        this.setState({
            showRearrange: false,
            rearrangeStage:"",
        })
    }
    
    handleReArrange = () => {
       this.handleReArrangeCancel();
        this.props.onRearrange(this.state.rearrangeStage)
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
                        <Button className="Button" type="primary" size="small" onClick={()=>{this.setState({showAddTask: true})}}><AiOutlinePlus /> Task</Button>
                        <Button className="Button" type="primary" size="small" onClick={()=>{this.props.onDeleteStage()}}><AiOutlineDelete />   Stage</Button>
                        <Button className="Button" type="primary" size="small" onClick={()=>{this.setState({showRearrange: true})}}>Rearrange</Button>
                    </div>
                    {
                        this.state.showAddTask
                        ? (
                            <PopUp onSubmit={this.handleNewTaskSubmit} onCancel={this.handleNewTaskCancel}> 
                                <label>Task Name</label>                            
                                <input  placeholder="Task Title" onChange={(e)=>{this.setState({ taskTitle: e.target.value})}}></input>
                            </PopUp>
                        )
                        : null
                    
                    }

                    {
                        this.state.showRearrange
                        ? (
                            <PopUp onSubmit={this.handleReArrange} onCancel={this.handleReArrangeCancel}> 
                                <select placeholder="After Stage" onChange={(e)=>{this.setState({rearrangeStage:e.target.value})}}>
                                <option label="Rearrange to After the Stage"></option>
                                  {this.props.stages}
                                </select>
                            </PopUp>
                        )
                        : null
                    
                    }
                </div>
               
        )
    }
}

export default Stage;