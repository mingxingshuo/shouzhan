var express = require('express');
var router = express.Router();
var TuiGuangModel = require('../model/TuiGuang.js');
var DomainModel = require('../model/Domain.js');
var TokenArrModel = require('../model/TokenArr.js');
var BannerModel = require('../model/Banner.js');
var multer = require('multer');
var fs = require('fs')
var mem = require('../util/mem.js')
var juedui_lujing = '/home/work/tuitui_program/project/public/images/tuiguang'

var upload = multer({
    dest: juedui_lujing
});

router.post('/novel/upload', upload.single('imageFile'), function(req, res, next) {
    fs.rename(req.file.path, juedui_lujing+"/"+req.file.filename+'.jpg', function(err) {
        if (err) {
            throw err;
        }
        console.log('上传成功!');
    })
    res.send({filename: req.file.filename + '.jpg'});
})

router.post('/update', async (req, res, next) => {
    let id = '5b76aa2ac3ed4a4798d7045d';
    let messages = {
        image: req.body.image,
        link: req.body.link,
        position: req.body.position
    }
    let docs = await BannerModel.findByIdAndUpdate(id, messages)
    let docs1 = await BannerModel.find()
    res.send({success: 'ok', data: docs1})
})

router.post('/novel/add', (req, res, next) => {
    TuiGuangModel.find({id: req.body.id}, function(err, data){
        if (err) {
            console.log("Error:" + err);
        }else {
            if (data != '') {
                res.send({err: '此id已存在'})
            } else {
                var novelInfo = {
                    type: req.body.type,
                    id: req.body.id,
                    pageTitle: req.body.pageTitle,
                    articleTit: req.body.articleTit,
                    name: req.body.name,
                    desc: req.body.desc,
                    picurl: req.body.picurl,
                    capter1: req.body.capter1,
                    capter2: req.body.capter2 || '',
                    linkUrl: req.body.linkUrl || '',
                    statisticsUrl1: req.body.statisticsUrl1,
                    statisticsUrl2: req.body.statisticsUrl2 || '',
                    tokenCodes: req.body.tokenCodes || '',
                    channel: req.body.channel,
                    remarks: req.body.remarks
                }
                var user = new TuiGuangModel(novelInfo)
                user.save(function(err, data) {
                    if(err) {
                        console.log("Error:" + err);
                    } else {
                        res.send({message: '创建成功'})
                    }
                });
            }
        }
    })
    
})

router.post('/novel/delete_one', (req, res, next) => {
    var selector = {
        id: req.body.id
    }
    TuiGuangModel.find(selector, function(err, data){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            if (data != '') {
                TuiGuangModel.remove(selector, function(err, result){
                    res.send({message: '删除成功'})
                })
            } else {
                res.send({message: '没有此项数据'})
            }
        }
    })
})

router.get('/novel/show', async(req, res, next) => {
    var messages = await TuiGuangModel.find({},{capter1:0,capter2:0});
    console.log('----------------tuiguang_messages------------')
    console.log(messages)
    console.log('----------------tuiguang_messages------------')
    var domain_names = await DomainModel.find();
    res.send({data: messages, domain_names: domain_names})
})

router.get('/novel/get_content', async(req, res, next) => {
    var id = req.query._id
    var messages = await TuiGuangModel.findById(id);
    res.send({data: messages})
})

router.post('/novel/update', async(req, res, next) => {
    var id = req.body._id
    var message = {
        type: req.body.type,
        id: req.body.id,
        pageTitle: req.body.pageTitle,
        articleTit: req.body.articleTit,
        name: req.body.name,
        desc: req.body.desc,
        picurl: req.body.picurl,
        linkUrl: req.body.linkUrl || '',
        statisticsUrl1: req.body.statisticsUrl1,
        statisticsUrl2: req.body.statisticsUrl2 || '',
        tokenCodes: req.body.tokenCodes || '',
        channel: req.body.channel,
        remarks: req.body.remarks
    }
    if(req.body.capter1) {
        message.capter1= req.body.capter1
    }
    if(req.body.capter2) {
        message.capter2= req.body.capter2
    }
    var docs = await TuiGuangModel.findByIdAndUpdate(id, message)
    if (docs) {
        mem.set('weitiao_'+req.params.index,{},60).then(function(){
             console.log('---------set weitiao value---------')
        })
        mem.set('singlepage_'+req.params.index,{},60).then(function(){
             console.log('---------set singlepage value---------')
        })
        mem.set('multipage_'+req.params.index,{},60).then(function(){
             console.log('---------set multipage value---------')
        })
        mem.set('capter_'+req.params.index,{},60).then(function(){
             console.log('---------set capter value---------')
        })
        res.send({success: '修改成功'})
    } else {
        res.send({err: '修改失败'})
    }
})

router.get('/token_arr', async(req, res, next) => {
    var tokenArr = req.query.tokenArr;
    var docs = await TokenArrModel.findByIdAndUpdate('5bc06e2e2f6ed40b684421a4', {tokenArr: tokenArr})
    res.send({success: '修改成功', data: docs})
})

module.exports = router;