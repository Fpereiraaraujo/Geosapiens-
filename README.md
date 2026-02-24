====================================================================
          GEOSAPIENS - SISTEMA DE GERENCIAMENTO DE ATIVOS
====================================================================

1. SOBRE O PROJETO
Este projeto e uma solucao Full-Stack para o gerenciamento de ativos 
e equipamentos corporativos. A aplicacao permite cadastrar, listar, 
editar e excluir ativos, garantindo a integridade dos dados atraves 
de regras de negocio consistentes.

2. TECNOLOGIAS UTILIZADAS
[Front-end]
- React com Vite e TypeScript
- Tailwind CSS v4 para estilizacao
- React Hook Form + Zod para validacao
- Axios (HTTP) e Sonner (Toasts/Alertas)

[Back-end]
- Java com Spring Boot
- Banco de Dados PostgreSQL
- Swagger / OpenAPI para documentacao

[Infraestrutura]
- Docker e Docker Compose

3. ARQUITETURA E REGRAS DE NEGOCIO
- Arquitetura Hexagonal (Ports and Adapters) no back-end: O dominio 
  da aplicacao e totalmente isolado das camadas de infraestrutura.
- Validacoes Duplas (UX e Integridade): 
  * Bloqueio de datas de aquisicao no futuro (via Zod e Java).
  * Impossibilidade de cadastrar equipamentos com numeros de 
    serie duplicados.
- Tratamento de excecoes global com GlobalExceptionHandler no back-end.
- Filtros de pesquisa no front-end configurados para ignorar acentos 
  e diferencas entre maiusculas e minusculas.

4. COMO EXECUTAR O PROJETO
A aplicacao foi containerizada e nao exige a instalacao de dependencias 
locais (como Node, Java ou Postgres). O unico pre-requisito e possuir 
o Docker e o Docker Compose instalados na maquina.

Passo 1: Abra o terminal na pasta raiz do projeto.
Passo 2: Execute o comando abaixo para construir e subir os containers:
         docker-compose up --build -d
Passo 3: Aguarde a inicializacao. O banco de dados, o back-end e o 
         front-end serao configurados automaticamente.

5. ACESSO A APLICACAO
- Interface do Usuario: http://localhost:5173
- API (Back-end): http://localhost:8080/assets
- Documentacao (Swagger): http://localhost:8080/swagger-ui/index.html

Para parar a execucao e desligar os containers, utilize o comando:
docker-compose down

====================================================================
Desenvolvido por Fernando Pereira

