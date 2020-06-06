import React from 'react'
import './Home.css'
import { FiLogIn } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta Logo" />
                </header>

                <main>
                    <h1>Seu Marketplace de Coleta de Residuos</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</p>

                    <Link to="/create-point">
                        <span><FiLogIn /></span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    )
}

export default Home