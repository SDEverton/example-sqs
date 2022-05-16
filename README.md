<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://cdnstatic8.com/guilhermeteles.com.br/wp-content/uploads/2020/03/aws-sqs1.png" alt="Project logo"></a>
</p>

<h3 align="center">Filas com SQS - Node JS - Prisma - Express</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/SDEverton/iclinic_test/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/SDEverton/iclinic_test/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Descrição do teste
    <br> 
</p>

## 📝 Índice

- [Sobre](#about)
- [Instalação](#getting_started)
- [Testes](#tests)
- [Autor](#authors)

## 🧐 Sobre <a name = "about"></a>

O teste foi realizado como prova de conceito para um projeto.


## 🏁 Iniciando <a name = "getting_started"></a>

### Pré-requisitos

- [NodeJS](https://nodejs.org/en/) - Server Environment

### Principais técnologias envolvidas (libs e outros)

Cors
Dotenv
Express
Postgres
Prisma
SQS
SendGrid

Como o propósito era apenas uma prova de conceito (POC) não foi levado em consideração conceitos como SOLID

### Startando aplicação

Para iniciar a aplicação basta seguir o comando abaixo

```
yarn or npm i

criar um banco de dados (usei o postgres pois tinha ele em uma imagem Docker)

crie um arquivo .env na raiz do projeto tomando como base o arquivo .env.example e insira as redênciais AWS, sendgrid e de banco de dados.

npx prisma migrate dev
```

```
yarn dev (servidor http)
yarn run:sqs (fila SQS)

http://localhost:3333
```

A chamada POST é no path raiz e deve conter como parâmentro

```
{
	"name": "Everton Oliveira",
	"age": 34,
	"email": "evertonsdsilva@gmail.com"
}
```

## ✍️ Autor <a name = "authors"></a>

- [Everton Oliveira](https://github.com/SDEverton)