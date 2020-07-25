const fs = require('fs');
const path = require('path')
const {promisify} = require('./util/promiseify.js');
let statPro = promisify(fs.stat);

// 文件树节点
class TreeNode {
    constructor(name, type = 'file', path, relativePath) {
        this.name = name;
        this.children = [];
        this.type = type;
        this.path = path;
        this.relativePath = relativePath; // 相对于文件树根节点的路径
    }
}

// 构建文件树
class StructureFileTree {
    static async isFile(route) {
        const data = await statPro(route)
        // 有目录
        return data.isFile()
    }

// 产生node节点
    static async startTreeNode(name, startDir = '', dirName = '') {
        // const {getDIRPath} = await getPath()
        try {
            const type = await StructureFileTree.isFile(path.join(startDir, dirName, name)) ? 'file' : 'dir'
            return new TreeNode(name, type, path.join(startDir, dirName, name), path.join(dirName, name))
        } catch (err) {
            console.log(err)
        }
    }

    // 生成文件树
    async createFileTree(startDir) {
        let fileTree = {children: []}
        debugger;
        const _createFileTree = async (dirName, lastNode) => {
            const templateFileNameArr = await fs.readdirSync(path.join(startDir, dirName))
            for (let name of templateFileNameArr) {
                const node = await StructureFileTree.startTreeNode(name, startDir, dirName)
                lastNode.children.push(node)
                if (node.type === 'dir') {
                    await _createFileTree(path.join(dirName, node.name), node)
                }
            }
        }
        await _createFileTree('', fileTree)
        return fileTree.children
    }
}


module.exports = StructureFileTree
