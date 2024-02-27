// scripts/interact.js
const { ethers } = require("hardhat");

async function main() {
    console.log('Getting the my token contract...');
    const contractAddress = '0xdAAddA3f396254271Ae7850956bD744a052d982f';
    const myToken = await ethers.getContractAt('MyToken', contractAddress);
    

    //token name
    console.log('Querying token name...');
    const name = await myToken.name();
    console.log(`Token Name: ${name}\n`);
    
    //symbol
    console.log('Querying token symbol...');
    const symbol = await myToken.symbol();
    console.log(`Token Symbol: ${symbol}\n`);

     // decimals()
    console.log('Querying decimals...');
    const decimals = await myToken.decimals();
    console.log(`Token Decimals: ${decimals}\n`);

    console.log('Querying token supply...');
    const totalSupply = await myToken.totalSupply();
    console.log(`Total Supply including all decimals: ${totalSupply}`);
    console.log(`Total supply including all decimals comma separated: ${ethers.utils.commify(totalSupply)}`);
    console.log(`Total Supply in MYtoken: ${ethers.utils.formatUnits(totalSupply, decimals)}\n`);
    
    // balanceOf(address account)
    console.log('Getting the balance of contract owner...');
    const signers = await ethers.getSigners();
    const ownerAddress = signers[0].address;
    let ownerBalance = await myToken.balanceOf(ownerAddress);
    console.log(`Contract owner at ${ownerAddress} has a ${symbol} balance of ${ethers.utils.formatUnits(ownerBalance, decimals)}\n`);

    // transfer(to, amount)
    console.log('Initiating a transfer...');
    const recipientAddress = "0x765941e3AA25533001280b2e0463a5544b165d0F";
    const transferAmount = 100000;
    console.log(`Transferring ${transferAmount} ${symbol} tokens to ${recipientAddress} from ${ownerAddress}`);
    await myToken.transfer(recipientAddress, ethers.utils.parseUnits(transferAmount.toString(), decimals));
    console.log('Transfer completed');
    ownerBalance = await myToken.balanceOf(ownerAddress);
    console.log(`Balance of owner (${ownerAddress}): ${ethers.utils.formatUnits(ownerBalance, decimals)} ${symbol}`);
    let recipientBalance = await myToken.balanceOf(recipientAddress);
    console.log(`Balance of recipient (${recipientAddress}): ${ethers.utils.formatUnits(recipientBalance, decimals)} ${symbol}\n`);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });