import React from 'react';

import './Modal.scss';

class AddTaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.submitAddTask = this.submitAddTask.bind(this);
    }
    submitAddTask(evt) {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        fetch('/api/task/', {
            method: 'POST',
            headers: {
                "X-CSRFToken": $csrf_token
            },
            body: formData,
        })
        .then(res => {
            if (res.status === 201) {
                document.getElementById("add-task-form").reset();
                this.props.add();
            } else {
                alert('Cannot add task...');
            }
        })
        .catch(err => {
            alert(`Newly added data may be malformed... Error: ${err}`);
        })
    }
    render() {
        return (
            <div className="modal" tabIndex="-1" role="dialog"                
                style={{
                    display: this.props.show ? 'block' : 'none'
                }}>
                <div className="modal-backdrop"></div>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Add New Task</h5>
                            <span onClick={this.props.close}>
                                <i className="fa fa-times-circle"></i>
                            </span>
                        </div>
                        <form id="add-task-form" onSubmit={this.submitAddTask}>
                            <div className="modal-body">
                                <label htmlFor="add-task-name-input">Task</label>
                                <input name="name" type="text" 
                                    className="form-control" id="add-task-name-input" 
                                    placeholder="Do something" maxlength="50" required/>
                                <label htmlFor="add-task-desc-input">Description</label>
                                <input name="description" rows="5" 
                                    className="form-control" id="add-task-desc-input" 
                                    placeholder="Optional" maxlength="255"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-danger" 
                                    onClick={this.props.close}>Cancel</button>
                                <button type="submit" className="btn btn-sm btn-success">Add Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
} 
export default AddTaskModal;
