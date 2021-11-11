/* eslint-disable no-console */
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat';
import { Test__factory } from 'contract-samples';
import { Wallet } from 'ethers';
import express from 'express';

const PRIVATE_KEY = '0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0';
const TEST_CONTRACT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const PORT = '8080';

const main = async () => {
	const wallet = new Wallet(PRIVATE_KEY, ethers.provider);
	const app = express();

	app.get('/addCount', async (_, res) => {
		const test = await ethers.getContractAt(Test__factory.abi, TEST_CONTRACT_ADDRESS);
		const testClient = test.connect(wallet);
		await testClient.addCount(103);
		const count = await testClient.getCount();
		console.log('count', count.toString());
		res.send(count.toString());
	});

	app.listen(PORT, () => {
		console.log('server started');
	});
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error: Error) => {
	console.error(error);
	process.exit(1);
});
