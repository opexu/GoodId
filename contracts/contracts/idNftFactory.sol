// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.18;

import './idNft.sol';

contract idNftFactory {
  mapping(address => address[]) private nfts;

  event CreatedNFTCollection(address creator, address nft, string name, string symbol, string properties);

  function createIdNft(
    string memory _name,
    string memory _symbol,
    string memory _propertiesURL
  ) external {
    idNft nft = new idNft(_name, _symbol, _propertiesURL, msg.sender);
    nfts[msg.sender].push(address(nft));
    emit CreatedNFTCollection(msg.sender, address(nft), _name, _symbol, _propertiesURL);
  }

  function getOwnCollections() external view returns (address[] memory) {
    return nfts[msg.sender];
  }
}
