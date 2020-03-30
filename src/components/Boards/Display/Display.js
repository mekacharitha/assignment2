import React, { Component } from 'react';
import './Display.css';

class Display extends Component {
    render() {
        let localStorageData = JSON.parse(localStorage.getItem(this.props.username));
       // console.log(localStorageData.boards[this.props.board])

        let array = localStorageData.boards[this.props.board].map(obj => {
            return <th>{Object.keys(obj)}</th>
        })
      //  console.log(array)
        return (
            <div style={{ alignItems: "center", textAlign: "center" }}>
                <h3>{this.props.board} Board</h3>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous" />
                <link rel="stylesheet" type="text/css" href="styles.css" />
                <div className="TableDiv" style={{ width: "80%", marginLeft: "10%" }}>
                    <table className="table table-bordered ">
                        <thead className="thead-dark">
                            <tr>
                                {array}
                            </tr>
                        </thead>
                    </table>
                </div>

            </div>
        )
    }
}
export default Display