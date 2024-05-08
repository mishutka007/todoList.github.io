import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Tasks } from './types';
import Todo from './Todo';
import InputValue from './InputValue';
import { filterTask } from './types';
const TodolistFunc = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto;
    row-gap: 20px;
    column-gap: 10px;
    width: fit-content;
    height: fit-content;
`;
const ButtonBtn = styled.button`
    border: 2px solid rgb(51, 53, 175);
    border-radius: 5px;
    width: 180px;
    height: 40px;
    cursor: pointer;
    touch-action: manipulation;
    :hover {
        background-color: #c2d6f0;
    }
    :active {
        box-shadow: 0 1px 2px 0 rgb(26 115 232 / 45%), 0 2px 6px 2px rgb(26 115 232 / 30%);
        background-color: #1a73e8 !important;
    }
    :focus {
        box-shadow: 0 1px 2px 0 rgb(26 115 232 / 45%), 0 2px 6px 2px rgb(26 115 232 / 30%);
        background-color: #1a73e8;
    }
`;
function filterTasks(tasks: Tasks[], filter: filterTask) {
    switch (filter) {
        case filterTask.All:
            return tasks;
        case filterTask.DONE:
            return tasks.filter((el) => el.completed);
        case filterTask.NOTDONE:
            return tasks.filter((el) => !el.completed);
    }
}

function Todolist() {
    const [task, setTask] = useState<Tasks[]>(JSON.parse(localStorage.getItem('ToDoShka') || '[]'));
    const [filter, setFilter] = useState(filterTask.All);

    const filteredTasks = filterTasks(task, filter);

    const deleteEL = (id: string) => {
        const updatedTasks = task.filter((task) => task.id !== id);
        setTask(updatedTasks);
        localStorage.setItem('ToDoShka', JSON.stringify(updatedTasks));
    };
    const resetTask = (id: string, title: string) => {
        const resetTitle = task.map((el) => (el.id !== id ? el : { ...el, title }));
        setTask(resetTitle);
        localStorage.setItem('ToDoShka', JSON.stringify(resetTitle));
    };
    const resetChecked = (id: string, completed: boolean) => {
        const resetCheck = task.map((el) => (el.id !== id ? el : { ...el, completed }));

        setTask(resetCheck);
        localStorage.setItem('ToDoShka', JSON.stringify(resetCheck));
    };

    const tasksLenghth =
        filteredTasks.length < 2
            ? `Мало дел: ${filteredTasks.length} `
            : `Многа дел: ${filteredTasks.length} `;

    return (
        <div>
            <TodolistFunc>
                <InputValue task={task} setTask={setTask} />
                <ButtonBtn
                    onClick={() => {
                        setFilter(filterTask.All);
                    }}
                >
                    Show All Tasks
                </ButtonBtn>
                <ButtonBtn
                    onClick={() => {
                        setFilter(filterTask.NOTDONE);
                    }}
                >
                    Show Active Tasks
                </ButtonBtn>
                <ButtonBtn
                    onClick={() => {
                        setFilter(filterTask.DONE);
                    }}
                >
                    Show completed Tasks
                </ButtonBtn>
            </TodolistFunc>
            <div>{tasksLenghth}</div>
            <div>
                {filteredTasks.length === 0
                    ? 'Придумай себе дела'
                    : filteredTasks.map((el) => (
                          <Todo
                              key={el.id}
                              id={el.id}
                              title={el.title}
                              completed={el.completed}
                              deleteEL={deleteEL}
                              resTask={resetTask}
                              resCheck={resetChecked}
                          />
                      ))}
            </div>
        </div>
    );
}

export default Todolist;
