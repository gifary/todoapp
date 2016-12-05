const express = require('express');
const router = express.Router();

const index = require('../middlewares/index');

router.get('/', index.index);
router.post('/', index.add);

router.get('/list', index.list);
router.get('/listone', index.listOne);
router.get('/edit/:id', index.edit);
router.post('/edit/:id/:status_edit', index.edit);
router.post('/delete/:id', index.delete);


module.exports = router;
