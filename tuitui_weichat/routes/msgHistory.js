var express = require('express');
var router = express.Router();
var MsgHistoryModel = require('../model/MsgHistory');
var weichat_util = require('../util/get_weichat_client.js')

router.get('/', async (req, res, next) => {
  let docs = await MsgHistoryModel.find({
    code: req.query.code,
    type: 'news'
  }).sort({
    'update_time': -1
  }).limit(10)
  res.send({
    success: '成功',
    data: docs
  })
})

router.get('/del_msg', async (req, res, next) => {
  var api = await weichat_util.getClient(req.query.code);
  api.deleteMass(req.query.msg_id, Number(req.query.article_idx), (err, result) => {
    console.log('result------------------------', result, 'result------------------------')
    console.log('err------------------------', err, 'err------------------------')
    res.send({success: '删除成功'})
  });
})

router.get('/clear', async (req, res, next) => {
  let docs = await MsgHistoryModel.remove({code: req.query.code})
  if(docs) {
    res.send({success: '已删除全部历史记录'})
  }
})

module.exports = router;