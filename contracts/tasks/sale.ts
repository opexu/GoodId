import { task } from 'hardhat/config';
import fs from 'fs';
import { IpfsService } from '../utils';
import { ERC20__factory, IdNft__factory, IdNftFactory__factory, IdNftMarket__factory } from '../typechain-types';
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
    const nft = IdNft__factory.connect('0xa4dD3c40803f6B981A2c0daF50e98B0aa127e912', wallet)
    const token = ERC20__factory.connect('0x0790c2d13FdC6F453627C39a46F819720D8D856E', wallet)
    // await nft.connect(wallet).approve(idNFTMarket.address, 0)
    // await token.connect(wallet).approve(idNFTMarket.address, BigNumber.from(1))
     const opts = {value: ethers.utils.parseEther('0.1')}
    // console.log(opts);
    
    // const tx = await idNFTMarket.connect(wallet).createSaleOrder(
    //   {
    //     nftAddress: '0xa4dD3c40803f6B981A2c0daF50e98B0aa127e912',
    //     tokenId: 0,
    //     price: ethers.utils.parseEther('0.1'),
    //     buyer: '0xB015250f3dFa390fdE62b4bb6D182A051F6fAA6C'
    //   }, opts);
    // const rec = await wallet.signTransaction(tx)

    // const receipt = await tx.wait();
    // const events = receipt?.events.filter((e: any) => e.event === 'CreatedSaleOrder');
    // console.log(events);
    // const orderId = events[0].args.id
    // const price = events[0].args.price
    await token.connect(wallet).approve(idNFTMarket.address, BigNumber.from(ethers.utils.parseEther('0.1')))
    const tx_buy = await idNFTMarket.connect(wallet).buy(0, opts)
    const rec_buy = await wallet.signTransaction(tx_buy)

    const receipt_buy = await tx_buy.wait();
    const events_buy = receipt_buy?.events.filter((e: any) => e.event === 'BoughtItem');
    console.log(events_buy);
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