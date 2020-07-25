const fs = require('fs')
const path = require('path')

const remove = (_path, _fs) => {
    if (_fs.existsSync(_path)) {
        _fs.readdirSync(_path).forEach(function (_file, _index) {
            var _curPath = _path + "/" + _file;
            if (_fs.statSync(_curPath).isDirectory()) { // recurse
                remove(_curPath, _fs);
            } else { // delete file
                _fs.unlinkSync(_curPath);
            }
        });
        _fs.rmdirSync(_path);
        return true;
    }
    return false;
};
//
// const removeDir = (tarPath, removeStates) => new Promise((resolve, reject) => {
//     remove(tarPath, () => {
//         resolve()
//     }, removeStates)
// })
module.exports = (_path) => remove(_path, fs)
