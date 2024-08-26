
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
    solidity: "0.8.0",
    networks: {
        rinkeby: {
            url: process.env.RINKEBY_URL,
            accounts: [`0x${process.env.PRIVATE_KEY}`]
        }
    }
};
