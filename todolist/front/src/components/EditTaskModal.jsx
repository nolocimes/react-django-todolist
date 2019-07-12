import React from 'react';

import './Modal.scss';

class EditTaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.submitEditTask = this.submitEditTask.bind(this);
    }
    submitEditTask(evt) {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        fetch(`/api/task/${this.props.taskId}/`, {
            method: 'PATCH',
            headers: {
                "X-CSRFToken": $csrf_token
            },
            body: formData,
        })
        .then(res => {
            if (res.status === 200) {
                document.getElementById("edit-task-form").reset();
                this.props.edit();
            } else {
                alert('Cannot edit task...');
            }
        })
        .catch(err => {
            alert(`Newly editted data may be malformed... Error: ${err}`);
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
                            <h5>Edit Task</h5>
                            <span onClick={this.props.close}>
                                <i className="fa fa-times-circle"></i>
                            </span>
                        </div>
                        <form id="edit-task-form" onSubmit={this.submitEditTask}>
                            <div className="modal-body">
                                <label htmlFor="edit-task-name-input">Task</label>
                                <input defaultValue={this.props.taskName} 
                                    name="name" type="text" className="form-control" 
                                    id="edit-task-name-input" placeholder="Do something" 
                                    maxlength="50" required/>
                                <label htmlFor="edit-task-desc-input">Description</label>
                                <input defaultValue={this.props.taskDesc} 
                                    name="description" rows="5" className="form-control" 
                                    id="edit-task-desc-input" placeholder="Optional"
                                    maxlength="255"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-danger" 
                                    onClick={this.props.close}>Cancel</button>
                                <button type="submit" className="btn btn-sm btn-success">Edit Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
} 
export default EditTaskModal;
