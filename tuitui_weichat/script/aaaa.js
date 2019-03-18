var ConfigModel = require('../model/Config');
var UserTagModel = require('../model/UserTag')
var UserconfModel = require('../model/Userconf')
var OpenidModel = require('../model/Openid')
var wechat_util = require('../util/get_weichat_client.js')

async function a(code) {
    // await ConfigModel.update({code: code}, {status: -2})

    let client = await wechat_util.getClient(code)
    client.getTags(function (err, data) {
        console.log(err,data, '-----------------', code)
    })

    // let count = await UserconfModel.count({code:code})
    // let count1 = await OpenidModel.count({code:code})
    // console.log(count,count1,'----------------count')

    // client.createTag("明星说女", async function (err, data) {
    //     console.log(data, '-----------------data')
    //     await UserTagModel.create({id: data.tag.id, name: "女", code: code})
    //     client.getTags(function (err, data1) {
    //         console.log(data1, '-----------------data1')
    //     })
    // })
}
a(40)

// async function b(code) {
//     await mem.set('access_token' + code, '', 10)
//     let client = await wechat_util.getClient(code)
//     async.waterfall([
//         function (callback) {
//             get_users(code, null, function () {
//                 callback(null)
//             })
//             // }, function (callback) {
//             //     get_user(null, code, function () {
//             //         callback(null)
//             //     })
//         }], async function (error) {
//         console.log('jieguan end')
//         return
//     })
// }
//
// async function get_users(code, openid, callback) {
//     console.log('code : ' + code + ' , openid : ' + openid);
//     let client = await wechat_util.getClient(code)
//     if (openid) {
//         client.getFollowers(openid, async function (err, result) {
//             if (err) {
//                 console.log('-------getFollowers error-------')
//                 console.log(err)
//             }
//             if (result && result.data && result.data.openid) {
//                 var openids = [];
//                 for (var index in result.data.openid) {
//                     openids.push({'openid': result.data.openid[index], 'code': code});
//                 }
//                 OpenidModel.insertMany(openids, async function (error, docs) {
//                     if (error) {
//                         console.log('------insertMany error--------');
//                         console.log(error);
//                         console.log('------------------------------');
//                     }
//                     if (result.next_openid) {
//                         console.log('-----------code -------' + code + '---------update--contitue------')
//                         get_users(code, result.next_openid, callback);
//                     } else {
//                         console.log('-----------code -------' + code + '---------update--end')
//                         callback(null)
//                     }
//                 })
//             } else {
//                 console.log('not have openid arr-----------code -------' + code + '---------update--end')
//                 callback(null)
//             }
//         });
//     } else {
//         client.getFollowers(async function (err, result) {
//             if (err) {
//                 console.log('-------getFollowers error-------')
//                 console.log(err)
//             }
//             if (result && result.data && result.data.openid) {
//                 var openids = [];
//                 for (var index in result.data.openid) {
//                     openids.push({'openid': result.data.openid[index], 'code': code});
//                 }
//                 OpenidModel.insertMany(openids, async function (error, docs) {
//                     if (error) {
//                         console.log('------insertMany error--------');
//                         console.log(error);
//                         console.log('------------------------------');
//                     }
//                     if (result.next_openid) {
//                         console.log('-----------code -------' + code + '---------update--contitue------')
//                         get_users(code, result.next_openid, callback);
//                     } else {
//                         console.log('-----------code -------' + code + '---------update--end')
//                         callback(null)
//                     }
//                 })
//             } else {
//                 console.log('not have openid arr -----------code -------' + code + '---------update--end')
//                 callback(null)
//             }
//         });
//     }
// }
//
// async function get_user(_id, code, back) {
//     if (code) {
//         update_user(_id, code, get_user, back);
//     } else {
//         console.log('update_user end');
//         back(null);
//     }
// }
// b(34)