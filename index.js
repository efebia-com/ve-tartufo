const Web3 = require("web3");
const { thorify } = require("thorify");
const { compile } = require("./compile");
const { deploy } = require("./deploy");

const init = (blockchainURL="http://localhost:8669") => thorify(new Web3(), blockchainURL);

module.exports = {
    init,
    compile,
    deploy
}