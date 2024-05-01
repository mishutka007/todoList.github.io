import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Dudu } from './types';
import TodoLis from './TodoLis';
import InputValue from './InputValue';

const HeaderFunc = styled.div`
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
function FilterTasks(Tasks: Dudu[], filter: string) {
    if (filter === 'all') {
        return Tasks;
    } else if (filter === 'completed') {
        return Tasks.filter((el: Dudu) => el.completed);
    } else {
        return Tasks.filter((el: Dudu) => !el.completed);
    }
}

function Header() {
    const [task, setTask] = useState<Dudu[]>(JSON.parse(localStorage.getItem('ToDoShka') || '[]'));
    const [filter, setFilter] = useState('all');

    const filteredTasks = FilterTasks(task, filter);

    const deleteEL = (id: string) => {
        const updatedTasks = task.filter((task) => task.id !== id);
        setTask(updatedTasks);
        localStorage.setItem('ToDoShka', JSON.stringify(updatedTasks));
    };
    const ResTask = (id: string, title: string) => {
        const res = task.map((el) => {
            if (el.id === id) {
                return {
                    ...el,
                    title: title,
                };
            } else {
                return el;
            }
        });
        setTask(res);
        localStorage.setItem('ToDoShka', JSON.stringify(res));
    };
    const ResCheck = (id: string, completed: boolean) => {
        const ref = task.map((el) => {
            if (el.id === id) {
                return {
                    ...el,
                    completed: completed,
                };
            } else {
                return el;
            }
        });
        setTask(ref);
        localStorage.setItem('ToDoShka', JSON.stringify(ref));
    };

    const todoelement = useMemo(() => {
        return filteredTasks.map((el: Dudu) => (
            <TodoLis
                key={el.id}
                id={el.id}
                title={el.title}
                completed={el.completed}
                deleteEL={deleteEL}
                ResTask={ResTask}
                ResCheck={ResCheck}
            />
        ));
    }, [filteredTasks, deleteEL, ResTask]);
    const tasksLenghth = () => {
        return todoelement.length < 2
            ? `Мало дел: ${todoelement.length} `
            : `Многа дел: ${todoelement.length} `;
    };
    const taskNull = () => {
        return todoelement.length === 0 ? 'Придумай себе дела' : todoelement;
    };
    return (
        <div>
            <HeaderFunc>
                <InputValue task={task} setTask={setTask} />
                <ButtonBtn
                    onClick={() => {
                        setFilter('all');
                    }}
                >
                    Show All Tasks
                </ButtonBtn>
                <ButtonBtn
                    onClick={() => {
                        setFilter('notcompleted');
                    }}
                >
                    Show Active Tasks
                </ButtonBtn>
                <ButtonBtn
                    onClick={() => {
                        setFilter('completed');
                    }}
                >
                    Show completed Tasks
                </ButtonBtn>
            </HeaderFunc>
            <div>{tasksLenghth()}</div>
            <div>{taskNull()}</div>
        </div>
    );
}

export default Header;
