const fs = require('fs');
const path = require('path');
const StructureFileTree = require('./structureFileTree')
const ReplaceTemplate = require('./replaceTemplate')
const {promisify} = require('./util/promiseify.js');
const {mapTree} = require('./util/treeUtil.js');
const getPath = require('./util/getPath.js');
// const {rplConfig,templateName,templateDIRPath} = require('./config.js');
const statPro = promisify(fs.stat);
// let unlinkPro = promisify(fs.unlink);
const writeFilePro = promisify(fs.writeFile);
const readFilePro = promisify(fs.readFile);
const mkdirPro = promisify(fs.mkdir);

// 构建文件tree
const strFileTree = new StructureFileTree();
// 用于批量替换的构建器
const replaceTem = new ReplaceTemplate();


//可添加多个模板替换规则
module.exports = async (_tarGetName, _templateName) => {
    const {getCWDPath, rplConfig, templateDIRPath, initTemplate} = await getPath()

    const tarGetName = _tarGetName || 'dome' // 指令入参
    const templateName = _templateName || initTemplate // 指令入参

    // 添加替换字符
    rplConfig.forEach(item => replaceTem.pushTemplate(...item))
    try {
        try { //有起始目录
            await statPro(getCWDPath(tarGetName))
            // 有目录
            // 该目录存在请更换名称
            return console.log('The directory already exists. Please change the name.')
        } catch (e) {
            //没有起始目录，则创建
            await mkdirPro(getCWDPath(tarGetName))
        }
        // 生成文件树
        const fileTree = await strFileTree.createFileTree(path.join(templateDIRPath, templateName));
        // 生成文件计数
        let replaceTextNumber = 0;
        // 替换文件标题计数
        let replaceTitleNumber = 0;
        // 替换内容计数
        let copyFileTextNumber = 0;
        const processPro = []; // 线程
        mapTree(fileTree, (item) => {
            processPro.push(new Promise(async (resolve) => {
                if (item.type === 'file') {
                    // 复制文件计数
                    copyFileTextNumber++;
                    let data = await readFilePro(item.path)
                    // 应用模板
                    const {str: dataPath, num: dataRplNum} = replaceTem.play(data.toString())
                    replaceTextNumber += dataRplNum
                    // 标题应用模板
                    let {str: titlePath, num: titleRplNum} = replaceTem.play(getCWDPath(tarGetName, item.relativePath));
                    replaceTitleNumber += titleRplNum
                    await writeFilePro(titlePath, dataPath, 'UTF-8')
                } else {
                    // 标题目录模板
                    let {str: titlePath, num: titleRplNum} = replaceTem.play(getCWDPath(tarGetName, item.relativePath));
                    replaceTitleNumber += titleRplNum
                    await mkdirPro(titlePath)
                }
                resolve()
            }))
        })
        await Promise.all(processPro)
        console.log(`完成${tarGetName}创建，共创建文件${copyFileTextNumber}个，修改模板${replaceTextNumber}处,修改标题${replaceTitleNumber}处`)
    } catch (e) {
        console.log(e)
    }
}



