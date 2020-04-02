import React from 'react';
import './Display.css';
//import { AiFillCaretLeft} from "react-icons/ai";
// import { Button } from "antd";
// import { Input, Card } from 'antd';
// import { Col, Row } from 'antd';
import Stage from '../Stage/Stage';
import "antd/dist/antd.css";

class Display extends React.Component {
    state = {
        stageName: '',
        taskName: '',
        selectValue: '',
        delStage: '',
        index: '',
        reaStage: ''
    }

    handleStageName = (e) => {
        this.setState({ stageName: e.target.value })
    }
    handleTaskName = (e) => {
        this.setState({ taskName: e.target.value })
    }
    addStage = () => {
        let localStorageData = JSON.parse(localStorage.getItem(this.props.username));
        let length = localStorageData.boards[this.props.board].length
        localStorageData.boards[this.props.board].splice(length - 1, 0, { [this.state.stageName]: [] })
        localStorage.setItem(this.props.username, JSON.stringify(localStorageData))
        this.setState({ stageName: '' })
    }
    delStage = () => {
        let localStorageData = JSON.parse(localStorage.getItem(this.props.username));
        let array = localStorageData.boards[this.props.board].map(obj => {
            return Object.keys(obj)
        })
        let index = array.findIndex((ele) => {
            return ele == this.state.delStage
        })
        let arr1 = Object.values(localStorageData.boards[this.props.board][index + 1])
        let arr = Object.values(localStorageData.boards[this.props.board][index])

        arr.map((ele) => {
            arr1[0].push(ele)
        })
        console.log(arr1)
        localStorageData.boards[this.props.board].splice(index, 1)
        localStorage.setItem(this.props.username, JSON.stringify(localStorageData))
        this.forceUpdate()
    }
    handleChange = (e) => {
        console.log(this.state.selectValue)
        this.setState({ selectValue: e.target.value }, () => { console.log(this.state.selectValue) })


    }
    handleRearrangestage = (e) => {
        console.log(this.state.reaStage)
        this.setState({ reaStage: e.target.value }, () => { console.log(this.state.reaStage) })


    }
    handleRearrangeIndex = (e) => {
        console.log(this.state.index)
        this.setState({ index: e.target.value }, () => { console.log(this.state.index) })


    }

    handleDelStage = (e) => {
        console.log(this.state.delStage)
        this.setState({ delStage: e.target.value }, () => { console.log(this.state.delStage) })


    }
    handleAddtask = (stageName , taskName) => {
        let localStorageData = JSON.parse(localStorage.getItem(this.props.username));
        let array = localStorageData.boards[this.props.board].map(obj => {
            return Object.keys(obj)
        })
        let index = array.findIndex((ele) => {
            return ele == stageName
        })
        let arr = Object.values(localStorageData.boards[this.props.board][index])
        arr[0].push(taskName)
        console.log(arr)
        localStorage.setItem(this.props.username, JSON.stringify(localStorageData))
        this.setState({ selectValue: '', taskName: '' })
    }
    
