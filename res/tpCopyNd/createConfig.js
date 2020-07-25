const fs = require('fs');
const path = require('path');
const StructureFileTree = require('./structureFileTree')
const {promisify} = require('./util/promiseify.js');
const {mapTree} = require('./util/treeUtil.js');
const removeDir = require('./util/removeDir.js');
const statPro = promisify(fs.stat);
const writeFilePro = promisify(fs.writeFile);
const readFilePro = promisify(fs.readFile);
const mkdirPro = promisify(fs.mkdir);

// 构建文件tree
const strFileTree = new StructureFileTree();
// 获取命令执行路径
//可添加多个模板替换规则
const createConfigFn = async (baseDir) => {
    const getCWDPath = (...dir) => path.join(baseDir, 'tpCopyConfig', ...dir)
    // 添加替换字符
    try {
        try { //有起始目录
            await statPro(getCWDPath())
            // 有目录
            return console.log('The directory already exists. Please change the name.')
        } catch (e) {
            //没有起始目录，则创建
            await mkdirPro(getCWDPath())
        }
        // 生成文件树
        const fileTree = await strFileTree.createFileTree(path.join(__dirname, './initTemplate'));
        // 共创建文件数
        let copyFileTextNumber = 0;
        const processPro = []; // 线程
        mapTree(fileTree, (item) => {
            processPro.push(async () => {
                if (item.type === 'file') {
                    // 复制文件计数
                    copyFileTextNumber++;
                    let data = await readFilePro(item.path)
                    await writeFilePro(getCWDPath(item.relativePath), data, 'UTF-8')
                } else {
                    // 标题目录模板
                    await mkdirPro(getCWDPath(item.relativePath))
                }
            })
        })
        // 异步依次循环
        for (let item of processPro) {
            await item()
        }
        console.log(`Complete the creation of tp-copy, a total of ${copyFileTextNumber} files are created.`)
    } catch (e) {
        console.log(e)
    }
}
const removeConfigFn = async (baseDir) => {
    const getCWDPath = (...dir) => path.join(baseDir, 'tpCopyConfig', ...dir)
    // 添加替换字符
    try {
        try { //有起始目录
            await statPro(getCWDPath())
            // 有目录
            await removeDir(getCWDPath());
        } catch (e) {
            console.log(e)
            //没有起始目录，则创建
            return console.log('Please execute the "tpcopy -i" command, Create config directory.')
        }

    } catch (e) {
        console.log(e)
    }
}
module.exports = {createConfigFn, removeConfigFn}


