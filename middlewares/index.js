const Todo = require('../models/todo');

var query_get_all = Todo.find().exec();
var query_get_one = function(req){
  return Todo.findOne({"_id":req.params.id}).exec();
};
module.exports = {
  index(req, res, next) {
    res.render('index', { title: 'To Do App' });
  },
  list(req, res, next) {
  	query_get_all.then(function(list){
      var data=[];
      list.forEach(function(element, index, list) {
        temp_list = {
          id : element._id.toString(),
          judul : element.judul,
          deskripsi : element.deskripsi,
          tanggal : element.tanggal.toString()
        };
        data.push(temp_list);
      });
      res.render('list', { title:"list todo", data: data });
    });
  },
  listOne(req, res, next) {
    query_get_one.then(function(list){
        return res.json({
          meta: {
            code: 200,
            message: 'Todo list',
          },
          data: list,
        });      
    })
    .catch(ex => {
        return res.json({
          meta: {
            code: 500,
            message: ex.message,
          },
          data: {},
        });
    });
  },
  add(req, res, next) {
    const _todo = new Todo(req.body);
    _todo.save()
      .then(inserted => {
        return res.json({
          meta: {
            code: 200,
            message: 'Todo saved',
          },
          data: inserted,
        });
      })
      .catch(ex => {
        return res.json({
          meta: {
            code: 500,
            message: ex.message,
          },
        });
      });
  },
  edit(req, res, next) {
    var query_edit = query_get_one(req);
    if(req.params.status_edit > 0 && req.params.status_edit ){
      query_edit.then(function(todo){
        todo.judul=req.body.judul;
        todo.deskripsi=req.body.deskripsi;
        todo.save();
        res.redirect('/list');
      });
    }else{
      query_edit.then(function(list_one){
        temp_list = {
            id : list_one._id.toString(),
            judul : list_one.judul,
            deskripsi : list_one.deskripsi
        };
        res.render('edit', { title:"Edit todo", data: temp_list });
      });
    }
  },
  delete(req, res, next) {
    var query_edit = query_get_one(req);
    query_edit.then(function(todo){
        todo.remove();
        res.redirect('/list');
    });
  },
};