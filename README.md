# API Todo Encodde

Repositório do projeto Encodde.
Uma API REST para gerenciamento de tarefas.

A API foi desenvolvida utilizando a tecnologia [Node.js](https://nodejs.org/en/).

## Requisitos

- Node.js e NPM instalados

## Instalação

- Clonar o projeto (Ou baixar o [.zip](https://github.com/juakacc/api-todo-encodde/archive/master.zip) do projeto)
```
$ git clone https://github.com/juakacc/api-todo-encodde.git //caso tenha o git instalado
$ cd api-todo-encodde/
```
- Instalar as dependências do projeto
```
$ npm i
```

## Configurações 

- Alterar as variáveis de ambiente presentes em ``.env.exemplo`` para sua configuração atual
```
SECRET_KEY_TOKEN=secret_key_token

LOCAL_DB={localizacao_do_banco}
DATABASE_DB={nome_do_banco}
USERNAME_DB={nome_do_usuario}
PASSWORD_DB={senha_do_usuario}
```

- Renomear o arquivo ``.env.exemplo`` para ``.env``

### Execução

- Levantando o servidor
```
$ npm start
```

### Considerações finais

- Qualquer dúvida enviar e-mail para: juakacc@gmail.com