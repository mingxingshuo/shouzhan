var ConfigModel = require('../model/Config');

async function a() {
    await ConfigModel.update({code: 11}, {status: -2})
}
a()