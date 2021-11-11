"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const contract_samples_1 = require("contract-samples");
const ethers_1 = require("ethers");
const express_1 = __importDefault(require("express"));
const PRIVATE_KEY = '0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0';
const TEST_CONTRACT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const PORT = '8080';
const main = async () => {
    const wallet = new ethers_1.Wallet(PRIVATE_KEY, hardhat_1.ethers.provider);
    const app = (0, express_1.default)();
    app.get('/addCount', async (_, res) => {
        const test = await hardhat_1.ethers.getContractAt(contract_samples_1.Test__factory.abi, TEST_CONTRACT_ADDRESS);
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
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
