// import React from 'react';
import Todolist from './components/Todolist';
import styled from 'styled-components';
const AppCont = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 650px;
`;

function App() {
    return (
        <AppCont>
            <div>TODOLIST</div>
            <Todolist />
        </AppCont>
    );
}

export default App;
