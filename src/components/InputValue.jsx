import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
const FormTask = styled.form`
    grid-column: span 3;
    display: flex;
    gap: 10px;
`;
const InputValueTask = styled.input`
    border: 2px solid rgb(51, 53, 175);
    border-radius: 5px;
    width: max-content;
    width: 360px;
`;
const ButtonSendForm = styled.button`
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

function InputValue({ task, setTask }) {
    const [inputValue, setInputValue] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const addTask = [...task, { title: inputValue, id: uuidv4(), completed: false }];
        setTask(addTask);

        setInputValue('');
        localStorage.setItem('ToDoShka', JSON.stringify(addTask));
    };
    return (
        <FormTask onSubmit={handleSubmit}>
            <InputValueTask
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
            />
            <ButtonSendForm type='submit'>Add</ButtonSendForm>
        </FormTask>
    );
}

export default InputValue;
