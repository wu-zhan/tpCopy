#!/usr/bin/env node

const {createConfigFn, removeConfigFn} = require('../tpCopyNd/createConfig.js')
const {getSaveJSON, setSaveJSON} = require('../saveJSON.js')
const tpCopyNd = require('../tpCopyNd/index.js')

const version = require('../../package.json').version;
const program = require('commander')

const configCreate = async () => {
    createConfigFn(process.cwd())
    const data = await getSaveJSON()
    data.path = `${process.cwd()}\\tpCopyConfig`
    setSaveJSON(data)
}

const configRemove = async () => {
    removeConfigFn(process.cwd())
}
const configForce = async () => {
    await configRemove()
    configCreate()
}


program.version(version, '-v, --vers', 'output the current version')
// init 命令
program
    .option('-i, --init', 'creat a config.')
    .option('-f, --force', 'force creat a config.')
    .option('-r, --remove', 'remove a config.')
    .action(async function (path, cmd) {

    });

program
    .arguments(`<createname> [templatename]`)
    .action(function (createname, templatename) {
        tpCopyNd(createname, templatename)
    });
program.parse(process.argv);

if (program.init && !program.force && !program.remove) {
    configCreate()
} else if (!program.force && program.remove) {
    // 删除配置文件
    configRemove()
} else if (program.force) {
    // 重构配置文件
    configForce()
}
