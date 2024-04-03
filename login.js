// install express --save
//npm install myqls2 --save
//npm install body-parser
// Declaraçõa de constantes para utilização das dependencias necessarias para este projeto
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
// constante que recebe todas as funções da dependencia express
const app = express();
// todos os arquivos estatios devem cosntar na pasta public
app.use(express.static('public'));
//armazena os dados da conexão
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root99',
    database: 'controleEstoque'
})
 
connection.connect(function(err){
    if(err){
        console.error('Error',err);
        return;
    }console.log('Conexão estabelecida');
})

//Captura os dados do formulario html
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

//Rota default
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
})
//Rota esqueci Senha
app.get('/esqueciSenha', function(req, res){
    res.sendFile(__dirname+'/public/html/esqueci.html');
})
//
app.get('/menu', function(req, res){
  res.sendFile(__dirname+'/public/html/menu.html');
})
app.get('/cadastroDeProduto', function(req, res){
  res.sendFile(__dirname+'/public/html/casdastroDeProduto.html');
})
app.get('listagemDeProduto', function(req, res){
  res.sendFile(__dirname+'/public/html/listagemDeProduto.html')
})

//Rota Login
//req solicita e res envia
app.post('/login', function(req, res){
  const login = req.body.login;
  const senha  = req.body.senha;

  connection.query('SELECT * FROM user WHERE email=? AND senha=?', [login, senha], function(error, results, fields){
    if(error){
      console.log('Erro ao execultar a consulta, ', error);
      res.status(500).send('Erro interno ao verificar credenciais.')
      return;
    }if(results.length > 0){
      res.redirect('/menu');
    }else{
      res.status(401).send('Credencias Inválidas');
    }
  })
});
// funcao para rodar a porta do servidor
app.listen(8081, function(){
    console.log("Servidor rodando na URL http://localhost:8081");
})