// import React from 'react';
import Header from './components/Header';
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
            <Header />
        </AppCont>
    );
}

export default App;
