// 替换规则节点
class TemplateNode {
    constructor(state, end) {
        this.replaceState = state;
        this.replaceEnd = end;
    }
}

// 替换规则
class ReplaceTemplate {
    constructor() {
        this.replaceArr = []
    }

    static startTemplateNode(state, end) {
        return new TemplateNode(state, end)
    }

    pushTemplate(state, end) {
        this.replaceArr.push(ReplaceTemplate.startTemplateNode(state, end))
    }

    // 替换str里边的值
    play(str) {
        let num = 0; // 替换了几处
        const _str = this.replaceArr.reduce((total, node) => {
            const reg = new RegExp(node.replaceState, "g")
            return total.replace(reg, () => {
                num++;
                return node.replaceEnd
            })
        }, str)
        return {str: _str, num}
    }
}

module.exports = ReplaceTemplate
