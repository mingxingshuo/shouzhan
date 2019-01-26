var express = require('express');
var router = express.Router();
var UserTagModel = require('../model/UserTag');
var MaterialModel = require('../model/Material');
var MsgHistoryModel = require('../model/MsgHistory');
var getMaterials = require('../script/get_material');
var sendTag = require('../script/send_tag_message');

router.get('/', async (req, res, next) => {
  let docs = getMaterials.get_aterials(req.query.code)
  if (docs) {
    res.send({
      success: '同步成功',
      data: docs
    })
  }
})

router.get('/show', async (req, res, next) => {
  let docs = await MaterialModel.find({
    code: req.query.code,
    type: 'news'
  }).sort({
    'update_time': -1
  }).limit(5)
  res.send({
    success: '成功',
    data: docs
  })
})

router.get('/send_timing', async (req, res, next) => {
  console.log(req.query.id)
  let id = req.query.id,
      message = {
        tagId: Number(req.query.tagId),
        isTiming: req.query.isTiming,
        timing: Number(req.query.timing)
      }
  let result = await MaterialModel.findByIdAndUpdate(id, message, {new: true})
  if(result) {
    res.send({success: "设置定时成功", data: result})
  } else {
    res.send({err: "设置失败，请重新尝试"})
  }
})

router.get('/tag', async (req, res, next) => {
  let doc = await UserTagModel.find({
    code: req.query.code
  })
  res.send({
    data: doc
  })
})

router.get('/clear', async (req, res, next) => {
  let docs = await MaterialModel.remove({code: req.query.code})
  if(docs) {
    res.send({success: '已删除全部素材，如有需要请重新同步素材'})
  }
})

router.get('/sendMsg', async (req, res, next) => {
  var id = req.query.id;
  var tagId = req.query.tagId;
  var mediaId = req.query.mediaId;
  let docs = await sendTag.get_message(id, tagId, mediaId);
  if(!docs){
    return res.send({
       error: '正在发送消息'
    })
  }
  await MaterialModel.findById(id, async (err, result) => {
    if(err) {
      res.send({error: "发送失败"})
    } else {
      result = result.toObject()
      delete result._id;
      result.tagId = tagId
      result.msg_id = docs.msg_id
      result.update_time = Date.now() / 1000
      console.log(result)
      let message = await MsgHistoryModel.create(result)
      res.send({
        success: '发送成功', result: result, docs: docs, message: message
      })
    }
  })
  
})

module.exports = router;