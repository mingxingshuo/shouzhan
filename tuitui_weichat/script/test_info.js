var SubOpenidTagModel = require('../model/SubOpenidTag');
var SubOpenidSexModel = require('../model/SubOpenidSex');
var wechat_util = require('../util/get_weichat_client.js')
var async = require('async');


async function get_user(_id, code, back) {
    if (code) {
        update_user(_id, code, get_user, back);
    } else {
        console.log('update_user end');
        back(null);
    }
}

function update_user(_id, code, next, back) {
    SubOpenidTagModel.fetch(_id, code, async function (error, users) {
        var user_arr = [];
        users.forEach(function (user) {
            user_arr.push(user.openid)
        })
        let client = await wechat_util.getClient(code)
        if (user_arr.length == 0) {
            console.log(user_arr, '-------------------user null')
            next(null, null, back)
        } else {
            client.batchGetUsers(user_arr, function (err, data) {
                if (err) {
                    // console.log(err, '----------------userinfo err')
                    if (users.length == 100) {
                        next(users[99]._id, code, back);
                    } else {
                        next(null, null, back)
                    }
                } else {
                    if (data && data.user_info_list) {
                        let userArr = []
                        async.eachLimit(data.user_info_list, 100, function (info, callback) {
                            if (info.nickname) {
                                userArr.push({
                                    code: code,
                                    openid: info.openid,
                                    sex: info.sex.toString(),
                                    sign: 1
                                })
                            }
                            callback(null)
                        }, function (error) {
                            if (error) {
                                console.log(error, '--------------error')
                            }
                            SubOpenidSexModel.insertMany(userArr, async function (error, docs) {
                                if (error) {
                                    console.log('------insertMany error--------');
                                    console.log(error);
                                    console.log('------------------------------');
                                }
                                if (users.length == 100) {
                                    next(users[99]._id, code, back);
                                } else {
                                    next(null, null, back)
                                }
                            })
                        })
                    } else {
                        if (users.length == 100) {
                            next(users[99]._id, code, back);
                        } else {
                            next(null, null, back)
                        }
                    }
                }
            })
        }
    })
}

async function users() {
    let code = process.argv.slice(2)[0]
    async.waterfall([
        function (callback) {
            get_user(null, code, function () {
                callback(null)
            })
        }], async function (error) {
    })
}
users()

