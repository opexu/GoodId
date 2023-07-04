// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";

contract idNft is
    ERC721,
    ERC721URIStorage,
    ERC721Burnable,
    ERC721Royalty,
    Ownable
{
    uint256 private constant TOKEN_ID = 0;
    uint256 private _currentIndex = 0;

    uint256 private _burnCounter = 0;

    string private _contractURI;

    event RoyaltyUpdated(uint96 newValue, uint256 tokenId);

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _contractUri,
        address _owner
    ) ERC721(_name, _symbol) {
        transferOwnership(_owner);
        _contractURI = _contractUri;
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _currentIndex;
        require(
            _currentIndex <= TOKEN_ID,
            "can be only one token for each idNft"
        );
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _currentIndex++;
    }

    function totalSupply() public view returns (uint256) {
        return _currentIndex - _burnCounter;
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage, ERC721Royalty) {
        _burnCounter++;
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(ERC721, ERC721Royalty, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
