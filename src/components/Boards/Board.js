import React, { Component } from 'react';
import './Board.css';
import { Link, Route, Switch } from 'react-router-dom';
import Display from './Display/Display';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Board extends Component {

    state = {
        boardname: '',
        length: 0
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

    render() {
        let localStorageData = JSON.parse(localStorage.getItem(this.props.name));
        let array = []
        let array1 = []
       // console.log(localStorageData.boards)
        if (localStorageData.boards != null) {
            let arr = Object.keys(localStorageData.boards)
           // console.log(arr)
            array = arr.map(name => {
                return <div><Link to={`/${name}`}> {name} </Link></div>
            })
            array1 = arr.map(name => {
                return <Route path={`/${name}`}><Display username={this.props.name} board={name}></Display></Route>
            })
        }
        return (
            <div>
                <NotificationContainer />
                board name:<input type="text" onChange={this.handleName} value={this.state.boardname}></input>

                <button onClick={this.handleAddBoard}
                    style={{ height: "50px", width: "50px", borderRadius: "25px", backgroundColor: "black", color: "white", fontSize: "25px" }}>+</button>

                <div className="Card">
                    <div className="Links"> {array}</div>
                </div>
                <Switch>
                    {array1}
                </Switch>

            </div>
        );

    }
}
export default Board