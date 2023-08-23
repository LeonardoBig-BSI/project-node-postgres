
const Client = require('pg').Client;

const cliente = new Client({
    user: "postgres",
    password: "postgres123",
    host: "localhost",
    port: 5432,
    database: "Carros"
})

/* Maneira mais simples de fazer conexão com o banco de dados */
// cliente.connect();
// cliente.query("SELECT * FROM carros")
// .then((result) => {
//     const resultado = result.rows;
//     console.table(resultado);
// })
// .finally(() => cliente.end())

/* Maneira recomendada para fazer conexão com o banco de dados */
getCarros()
setCarros("hyndai", "hb20");
delCarros("hb20")

async function getCarros() // Obtendo todos os carros
{
    try {

        console.log("Iniciando a conexão...");
        await cliente.connect();
        console.log("Conexão bem sucedida!");

        const resultado = await cliente.query("SELECT * FROM carros");
        console.table(resultado.rows);
    }
    catch(error) {
        console.log("Ocorreu um erro inesperado! Erro: " +error);
    }
    finally {
        await cliente.end();
        console.log("Cliente desconectado!");
    }
}

async function setCarros(marca, modelo) // inserir um carro
{
    try {

        console.log("Iniciando a conexão...");
        await cliente.connect();
        console.log("Conexão bem sucedida!");

        await cliente.query('INSERT INTO carros("marca","modelo") values('+"'"+marca+"', '"+modelo+"');")
        console.log("Valor inserido na tabela!");

        const resultado = await cliente.query("SELECT * FROM carros");
        console.table(resultado.rows);
    }
    catch(error) {
        console.log("Ocorreu um erro inesperado! Erro: " +error);
    }
    finally {
        await cliente.end();
        console.log("Cliente desconectado!");
    }
}

async function delCarros(modelo) // remover um carro
{
    try {

        console.log("Iniciando a conexão...");
        await cliente.connect();
        console.log("Conexão bem sucedida!");

        await cliente.query("DELETE FROM carros WHERE modelo = '" +modelo+ "';");
        console.log("Valor removido da tabela!");

        const resultado = await cliente.query("SELECT * FROM carros");
        console.table(resultado.rows);
    }
    catch(error) {
        console.log("Ocorreu um erro inesperado! Erro: " +error);
    }
    finally {
        await cliente.end();
        console.log("Cliente desconectado!");
    }
}