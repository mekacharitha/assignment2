import React, { Component } from 'react';
import './Stage.css';
import "antd/dist/antd.css";
import {Button} from "antd";
//import { Card, Col, Row } from 'antd';
//import HorizontalScroll from 'react-scroll-horizontal'
import { AiOutlineDelete , AiOutlinePlus} from "react-icons/ai";

class Stage extends Component {
    render() {
        return (
            // horizantal scrolllbar
            <div>
                <div className="Stage">
                    <div className="Title">
                        <p>Stage Name</p>
                    </div>
                    <div className="Tasks">
                        <li>abc</li>
                        <li>xyz</li>
                    </div>
                    <div className="IconView">
                        <Button className="Button" type="primary" size="small"><AiOutlinePlus /> Task</Button>
                        <Button className="Button" type="primary" size="small"><AiOutlineDelete />   Stage</Button>
                        <Button className="Button" type="primary" size="small">Rearrange</Button>
                    </div>
                </div>
                </div>
        )
    }
}

export default Stage;