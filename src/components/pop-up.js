import React from 'react';

const PopUp = (props) => {
  return (
    <div className="pop-up">
        <div className="content-container">
            {props.children}
            <div>
                <button onClick={props.onCancel}>CANCEL</button>
                <button onClick={props.onSubmit}>OK</button>
            </div>
        </div>
    </div>
  )
}


export default PopUp;