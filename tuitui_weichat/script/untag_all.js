var ConfigModel = require('../model/Config');
var wechat_util = require('../util/get_weichat_client.js')
var UserconfModel = require('../model/Userconf');
var OpenidTagModel = require('../model/OpenidTag');
var SubOpenidTagModel = require('../model/SubOpenidTag');
var UserTagModel = require('../model/UserTag')
var async = require('async');

function all(code) {
    let code = process.argv.slice(2)[0]
    async.waterfall([
        async function (callback) {
            let client = await wechat_util.getClient(code)
            let conf = await ConfigModel.findOne({code: code})
            let appid = conf.appid
            client.clearQuota(appid, function (err, data) {
                console.log(err, data, '------------------clearQuota end')
                callback(null)
            })
        }, function (callback) {
            UserTagModel.find({code: code}, function (err, data) {
                console.log(data,'--------------------data')
                for (let i of data) {
                    if (i.name == "男" || i.name == "女" || i.name == "未知") {
                        getTags(i.id, code, null)
                    }
                }
                callback(null)
            })
        }, function (callback) {
            UserconfModel.fetch_userSign(id,code,function(err,data){
                var con_openids = []
                for (var index in data) {
                    con_openids.push(data[index].openid);
                    obj_users[data[index].openid] = data[index]
                }
                OpenidTagModel.find({code:code,openid:{$in:con_openids}},['openid']).exec(function(error,tag_ois){
                    var tag_openids = []
                    for (var index in tag_ois) {
                        tag_openids.push(tag_ois[index].openid)
                    }
                    var subArr = subSet(con_openids,tag_openids)
                    var openids = [];
                    for (var index in subArr) {
                        var openid = subArr[index];
                        if(openid){
                            openids.push({
                                'openid': openid,
                                'code': code,
                                'sign' : obj_users[openid].sign,
                                'sex' : obj_users[openid].sex
                            });
                        }
                    }
                    if(openids.length){
                        console.log(openids)
                        SubOpenidTagModel.insertMany(openids,function(err,docs){
                            obj_users = {}
                            if(data.length==500){
                                compare(data[499]._id,code)
                            }else{
                                console.log('.........compare end...........')
                                callback(null)
                            }
                        })
                    }else{
                        obj_users = {}
                        if(data.length==500){
                            compare(data[499]._id,code)
                        }else{
                            console.log('..........compare end...........')
                            callback(null)
                        }
                    }
                })
            })
        },function (callback) {
            UserTagModel.find({code: code}, function (err, data) {
                for (let i of data) {
                    let sex = "0"
                    if (i.name == "男") {
                        sex = "1"
                    } else if (i.name == "女") {
                        sex = "2"
                    }
                    var res = update_tag(null, code, i.id, sex)
                    callback(null)
                }
            })
        }
    ],function (error) {
        console.log(error,'-----------------error')
    })
}

async function getTags(tagId, code, openId) {
    let client = await wechat_util.getClient(code)
    client.getTagUsers(tagId, openId, function (err, res) {
        console.log(res,'-------------------res')
        let openids = []
        if(res.data && res.data.openid){
            for (let openid of res.data.openid) {
                openids.push({'openid': openid, 'code': code, tagid: tagId});
            }
            OpenidTagModel.insertMany(openids, function (err, docs) {
                if (res.next_openid) {
                    getTags(tagId, code, res.next_openid)
                }
            })
        }else{
            return
        }
    })
}

var subSet = function(arr1, arr2) {
    var set1 = new Set(arr1);
    var set2 = new Set(arr2);

    var subset = [];

    for (let item of set1) {
        if (!set2.has(item)) {
            subset.push(item);
        }
    }
    return subset;
};

function update_tag(_id, code, tagId, sex) {
    SubOpenidTagModel.fetchTag(_id, code, sex, async function (error, users) {
        var user_arr = [];
        users.forEach(function (user) {
            user_arr.push(user.openid)
        })
        let client = await wechat_util.getClient(code)
        if (user_arr.length == 0) {
            console.log(user_arr, '-------------------user null')
            return
        } else {
            client.membersBatchtagging(tagId, user_arr, function (error, res) {
                console.log(res)
            })
            if (users.length == 50) {
                setTimeout(function() {
                    update_tag(users[49]._id, code, tagId, sex)
                },200)
            } else {
                console.log('.........end...........')
                return
            }
        }
    })
}

var arr = []
for(let i of arr){
    all(i)
}