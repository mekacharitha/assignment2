import React from 'react';
import './Display.css';
import Stage from '../Stage/Stage';
import "antd/dist/antd.css";

class Display extends React.Component {
    state = {
        stageName: '',

    }

    handleStageName = (e) => {
        this.setState({ stageName: e.target.value })
    }

    addStage = () => {
        let localStorageData = JSON.parse(localStorage.getItem(this.props.username));
        let length = localStorageData.boards[this.props.board].length
        localStorageData.boards[this.props.board].splice(length - 1, 0, { [this.state.stageName]: [] })
        localStorage.setItem(this.props.username, JSON.stringify(localStorageData))
        this.setState({ stageName: '' })
    }

    delStage = (stageName) => {
        let localStorageData = JSON.parse(localStorage.getItem(this.props.username));
        let array = localStorageData.boards[this.props.board].map(obj => {
            return Object.keys(obj)
        })
        let index = array.findIndex((ele) => {
            return ele == stageName
        })
        let arr1 = Object.values(localStorageData.boards[this.props.board][index + 1])
        let arr = Object.values(localStorageData.boards[this.props.board][index])

        arr.map((ele) => {
            ele.map(el=>{
                arr1[0].push(el)
            })
            
        })
        console.log(arr1)
        localStorageData.boards[this.props.board].splice(index, 1)
        localStorage.setItem(this.props.username, JSON.stringify(localStorageData))
        this.forceUpdate()
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

    handleRearrange = (stageName , afterStage) => {
        let localStorageData = JSON.parse(localStorage.getItem(this.props.username));
        let array = localStorageData.boards[this.props.board].map(obj => {
            return Object.keys(obj)
        })
        let index = array.findIndex((ele) => {
            return ele == stageName
        })
        let index1 = array.findIndex((ele) => {
            return ele == afterStage
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

        return (
            <div>
                <h1 style={{ position: "fixed", top: "36px", left: "45%", color: "white" }}>  {this.props.board} Board</h1>
                <button onClick={this.props.handleTog} className="BackBtn">BACK</button>

                <div style={{  height: "15vh" , width:"400px" , marginLeft:"40%",marginTop:"10px",display:"flex" , alignItems:"center" ,justifyItems:"center" , textAlign:"center" , border:"0.5px solid #000"}}>
                        
                            <input type="text" onChange={this.handleStageName} placeholder="STAGE NAME" value={this.state.stageName} className="Input"></input>
                            <button onClick={this.addStage}  className="Button">Add Stage</button>
                         
                </div>

                <div style={{display:"flex" , overflowX:"scroll", marginLeft:"50px", marginRight:"50px" , padding:"10px", marginTop:"150px"}}>
                    {array.map((name)=>{
                        return <Stage stageName={name}          
                                    stages = {dropDownList}
                                    username={this.props.username} 
                                    board={this.props.board} 
                                    onAddTask={(taskName)=>{this.handleAddtask(name , taskName)}}
                                    onDeleteStage={()=>{this.delStage(name)}}
                                    onRearrange={(afterStage)=>{this.handleRearrange(name , afterStage)}}
                                />
                    })
                    }
                    
                </div>
            </div>
        )
    }
}
export default Display