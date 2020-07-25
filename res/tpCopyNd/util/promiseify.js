const customArgumentsToken = "__ES6-PROMISIFY--CUSTOM-ARGUMENTS__";

function promisify(original) {
    if (typeof original !== "function") {
        throw new TypeError("");
    }

    const argumentNames = original[customArgumentsToken];

    const ES6Promise = promisify.Promise || Promise;

    if (typeof ES6Promise !== "function") {
        throw new Error("");
    }

    return function (...args) {
        return new ES6Promise((resolve, reject) => {

            args.push(function callback(err, ...values) {

                if (err) {
                    return reject(err);
                }

                if (values.length === 1 || !argumentNames) {
                    return resolve(values[0]);
                }

                const o = {};
                values.forEach((value, index) => {
                    const name = argumentNames[index];
                    if (name) {
                        o[name] = value;
                    }
                });

                resolve(o);
            });

            original.call(this, ...args);
        });
    };
}

promisify.argumentNames = customArgumentsToken;
promisify.Promise = undefined;

exports.promisify = promisify;
