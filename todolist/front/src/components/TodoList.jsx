import React from 'react';

import {taskListCreateUrl, taskListCreateDoneUrl, taskListUpdateUrl, taskListCountUrl} from './Variables';

import Task from './Task.jsx';
import AddTaskModal from './AddTaskModal.jsx'
import EditTaskModal from './EditTaskModal.jsx'

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // This component
            showDone: false,
            amtDone: 0,
            amtAll: 0,
            tasks: [],
            isLoaded: false,
            tasksDone: [],
            isLoadedDone: false,
            //  Add task modal
            isAddTaskShowing: false,
            //  Edit task modal
            isEditTaskShowing: false,
            currentEditTaskId: -1,
            currentEditTaskName: '',
            currentEditTaskDesc: ''
        }
        this.refreshData = this.refreshData.bind(this);
        this.showTodo = this.showTodo.bind(this);
        this.showDone = this.showDone.bind(this);
        this.addTask = this.addTask.bind(this);
        this.closeAddTask = this.closeAddTask.bind(this);
        this.closeAddTaskAndRefresh = this.closeAddTaskAndRefresh.bind(this);
        this.editTask = this.editTask.bind(this);
        this.closeEditTask = this.closeEditTask.bind(this);
        this.closeEditTaskAndRefresh = this.closeEditTaskAndRefresh.bind(this);
        this.doneTask = this.doneTask.bind(this);
    }
    refreshData() {
        fetch(taskListCountUrl)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    alert("Cannot retrieve count of Todo tasks...");
                }
            })
            .then(json => {
                this.setState({amtDone: json.count_done, amtAll: json.count_all})
            })
            .catch(err => {
                alert(`Retrieve count may be malformed... Error: ${err}`);
            })
        fetch(taskListCreateUrl)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    alert("Cannot retrieve list of Todo tasks...");
                }
            })
            .then(json => {
                this.setState({tasks: json, isLoaded: true})
            })
            .catch(err => {
                alert(`Retrieve data may be malformed... Error: ${err}`);
            })
        fetch(taskListCreateDoneUrl)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    alert("Cannot retrieve list of Todo tasks...");
                }
            })
            .then(json => {
                this.setState({tasksDone: json, isLoadedDone: true})
            })
            .catch(err => {
                alert(`Retrieve data may be malformed... Error: ${err}`);
            })
    }
    showTodo() {
        this.setState({showDone: false});
    }
    showDone() {
        this.setState({showDone: true});
    }
    addTask() {
        this.setState({isAddTaskShowing: true});
    }
    closeAddTask() {
        this.setState({isAddTaskShowing: false});
    }
    closeAddTaskAndRefresh() {
        this.setState({isAddTaskShowing: false});
        this.refreshData();
    }
    editTask(taskId) {
        fetch(taskListUpdateUrl(taskId))
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Cannot get Todo tasks...");
            }
        })
        .then(json => {
            this.setState({
                isEditTaskShowing: true, 
                currentEditTaskId: taskId,
                currentEditTaskName: json.name,
                currentEditTaskDesc: json.description
            });
        })
        .catch(err => {
            alert(`Get data may be malformed... Error: ${err}`);
        })
    }
    closeEditTask() {
        this.setState({
            isEditTaskShowing: false,
            currentEditTaskId: -1,
            currentEditTaskName: '',
            currentEditTaskDesc: ''
        });
    }
    closeEditTaskAndRefresh() {
        this.setState({
            isEditTaskShowing: false, 
            currentEditTaskId: -1,
            currentEditTaskName: '',
            currentEditTaskDesc: ''
        });
        this.refreshData();
    }
    doneTask(taskId) {
        fetch(taskListUpdateUrl(taskId))
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Cannot get Todo tasks...");
            }
        })
        .then(json => {
            fetch(`/api/task/${taskId}/`, {
                method: 'PATCH',
                headers: {
                    "X-CSRFToken": $csrf_token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({is_done: !json.is_done}),
            })
            .then(res => {
                if (res.status === 200) {
                    this.refreshData();
                } else {
                    alert('Cannot done task...');
                }
            })
            .catch(err => {
                alert(`Newly done data may be malformed... Error: ${err}`);
            })
        })
        .catch(err => {
            alert(`Get data may be malformed... Error: ${err}`);
        })
    }
    componentDidMount() {
        this.refreshData();
    }
    render() {
        const tasks = this.state.tasks;
        const tasksDone = this.state.tasksDone;
        const amtDone = this.state.amtDone;
        const amtAll = this.state.amtAll;
        return (
            <div className="container">
                <div className="row mt-5 mb-3">
                    <div className="col-md-12 col-lg-12 offset-xl-1 col-xl-10">
                        <h3 className="text-center">Todo List</h3>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12 col-lg-12 offset-xl-1 col-xl-10">
                        <div className="progress mb-2" style={{height: 2.5 + 'rem'}}>
                            <div className="bg-success progress-bar progress-bar-striped" role="progressbar" style={{width: Math.floor((amtDone / amtAll) * 100) + '%'}}>
                                {Math.floor((amtDone / amtAll) * 100) + '% Done'}
                            </div>
                        </div>
                        <ul className="nav nav-pills nav-fill" id="todo-tabs" role="tablist">
                            <li className="nav-item">
                                <a className={"nav-link " + (!this.state.showDone ? 'active' : '')} 
                                    id="todo-tab" onClick={this.showTodo}>Todo</a>
                            </li>
                            <li className="nav-item">
                                <a className={"nav-link " + (this.state.showDone ? 'active' : '')} 
                                    id="todo-done-tab" onClick={this.showDone}>Done</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="todo-tabs-pane">
                            <div className={"tab-pane " + (!this.state.showDone ? 'active' : '')} id="todo-tab-pane">
                                <ul className="list-group">
                                    {tasks.map((task) => {
                                        return <Task taskData={task} 
                                                    key={task.id} 
                                                    done={this.doneTask}
                                                    edit={this.editTask} 
                                                    delete={this.refreshData}>
                                                </Task>
                                    })}
                                </ul>
                            </div>
                            <div className={"tab-pane " + (this.state.showDone ? 'active' : '')} id="todo-done-tab-pane">
                                <ul className="list-group">
                                    {tasksDone.map((task) => {
                                        return <Task taskData={task} 
                                                    key={task.id} 
                                                    done={this.doneTask}
                                                    edit={this.editTask} 
                                                    delete={this.refreshData}>
                                                </Task>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12 col-lg-12 offset-xl-1 col-xl-10">
                        <button className="btn btn-lg btn-success form-control" onClick={this.addTask}>+</button>
                    </div>
                </div>
                <AddTaskModal 
                    show={this.state.isAddTaskShowing} 
                    close={this.closeAddTask} 
                    add={this.closeAddTaskAndRefresh}>        
                </AddTaskModal>
                <EditTaskModal 
                    taskId={this.state.currentEditTaskId} 
                    taskName={this.state.currentEditTaskName} 
                    taskDesc={this.state.currentEditTaskDesc} 
                    show={this.state.isEditTaskShowing} 
                    close={this.closeEditTask} 
                    edit={this.closeEditTaskAndRefresh}>
                </EditTaskModal>
            </div>
        );
    }
} 
export default TodoList;
