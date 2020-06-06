//multer (npm i multer) é uma extensão para lidar com o upload de imagens
import multer from 'multer';
import path from 'path'; // dependencia ja existente no node, serve para lidar com caminhos (vale para todos os sistemas operacionais)
import crypto from 'crypto'; // cria hash aleatório de dados 

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        
        // request = acesso as informações da requisição
        // file = dados do arquivo que deve ser adicionado
        // callback = função que é disparada quando se termina de usar o filename
        filename: (request, file, callback) => {
            const hash = crypto.randomBytes(6).toString('hex');

            const filename = `${hash}-${file.originalname}`

            callback(null, filename);
        }
    })
}