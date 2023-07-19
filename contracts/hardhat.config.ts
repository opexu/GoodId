import * as dotenv from 'dotenv';

import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import { HardhatUserConfig } from 'hardhat/config';

import './tasks';
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.18',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 1,
      initialBaseFeePerGas: 1000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    siberium: {
      url: 'https://rpc.test.siberium.net', //'https://siberium-test-network.rpc.thirdweb.com',
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      gas: 6721975,
      gasPrice: 20000000000,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "siberium",
        chainId: 111000,
        urls: {
          apiURL: "https://rpc.test.siberium.net",
          browserURL: "https://rpc.test.siberium.net"
        }
      }
    ]
  },
  typechain: {
    outDir: 'typechain-types',
    target: 'ethers-v5',
  },
};

export default config;
