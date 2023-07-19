import { task } from 'hardhat/config';

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = hre.config.networks.hardhat.accounts;
  if ('mnemonic' in accounts) {
    for (let i = 0, len = accounts.count; i < len; i++) {
      const wallet = hre.ethers.Wallet.fromMnemonic(accounts.mnemonic);
      console.log(`Account #${i}`, wallet.address, wallet.privateKey);
    }
  }
});
