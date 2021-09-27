var express = require('express');
var router = express.Router();
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
// run jquery in node js
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'manavideo',
  password: '123456',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {
 
  res.render('index', {title:'Home page'});
});
// proccess data of table rules
// get all data rules
router.get('/list', function(req, res, next) {
 
  pool.query("SELECT * FROM rules", (error, response) => {
  
    if(error) {
      console.log(error);      
    }else{
     // console.log(response.rows);
  //   console.log('duoc roi');
     res.send(response.rows);
     // res.render( response.rows);
      //pool.end()
    }
   
   
  })
  console.log('day la api lay du lieu');
});
// add data rules 
router.get('/addrules',function(req,res,next){
  res.render('./rules/add',{title:'Thêm Luật'});
});
router.post('/addrules',function(req,res,next){
  var name_rules = req.body.name_rules;
  parent_rules = req.body.parent_rules.toString(); // convert to string with database
  child_rules = req.body.child_rules.toString();
  status_rules = req.body.status_rules;
  //console.log('name : ' + name_rules + ', parent rules : '+parent_rules + ', child rules : '+child_rules + ', status rules : ' + status_rules);
  pool.query("insert into public.rules (name_rules,parent_rules,child_rules,status_rules) values ($1,$2,$3,$4)",[name_rules,parent_rules,child_rules,status_rules],(err,response) => {
    if(err){
      res.send(err);
    }else{
      res.send('them du lieu thanh cong');
    }
  });

});
// edit data rules
router.get('/updaterules',function(req,res,next){
  res.render('./rules/edit',{title:'Sửa Luật'});
});
router.post('./updaterules',function(req,res,next){
  
});

module.exports = router;
