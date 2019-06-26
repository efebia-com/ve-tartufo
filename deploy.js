//can't use 'strict': contract.deploy({arguments,}) arguments is a forbidden word!

const deploy = async ({ web3, bytecode, abi, from, pippo, gas, gasPrice }) => {
    try { 
        const contractInstance = new web3.eth.Contract(abi);
        const transactionObject = contractInstance.deploy({ data: bytecode, arguments: pippo });
        const receipt = await transactionObject.send({ from, gas, gasPrice });
        return receipt;
    } catch(err){
        throw err;
    }
}

module.exports = {
    deploy
}