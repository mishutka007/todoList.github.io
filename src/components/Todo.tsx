import React, { useState } from 'react';

import { GiAnimalSkull } from 'react-icons/gi';
import { FaBiohazard } from 'react-icons/fa';
import { FC } from 'react';
import styled from 'styled-components';
const CheckList = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    row-gap: 5px;
    column-gap: 5px;
    border: 2px solid rgb(51, 53, 175);
    border-radius: 5px;
    width: 560px;
    height: fit-content;
    margin-top: 20px;
    align-items: center;
`;
const ButtonHandleClick = styled.button`
    border: 2px solid rgb(51, 53, 175);
    border-radius: 5px;
    width: 279px;
    height: 30px;
    cursor: pointer;
    touch-action: manipulation;
    :hover {
        background-color: #c2d6f0;
    }
    :active {
        box-shadow: 0 1px 2px 0 rgb(26 115 232 / 45%), 0 2px 6px 2px rgb(26 115 232 / 30%);
        background-color: #1a73e8 !important;
    }
`;
const InputCheckbox = styled.input`
    border: 2px solid rgb(51, 53, 175);
    border-radius: 5px;
    width: 45px;
    height: 45px;
`;
const InputText = styled.input`
    border: 2px solid rgb(157, 158, 236, 0.2);
    border-radius: 5px;
    width: max-content;
    height: max-content;
`;
const InputValueConteiner = styled.p`
    word-break: break-all;
`;
type Todo = {
    id: string;
    title: string;
    completed: boolean;
    deleteEL: (id: string) => void;
    resTask: (id: string, title: string) => void;
    resCheck: (id: string, completed: boolean) => void;
};

const Todo: FC<Todo> = ({ id, title, completed, deleteEL, resTask, resCheck }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputTextValue, setInputTextValue] = useState(title);
    const [isComplete, setIsComplete] = useState(completed);
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        resTask(id, inputTextValue);
        setIsEditing(false);
    };
    const handleChange = () => {
        setIsComplete(!isComplete);
        resCheck(id, !isComplete);
    };

    return (
        <CheckList>
            <InputCheckbox type='checkbox' defaultChecked={isComplete} onClick={handleChange}></InputCheckbox>
            {isEditing ? (
                <InputText
                    type='text'
                    value={inputTextValue}
                    onChange={(e) => setInputTextValue(e.target.value)}
                />
            ) : (
                <InputValueConteiner>{inputTextValue}</InputValueConteiner>
            )}
            <>
                {isEditing ? (
                    <ButtonHandleClick onClick={handleSaveClick}>
                        Save <GiAnimalSkull />
                    </ButtonHandleClick>
                ) : (
                    <ButtonHandleClick onClick={handleEditClick}>
                        Edit <FaBiohazard />
                    </ButtonHandleClick>
                )}
            </>
            <ButtonHandleClick onClick={() => deleteEL(id)}>Delete</ButtonHandleClick>
        </CheckList>
    );
};

export default Todo;
