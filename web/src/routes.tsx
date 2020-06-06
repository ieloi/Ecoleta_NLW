import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'

const Routes = () => {
    return (
        // exact faz a verificação de igualdade
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreatePoint} path="/create-point" />
        </BrowserRouter>
    )
}

export default Routes;