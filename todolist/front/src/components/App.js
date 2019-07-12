import React from 'react';
import ReactDOM from 'react-dom';

import TodoList from './TodoList.jsx'

const wrapper = document.getElementById("app");

const App = () => (
    <TodoList></TodoList>
)

wrapper ? ReactDOM.render(<App />, wrapper) : null