    handleRearrange = () => {
        let localStorageData = JSON.parse(localStorage.getItem(this.props.username));
        let array = localStorageData.boards[this.props.board].map(obj => {
            return Object.keys(obj)
        })
        let index = array.findIndex((ele) => {
            return ele == this.state.reaStage
        })
        let index1 = array.findIndex((ele) => {
            return ele == this.state.index
        })
        if (index > index1) {
            let arr = localStorageData.boards[this.props.board][index]
            localStorageData.boards[this.props.board].splice(index, 1)
            localStorageData.boards[this.props.board].splice(index1 + 1, 0, arr)
        } else {
            localStorageData.boards[this.props.board].splice(index1 + 1, 0, localStorageData.boards[this.props.board][index])
            localStorageData.boards[this.props.board].splice(index, 1)
        }
        localStorage.setItem(this.props.username, JSON.stringify(localStorageData))
        this.forceUpdate()
    }
    render() {
        let dropDownList = []
        let localStorageData = JSON.parse(localStorage.getItem(this.props.username));
      
        let array = localStorageData.boards[this.props.board].map(obj =>{
            dropDownList.push(<option value={Object.keys(obj)}>{Object.keys(obj)}</option>)
            return Object.keys(obj)[0]
        })

        let dropDownListForDeletion = dropDownList.slice(1, localStorageData.boards[this.props.board].length - 1)
        let dropDownListForRearranging = dropDownList.slice(0, localStorageData.boards[this.props.board].length - 1)
        
        return (
            <div>
                <h1 style={{ position: "fixed", top: "36px", left: "45%", color: "white" }}>  {this.props.board} Board</h1>
                <button onClick={this.props.handleTog} className="BackBtn">BACK</button>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous" />
                <link rel="stylesheet" type="text/css" href="styles.css" />

                <div style={{ marginLeft: "5%", marginRight: "5%", height: "25vh" ,width:"100%"}}>

                    <div style={{ float: "left", height: "30%", width: "30%", padding: "20px", marginRight: "25px" }}>
                        <div style={{ margin: "10px" }}>
                            <input type="text" onChange={this.handleStageName} placeholder="STAGE NAME" value={this.state.stageName} className="Input"></input>
                            <button onClick={this.addStage} type="primary" size="default" className="Button">Add Stage</button>
                        </div>
                        <div style={{ margin: "10px" }}>
                            <select value={this.state.delStage}
                                className="DropDown"
                                onChange={this.handleDelStage}
                                style={{ height: "30px", width: "150px", marginTop: "20px", marginRight: "10px" }} >
                                <option label="Stage to Delete"></option>
                                {dropDownListForDeletion}
                            </select>
                            <button onClick={this.delStage} type="primary" size="default" className="Button" >Delete Stage</button>
                        </div>
                    </div>

                    <div style={{ float: "left", height: "30%", width: "30%", padding: "20px", marginLeft: "25px" }}>
                        <div style={{ margin: "10px" }}>
                            <input type='text' placeholder="Task Name" onChange={this.handleTaskName} value={this.state.taskName} className="Input"></input>
                            <select value={this.state.selectValue}
                                className="DropDown"
                                style={{ margin: "5px" }}
                                onChange={this.handleChange} >
                                <option label="To Stage "></option>
                                {dropDownList}
                            </select>
                        </div>
                        <div style={{ margin: "10px" }}>
                            <button onClick={this.handleAddtask} type="primary" size="default" className="Button">Add Task</button>

                        </div>
                    </div>
                    <div style={{ float: "right", height: "30%", width: "30%", padding: "20px", marginRight:"50px" }}>
                        <div style={{ margin: "10px" }}>
                            <select value={this.state.reaStage}
                                className="DropDown"
                                style={{ margin: "5px" }}
                                onChange={this.handleRearrangestage} >
                                <option label="Stage to Rearrange "></option>
                                {dropDownListForDeletion}
                            </select>

                            <select value={this.state.index}
                                className="DropDown"
                                style={{ margin: "5px" }}
                                onChange={this.handleRearrangeIndex} >
                                <option label=" After Stage"></option>
                                {dropDownListForRearranging}
                            </select>

                        </div>
                        <button onClick={this.handleRearrange} type="primary" size="default" className="Button"> Rearrange</button>

                    </div>
                </div>

                {/* <div className="TableDiv" style={{ marginTop: "50px" }}>
                    <table className="table table-bordered ">
                        <thead className="thead-dark">
                            <tr>
                                {array}
                            </tr>

                        </thead>

                        <tbody><tr>{array1}</tr></tbody>

                    </table>
                </div> */}
                
                <div style={{display:"flex" , overflowX:"scroll", marginLeft:"50px", marginRight:"50px" , padding:"10px"}}>
                    {array.map((name)=>{
                        return <Stage stageName={name} username={this.props.username} board={this.props.board} onAddTask={(taskName)=>{this.handleAddtask(name , taskName)}}/>
                    })
                    }
                    
                </div>

                {/* <div className="site-card-wrapper">
                    <Row gutter={16}>
                        <div>
                            {array}
                         </div>
                    </Row>
                </div>
                */}
            </div>
        )
    }
}
export default Display