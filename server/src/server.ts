import express, { json } from 'express';
import cors from 'cors';
import routes from './routes'
import path from 'path'

import { errors } from 'celebrate'

const app = express();

app.use(cors())
// identificar para o express para que ele entenda que o formato do corpo das requisições esta no formato json
app.use(express.json());
app.use(routes);

//express.static é utilizado para entregr arquivos estaticos (imagens, pdf, word, downloads)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// lidar com a forma que os erros serao enviados
app.use(errors());

app.listen(3333); // listen(numero da porta a ser utiizado)