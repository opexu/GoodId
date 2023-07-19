import { task } from 'hardhat/config';
import fs from 'fs';
import { IpfsService } from '../utils';
import { IdNft__factory, IdNftFactory__factory } from '../typechain-types';
import { Contract, ethers } from 'ethers';

task('getCollections', 'upload collection from folder to ipfs')
  .setAction(async () => {
    const client = new IpfsService();
    const rpcURL = process.env.RPC_URL;
    const idNftFactoryAddress = process.env.ID_NFT_FACTORY;
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    //const signer = provider.getSigner('0xB015250f3dFa390fdE62b4bb6D182A051F6fAA6C');//new ethers.Wallet('0xad59da34254711480e7d72751e1274c583e038d3153e0fd19dc02d6b3efd76bb')//
    const idNFTFactory = IdNftFactory__factory.connect(idNftFactoryAddress, wallet);

    const collections = await idNFTFactory.getOwnCollections();
    const nfts = []
    //for(let collection of collections){
      nfts.push(await IdNft__factory.connect('0xb36C9b03eAA5B690fde685F0BE4CAAA9B5CAf300', wallet).tokenURI(0))
    //}
    console.log(nfts);
  });