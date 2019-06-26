# ve-tartufo

An italian version of truffle made for VeChain

## Installation

```sh
$ npm install --save git+ssh://git@github.com/efebia-com/ve-tartufo.git
```

## API

```js
const { compile, deploy } = require('ve-tartufo');
```

### How to use it:

```js
const { init, compile, deploy } = require("ve-tartufo");
//remember to use our Web3, because Thor suggest version of web3 is the "1.0.0-beta.37"

const main = async _ => {
    try {
        //give the path of where your contracts are and compile them all!
        const fullPath = 'contracts/MainContract.sol';
        const { bytecode, abi } = compile(fullPath);

        //connect to your local VeChain
        const blockchainURL = "http://localhost:8669";
        const web3 = init(blockchainURL);

        //add one of the 10 wallets available
        const privateKey = "0xdce1443bd2ef0c2631adc1c67e5c93f13dc23a41c18b536effbbdcbcdb96fb65";
        const newAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
        web3.eth.accounts.wallet.add(newAccount);

        //deploy
        const from = web3.eth.accounts.wallet[0].address;
        const { options: { address } } = await deploy({ web3, bytecode, abi, from, gas: 10000000, gasPrice: 1 });
        console.log("deployed:", address);

        //call your smart contract methods!
        const contract = new web3.eth.Contract(abi, address);
        const r1 = await contract.methods.yourMethod().call();
        const r2 = await contract.methods.yourMethod('whatever').send({from, gas: 1000000, gasPrice: 1 });
    } catch ({ stack }) {
        console.log(stack);
    }
}

main();
```

## License

[MIT](LICENSE)
