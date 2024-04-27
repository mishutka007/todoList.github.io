import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Dudu } from './types';
import { v4 as uuidv4 } from 'uuid';
import TodoLis from './TodoLis';

const HeaderFunc = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto;
    row-gap: 20px;
    column-gap: 10px;
    width: fit-content;
    height: fit-content;
`;
const FormBtn = styled.form`
    grid-column: span 3;
    display: flex;
    gap: 10px;
`;
const ButtonBtn = styled.button`
    border: 2px solid rgb(51, 53, 175);
    border-radius: 5px;
    width: 180px;
    height: 40px;
`;
const Input1 = styled.input`
    border: 2px solid rgb(51, 53, 175);
    border-radius: 5px;
    width: max-content;
    width: 360px;
`;

function FilterTasks(Tasks: any, filter: any) {
    if (filter === 'all') {
        return Tasks;
    } else if (filter === 'completed') {
        return Tasks.filter((el: any) => el.completed);
    } else {
        return Tasks.filter((el: any) => !el.completed);
    }
}

function Header() {
    const [inputValue, setInputValue] = useState('');
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
        const ref =task.map((el) => {
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
        return filteredTasks.map((el: any) => (
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
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const sasa = [...task, { title: inputValue, id: uuidv4(), completed: false }];
        setTask(sasa);

        setInputValue('');
        localStorage.setItem('ToDoShka', JSON.stringify(sasa));
    };
    const handleAllTasks = () => {
        setFilter('all');
    };
    const handleActiveTasks = () => {
        setFilter('notcompleted');
    };

    const handleCompliteTasks = () => {
        setFilter('completed');
    };
    const tasksLenghth = () => {
        return todoelement.length < 2 ? 'Мало дел:' : 'Многа дел:';
    };
    return (
        <div>
            <HeaderFunc>
                <FormBtn onSubmit={handleSubmit}>
                    <Input1
                        type='text'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <ButtonBtn type='submit'>Add</ButtonBtn>
                </FormBtn>
                <ButtonBtn onClick={handleAllTasks}>Show All Tasks</ButtonBtn>
                <ButtonBtn onClick={handleActiveTasks}>Show Active Tasks</ButtonBtn>
                <ButtonBtn onClick={handleCompliteTasks}>Show completed Tasks</ButtonBtn>
            </HeaderFunc>
            <div>
                {tasksLenghth()} {todoelement.length}
            </div>
            <div>{todoelement}</div>
        </div>
    );
}

export default Header;
