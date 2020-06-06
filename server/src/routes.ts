import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

import { celebrate, Joi } from 'celebrate';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();
// .get recebe dois parametros (rota, function)
// rota é o endereço completo da requisição
// recurso é a entidade que será acessada 

// tipos de requisição
// GET: Buscar uma ou mais informações do Backend
// POST: Criar uma nova informação no Backend
// PUT: Atualizar uma informação existente no backend
// DELETE: Remover uma informação existente no backend

// Exemplos de rotas
// GET: localhost:3333/users -> listar usuarios
// PUT: localhost:3333/users/3 -> listar dados do usuário com id=3
// POST: localhost:3333/users -> criar usuário
// PUT: localhost:3333/users/3 -> atualizar dados do usuário com id=3
// DELETE: localhost:3333/users/3 -> remover dados do usuário com id=3

// Request params: parametros presentes na propria rota que identificam um recurso
// Query params: parametros que vem na propria rota geralmente opcionais para filtros, paginação
// Request Body: parametros que ficam no corpo da requisição que são utilizados para criação/atualização de informações

// SELECT * FROM usuarios WHERE nome = "icaro";
// knex('usuarios').where('nome','icaro').select('*')

routes.get('/items', itemsController.index);
routes.post(
    '/points', 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false,
    }), 
    pointsController.create);
routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);

// opções utilizadas para criar links: index, show, create(store), update, delete(destroy)

export default routes;