import './style.css';
import React, { useRef, useState } from 'react';

export default ({ hasEvents, ...props }) => {

    return props.modelShow ?
        <div className='model-window'>

            <div className='model-window-title'>
                <h4>title</h4>
            </div>
            <div className='body'>
                {
                    hasEvents ? <ModalForm {...props} /> : <ModalMessage {...props}/>
                }
            </div>
            <div className='footer'></div>

        </div> : null;
};

const ModalMessage = (props) => {
    
    return <div className='model-window-title'>
        <div className='model-window-title'>

            <h4>OOOOOPPPPSSSSSSSSSS NO EVENTS CREATE</h4>
            <button onClick = {()=>props.handleCloseButton()}>CLOSE</button>
        </div>
    </div>;
};

const ModalForm = (props) => {

    const inputEl = useRef(null);

    const initialState = {
        ObjId: 0,
        priorityId: 0,
        color: ''
    };

    const [modelState, updateModelState] = useState(initialState);

    const selectHandler = (e) => {
        const ObjId = e.target.value;

        let  slectedItem = props.newCalender.filter(item=>item.ObjId === ObjId);

        updateModelState({...modelState, ObjId: e.target.value, color: slectedItem[0].color});
    };

    const priorityhandler=(e)=>{

        updateModelState({...modelState, priorityId: e.target.value});
    };

    return <div>
        <form>

            <input type='text' ref={inputEl} />
            <select onBlur={selectHandler} onChange={selectHandler}  >
                {
                    props.newCalender.map(item =><option value={item.ObjId} key={item.id} >{item.label}</option>)
                }
            </select>

            <select onBlur={priorityhandler} onChange = {priorityhandler}>
                {
                    props.priorityEvents.map(item => <option value={item.priorityId} key={item.id}>{item.label}</option>)
                }
            </select>

            <button onClick={() => {
                const inputStr = inputEl.current.value;

                if (inputStr !== '') {
                    props.handlerClick(inputStr, modelState.ObjId, modelState.priorityId, modelState.color);
                }
            }
            }>SAVE</button>
            <button>CLOSE</button>
        </form>
    </div>;
};
