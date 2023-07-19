import { task } from 'hardhat/config';
import fs from 'fs';
import { IpfsService } from '../utils';
import { IdNft__factory, IdNftFactory__factory, IdNftMarket__factory } from '../typechain-types';
import { BigNumber, Contract, ethers } from 'ethers';

task('sale', 'upload collection from folder to ipfs')
  .setAction(async () => {
    const client = new IpfsService();
    const rpcURL = process.env.RPC_URL;
    const idNftFactoryAddress = process.env.ID_NFT_FACTORY;
    const idNftMarketAddress = process.env.ID_NFT_MARKET;
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    //const signer = provider.getSigner('0xB015250f3dFa390fdE62b4bb6D182A051F6fAA6C');//new ethers.Wallet('0xad59da34254711480e7d72751e1274c583e038d3153e0fd19dc02d6b3efd76bb')//
    const idNFTMarket = IdNftMarket__factory.connect(idNftMarketAddress, wallet);
    const nft = IdNft__factory.connect('0xb36C9b03eAA5B690fde685F0BE4CAAA9B5CAf300', wallet)
    await nft.connect(wallet).approve(idNFTMarket.address,0)
    const tx = await idNFTMarket.connect(wallet).createSaleOrder(
      {
        nftAddress: '0xb36C9b03eAA5B690fde685F0BE4CAAA9B5CAf300',
        tokenId: 0,
        price: 1,
        buyer: '0x7AB8Cb3a5F5196A27aF1cE1F128a1fD3477Ab9ac',
        endTime: 0
      },{gasLimit: 6721975,
        gasPrice: 20000000000,});
    const rec = await wallet.signTransaction(tx)

    const receipt = await tx.wait();
    const events = receipt?.events.filter((e: any) => e.event === 'CreatedSaleOrder');
    console.log(events);


    //console.log('collection created ', `${process.env.IPFS_GATEWAY}${collectionCid} `, collectionAddress);
    //for (let i = 0; i < images.length; i++) {
    // const element = IdNft__factory.connect(collectionAddress, wallet);
    //const imageBuffer = fs.readFileSync(`./assets/${currentCollection.name}/files/${images[i]}`);
    //const fileCid = await client.add(imageBuffer);
    // const nftIdData = {
    //   name: 'test',
    //   external_url: `${process.env.IPFS_GATEWAY}${collectionCid}/${0}`,
    //   description: 'test description',
    //   attributes: [],
    // };
    // const nftCid = await client.add(Buffer.from(JSON.stringify(nftIdData)));
    // const tokenURI = ''//`ipfs://${nftCid}`;
    // const tx_mint = await element.safeMint(wallet.address, tokenURI, {
    //   gasLimit: 6721975,
    //   gasPrice: 20000000000,
    // });
    // await wallet.signTransaction(tx_mint)

    // console.log('Mint NFT Item -', tokenURI, ' to collection ', collectionAddress);
  });