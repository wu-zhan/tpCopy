const path = require('path')
const fs = require('fs');
const {promisify} = require('./promiseify.js');
const readFilePro = promisify(fs.readFile);
const saveJSON = require('../../saveJSON.json')

// 获取config路径
const getPath = async function () {
    // const saveJSON = await readFilePro(path.join(__dirname, '../../saveJSON.json'))
    const {initTemplate, rplConfig} = require(saveJSON.path + '/config.js');

    // 项目res跟路径
    const getDIRPath = (...dir) => path.join(...dir)
    // 命令执行路径下的创建的新目录的路径
    const getCWDPath = (...dir) => path.join(process.cwd(), ...dir)
    const templateDIRPath = saveJSON.path + '/template'
    return {initTemplate, templateDIRPath, getDIRPath, getCWDPath, rplConfig}
}


module.exports = getPath
