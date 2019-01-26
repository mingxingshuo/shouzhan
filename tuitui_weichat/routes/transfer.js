var express = require('express');
var router = express.Router();
var TransferModel = require('../model/Transfer');
var DomainModel = require('../model/Domain');
var mem = require('../util/mem.js')
router.get('/', async(req, res, next) => {
    var messages = await TransferModel.find();
    var domain_names = await DomainModel.find();
    res.send({messages: messages, domain_names: domain_names})
})

router.get('/update_links', async(req, res, next) => {
    var domain_name = req.query.domain_name, 
    messages = await TransferModel.find(),
    domain_names = await DomainModel.findByIdAndUpdate('5b6d0b899a9fab38f48b5b10', {domain_name: domain_name})
    for(var i=0,mLength=messages.length;i<mLength;i++){
        messages[i].links[0] = domain_name + '/tuiguang' + messages[i].links[0].split('/tuiguang')[1]
        var docs = await TransferModel.findByIdAndUpdate(messages[i]._id, {links: messages[i].links})
    }
    res.send({success: '域名修改成功'})
    mem.set('transfer_'+req.params.index,{},60).then(function(){
         console.log('---------set transfer value---------')
    })
})

router.post('/create', async(req, res, next)=> {
    var message = {
        id:req.body.id,
        title: req.body.title,
        links: req.body.links
    }
    var docs = await TransferModel.create(message);
    if (docs) {
        res.send({success: '成功'})
    } else {
        res.send({err: '创建失败，请检查输入是否有误'})
    }
})

router.post('/update', async(req, res, next) => {
    var id = req.body._id;
    var message = {
        id:req.body.id,
        title: req.body.title,
        links: req.body.links
    }
    var docs = await TransferModel.findByIdAndUpdate(id, message)
    if (docs) {
        res.send({success: '修改成功'})
        mem.set('transfer_'+req.params.index,{},60).then(function(){
             console.log('---------set transfer value---------')
        })
    } else {
        res.send({err: '修改失败'})
    }
})

router.get('/delete', async(req, res, next) => {
    var id = req.query.id;
    await TransferModel.remove({_id: id}, (err, data) => {
        if(data) {
            res.send({success: '删除成功'})
        } else {
            res.send({err: '删除失败'})
        }
    })
    
})


module.exports = router
