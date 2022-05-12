MVC - Model View Controller

Model - Interege com o banco de dados, 
        conecção com o banco de dados 
        responsável por reesgatar, atualizar, remover e criar (CRUD)
        Sequelize mapea a tabela

View - Apresenta os dados que estão no banco  
       interage com o Controller
       exibe dados 
       interação com o usuário através de forms
       exibição feita através de HTML

Controller - interação com o Model e View
             determina qual View sera impressa
             terão os códigos parecidos com as rotas

Estrutura:

Controller - Pasta que fica os arquivos de Controllers
Models - Pasta que fica os arquivos de Model (conecção com banco de dados)
View- Pasta que fica os arquivos de Views (arquivos front-end)
routes - Pasta que fica os arquivos de rotas (GET, POST, DELETE)
index - arquivo de inicialização