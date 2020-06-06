import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './CreatePoint.css';
import logo from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import axios from 'axios';
import api from '../../services/api';

import Dropzone from '../../components/Dropzone';

// para arrays ou objetos é necessário informar o tipo da variavel de forma manual
interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const CreatePoint = () => {

    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    // armazenar o valor do estado que foi selecionado pelo usuario
    const [selectedUF, setSelectedUF] = useState("0");
    const [selectedCity, setSelectedCity] = useState("0");

    //localização atual do usuário
    const [initialMapPosition, setInitialMapPosition] = useState<[number, number]>([0, 0]);

    const [selectedMapPosition, setSelectedMapPosition] = useState<[number, number]>([0, 0]);

    // armazenar os valores digitados pelo input
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    })

    // armazenar os itens selecionados pelo usuario
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    // armazenar as informações do arquivo selecionado
    const [selectedFile, setSelectedFile] = useState<File>();

    const history = useHistory();

    // lida com a mudança de UF
    function handleSelectedUF(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUF(uf);
    }

    // lida com a mudança de Estados
    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    }

    // lida com a mudança de marcação de local no mapa
    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedMapPosition([event.latlng.lat, event.latlng.lng]);
    }

    // lidar com os valores que forem digitados nos campos de input pelo usuário
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    // lidar com os itens que forem selecionados pelo usuário
    function handleSelectedItem(id: number) {
        // faz uma busca para verificar se o item que foi clicado pelo usuario ja havia sido escolhido antes
        const alreadySelected = selectedItems.findIndex(item => item === id);

        // caso o item ja foi selecionado, sera feita uma nova lista o excluindo
        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        }
        else {
            // senao o item é adicionado a lista de selecionados
            setSelectedItems([...selectedItems, id]);
        }
    }

    //lidar com os valores que serão enviados pelo formulario
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = selectedUF;
        const city = selectedCity;
        const [ latitude, longitude ] = selectedMapPosition;
        const items = selectedItems;

        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(','));
        if (selectedFile) {
            data.append('image', selectedFile);
        }
        
        await api.post('points',data);

        alert('ponto de coleta criado');

        history.push('/');
    }

    // useEffect: 2 parametros ([qual a função que deve ser executada], [quando eu quero isso]), nao se utiliza async ou await
    // sera util para fazer a requisição de imagens somente uma vez, mesmo quando ele for atualizado
    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, []);

    // pegar os dados da api de UF do IBGE
    useEffect(() => {
        axios.get<IBGEUFResponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);

    // pegar os dados da api de Cidades do IBGE quando a UF mudar
    useEffect(() => {
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        });
    }, [selectedUF])

    // definir a localização inicial do usuario como a localização atual
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setInitialMapPosition([latitude, longitude]);
        })
    }, [])

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta Logo" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para a home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br /> ponto de Coleta</h1>

                <Dropzone onFileUploaded={setSelectedFile} />

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input type="text" name="name" id="name" onChange={handleInputChange} />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" onChange={handleInputChange} />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialMapPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedMapPosition}>

                        </Marker>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUF} onChange={handleSelectedUF}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}> {uf} </option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectedCity}>
                                <option value="0">Selecione uma Cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}> {city} </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de Coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => {
                            return (
                                <li key={item.id} className={selectedItems.includes(item.id) ? 'selected' : ''} onClick={() => handleSelectedItem(item.id)}>
                                    <img src={item.image_url} alt={item.title} />
                                    <span>{item.title}</span>
                                </li>
                            )
                        })}


                    </ul>
                </fieldset>

                <button type="submit">Cadastrar ponto de Coleta</button>
            </form>
        </div>
    )
}

export default CreatePoint;