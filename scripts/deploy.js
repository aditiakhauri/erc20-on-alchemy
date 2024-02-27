// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {

  // Get the contract owner
  const contractOwner = await ethers.getSigners();
  console.log(`Deploying contract from: ${contractOwner[0].address}`);

  // Hardhat helper to get the ethers contractFactory object
  const MyToken = await ethers.getContractFactory('MyToken');

  // Deploy the contract
  console.log('Deploying MyToken...');
  const mytoken = await MyToken.deploy();
  await mytoken.deployed();
  console.log(`MyToken deployed to: ${mytoken.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });