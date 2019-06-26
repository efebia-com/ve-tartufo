const fs = require('fs');
const solc = require('solc');
const { basename } = require('path');

const checkForErrors = errors => {
    if(errors.length == 0) return false;

    errors.map( ({severity, formattedMessage}) => console.log(`${severity}: ${formattedMessage}`));
    const shouldIthrow = errors.some( ({severity}) => severity == 'error' );
    return shouldIthrow;

}
const compile = fullPath => {
    try{
        const keyName = basename(fullPath, '.sol');

        const _findImports = path => {
            console.log(`importing contract: ${path}`);
            const data = JSON.stringify(fs.readFileSync(path, 'utf8'));
            return { contents: data };
        }
    
        const input = {
            language: 'Solidity',
            sources: {
                [fullPath]: { content: fs.readFileSync(fullPath, 'utf8') }
            },
            settings: { outputSelection: { '*': { '*': [ '*' ] } } }
        };

        const compiled = JSON.parse(solc.compile(JSON.stringify(input), _findImports));
        if(checkForErrors(compiled.errors))
            throw { stack: 'Compile Error' };
        const bytecode = compiled.contracts[fullPath][keyName].evm.bytecode.object;
        const abi = compiled.contracts[fullPath][keyName].abi;
        return { bytecode, abi };
    } catch(err) {
        throw err;
    }
}

module.exports = {
    compile
}
