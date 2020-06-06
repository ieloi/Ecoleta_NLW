import knex from 'knex';
import path from 'path'; // lidar com caminhos no Node

// __dirname: retorna o caminho para o diretorio do arquivo de onde esta sendo chamada

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;