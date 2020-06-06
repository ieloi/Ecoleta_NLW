import React from 'react';

interface HeaderProps {
    title? : string; // a ? indica que pode ser obrigatório ou não
}

// React.FC = React Function Component
// props = recebe todas as propriedades que estão sendo enviadas ao componente
const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <h1>Ecoleta</h1>
            <h2>{props.title}</h2>
        </header>
    )
}

export default Header;