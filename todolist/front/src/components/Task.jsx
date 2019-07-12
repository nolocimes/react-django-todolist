import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component {
    static propTypes = {
        taskData: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.doneTask = this.doneTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }
    doneTask(evt) {
        this.props.done(evt.currentTarget.getAttribute('value'));
    }
    editTask(evt) {
        this.props.edit(evt.currentTarget.getAttribute('value'));
    }
    deleteTask(evt) {
        var isConfirmedDelete = confirm('Do you really want to delete this task?');
        if(isConfirmedDelete) {
            fetch(`/api/task/${evt.currentTarget.getAttribute('value')}`, {
                method: 'DELETE',
                headers: {
                    "X-CSRFToken": $csrf_token
                }
            })
            .then(res => {
                if (res.status === 204) {
                    this.props.delete();
                } else {
                    alert('Cannot delete task...');
                }
            })
            .catch(err => {
                alert(`Newly delete data may be malformed... Error: ${err}`);
            })
        }
    }
    render() {
        const taskData = this.props.taskData;
        return (
            <li className="list-group-item" id={"task-" + taskData.id}>
                <div className="row">
                    <div className="col-xs-12 col-sm-9 col-md-10">
                        <input type="checkbox" className="ml-2 mr-4" id={"task-done-checkbox-" + taskData.id} 
                        value={taskData.id} defaultChecked={taskData.is_done} onClick={this.doneTask}/>
                            {taskData.name}
                    </div>
                    <div className="col-xs-12 col-sm-3 col-md-2">
                        <a id={"task-delete-btn" + taskData.id} value={taskData.id} onClick={this.deleteTask}>
                            <i className="fa fa-trash float-right ml-3"></i>
                        </a>
                        <a id={"task-edit-btn" + taskData.id} value={taskData.id} onClick={this.editTask}>
                            <i className="fa fa-edit float-right ml-3"></i>
                        </a>
                    </div>
                </div>
            </li>  
        );
    }
} 
export default Task;
