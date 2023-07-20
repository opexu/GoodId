import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre) {
  // const signers = await hre.ethers.getSigners();
  const { deploy } = hre.deployments;
  await deploy('idNftFactory', {
    contract: 'idNftFactory',
    from: '0xB015250f3dFa390fdE62b4bb6D182A051F6fAA6C',//signers[0].address,
    log: true,
    gas: 6721975,
    gasPrice: 20000000000,
  });
  console.log('deployed factory');
};
export default func;
func.tags = ['idNftFactory', 'with_comission'];
