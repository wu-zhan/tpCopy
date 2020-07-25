export default function () {
    return {
        fields: [
            {name: 'str', type: 'string'},
            {name: 'obj', type: 'object'},
        ],
        transport: {
            read: ({
                url: `xxx`,
                method: 'get',
            }),
        },
    };
}
