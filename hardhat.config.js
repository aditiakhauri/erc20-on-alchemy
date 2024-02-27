/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY,API_URL_1} = process.env;
module.exports = {
  solidity: "0.8.24",

  defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      },
      chainstack:{
        url: API_URL_1,
        accounts:[`0x${PRIVATE_KEY}`]
      }
    }
};
