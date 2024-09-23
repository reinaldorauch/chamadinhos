# Chamadinhos #

## Requisitos

* PHP 8.2
* MySQL 8.4
* Composer
* Node 20

## Como rodar

Clonar o projeto com o comando:

```bash
git clone https://github.com/reinaldorauch/chamadinhos.git
```

Entrar na pasta `chamadinhos`, copiar o arquivo `.env.example`, colar como `.env` e editar os parâmetros de banco de dados para apontar para uma base de dados limpa do MySQL.

Rodar os seguintes comandos:

* `composer install`
* `npm ci && npm run build`
* `php artisan db:seed TicketStatusSeeder`
* `php artisan serve`

E acessar o sistema pelo link exibido no terminal.
