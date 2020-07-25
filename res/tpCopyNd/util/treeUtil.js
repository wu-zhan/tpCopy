/**
 * 遍历树
 */
exports.mapTree = (data = [], callback) => {
    const _mapTree = (_data, _callback) => {
        return _data.map((item, index, arr) => {
            let newItem = item;
            const data = callback(newItem, index, arr)
            if (item && item.children && item.children.length > 0) {
                newItem = {...newItem, children: _mapTree(item.children, _callback)};
            }
            return data || newItem;
        });
    };
    return _mapTree(data, callback);
};
