import React, { useState } from 'react';

import { GiAnimalSkull } from "react-icons/gi";
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
const ButtonBtn2 = styled.button`
    border: 2px solid rgb(51, 53, 175);
    border-radius: 5px;
    width: 279px;
    height: 30px;
`;
const Input2 = styled.input`
    border: 2px solid rgb(51, 53, 175);
    border-radius: 5px;
    width: 45px;
    height: 45px;
`;
const Input3 = styled.input`
    border: 2px solid rgb(157, 158, 236, 0.2);
    border-radius: 5px;
    width: max-content;
    height: max-content;
`;
const InputValueConteiner = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
`;
type TodoList = {
    id: string;
    title: string;
    completed: boolean;
    deleteEL: (id: string) => void;
    ResTask: (id: string, title: string) => void;
    ResCheck: (id: string, completed: boolean) => void;
};

const TodoLis: FC<TodoList> = ({ id, title, completed, deleteEL, ResTask, ResCheck }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [input2Value, setInput2Value] = useState(title);
    const [complete, setComplete] = useState(completed);
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        ResTask(id, input2Value);
        setIsEditing(false);
    };
    const handleChange = () => {
        setComplete(!complete);
        ResCheck(id, !complete);
    };

    return (
        <CheckList>
            <Input2 type='checkbox' defaultChecked={complete} onClick={handleChange}></Input2>
            {isEditing ? (
                <Input3
                    type='text'
                    value={input2Value}
                    onChange={(e) => setInput2Value(e.target.value)}
                />
            ) : (
                <InputValueConteiner>{input2Value}</InputValueConteiner>
            )}
            <>
                {isEditing ? (
                    <ButtonBtn2 onClick={handleSaveClick}>Save <GiAnimalSkull /></ButtonBtn2>
                ) : (
                    <ButtonBtn2 onClick={handleEditClick}>Edit <FaBiohazard /></ButtonBtn2>
                )}
            </>
            <ButtonBtn2 onClick={() => deleteEL(id)}>Delete</ButtonBtn2>
        </CheckList>
    );
};

export default TodoLis;
