import React, { Component } from 'react';
import './Board.css';
import { Link, Route, Switch } from 'react-router-dom';
import Display from './Display/Display';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { AiOutlineDelete , AiOutlinePlus} from "react-icons/ai";

class Board extends Component {

    state = {
        boardname: '',
        length: 0,
        submit: true,
        toggle: false,
        deleteBoard:'',
    }

    localStorageData = JSON.parse(localStorage.getItem(this.props.name));


    handleAddBoard = () => {
        let board = this.localStorageData.boards;
        board = {
            ...board,
            [this.state.boardname]: [{ new: [] }, { done: [] }],
        }
        this.localStorageData.boards = board

        localStorage.setItem(this.props.name, JSON.stringify(this.localStorageData))

        let Data = JSON.parse(localStorage.getItem(this.props.name));
       // console.log(Object.keys(Data.boards).length)
        this.setState({ length: Object.keys(Data.boards).length })
        NotificationManager.success('New board added successfully');
    }
    handleName = (e) => {
        this.setState({ boardname: e.target.value })
        // console.log(this.state.boardname)
    }

    handleToggle = () => {
        this.setState({ submit: false, toggle: true })
    }
    handleTogg = () => {
        this.setState({ submit: true, toggle: false })
    }

    handleDeleteBoard=()=>
    {
        let localStorageData = JSON.parse(localStorage.getItem(this.props.name));
        delete localStorageData.boards[this.state.deleteBoard]
        localStorage.setItem(this.props.name, JSON.stringify(localStorageData))
        this.setState({deleteBoard:''})
    }
    
    handleDelBoard = (e) => {
        this.setState({ deleteBoard: e.target.value })
        console.log(this.state.deleteBoard)
    }

    render() {
        let localStorageData = JSON.parse(localStorage.getItem(this.props.name));
        let array = []
        let array1 = []
        let dropDownList=[]
       // console.log(localStorageData.boards)
        if (localStorageData.boards != null) {
            let arr = Object.keys(localStorageData.boards)
           // console.log(arr)
            array = arr.map(name => {
                dropDownList.push(<option value={name}>{name}</option>)
                return <div><Link to={`/${name}`} onClick={this.handleToggle}> {name} </Link></div>
            })
            array1 = arr.map(nam => {
                return <Route path={`/${nam}`} exact><Display username={this.props.name} board={nam} handleTog={this.handleTogg}></Display></Route>
            })
           // console.log(array)
            //console.log(array1)
        }
        return (
            <div >
                <NotificationContainer />
                <button onClick={this.props.logout} style={{ backgroundColor: "white", color: "#282c34" }} className="LogoutBtn">LOGOUT</button>

                <div>
                {this.state.submit ? <div> <input type="text" placeholder="BOARD NAME" onChange={this.handleName} value={this.state.boardname}></input>
                    <button onClick={this.handleAddBoard}
                        style={{ height: "50px", width: "50px", borderRadius: "25px", backgroundColor: "#282c34", color: "white", fontSize: "25px" ,margin:"5px" }}><AiOutlinePlus/></button>
                    <div className="Card">
                        <div className="Links"> {array}</div>
                    </div>
                    <select value={this.state.deleteBoard}
                        style={{height:"30px" , width:"120px" , backgroundColor: "#2e2f30", color: "white"}}
                        onChange={this.handleDelBoard} >
                        <option label="Select a board "></option>
                        {dropDownList}
                    </select>
                    <button onClick={this.handleDeleteBoard}
                            style={{ height: "50px", width: "50px", borderRadius: "25px", backgroundColor: "#282c34", color: "white", fontSize: "25px",margin:"5px" }}><AiOutlineDelete/></button>
                </div> : null}


                {this.state.toggle ? <Switch>
                    {array1}
                </Switch> : null}
            </div>

            </div>
        );

    }
}
export default Board