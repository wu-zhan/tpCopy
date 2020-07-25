const path = require('path')
const fs = require('fs');
const {promisify} = require('./tpCopyNd/util/promiseify.js');
const readFilePro = promisify(fs.readFile);
const writeFilePro = promisify(fs.writeFile);

// 获取getSaveJSON路径
const getSaveJSON = async function () {
    const saveJSON = await readFilePro(path.join(__dirname, './saveJSON.json'))
    return JSON.parse(saveJSON)
}

const setSaveJSON = async function (data) {
    await writeFilePro(path.join(__dirname, './saveJSON.json'), JSON.stringify(data), 'UTF-8')
}

module.exports = {getSaveJSON, setSaveJSON}
