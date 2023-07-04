// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract idNftMarket {
    uint256 private _saleOrderIndex = 0;

    struct saleOrderParams {
        address nftAddress;
        uint256 price;
        address buyer;
        uint256 endTime;
    }

    struct saleOrder {
        uint256 id;
        address nftAddress;
        uint256 price;
        address buyer;
        address seller;
        uint256 endTime;
    }

    mapping(address => saleOrder) private saleOrders;

    function createSaleOrder(
        saleOrderParams calldata params
    ) external returns (uint256) {
        if (params.endTime > 0)
            require(block.timestamp <= params.endTime, "invalid time range");

        IERC721 idNftContract = IERC721(params.nftAddress);

        require(idNftContract.ownerOf(0) == msg.sender, "not nft owner");
        idNftContract.transferFrom(msg.sender, address(this), 0);
        uint256 currentId = _saleOrderIndex;
        saleOrders[params.nftAddress] = saleOrder({
            id: currentId,
            nftAddress: params.nftAddress,
            price: params.price,
            seller: msg.sender,
            buyer: params.buyer,
            endTime: params.endTime
        });

        _saleOrderIndex++;

        return currentId;
    }

    function cancelSaleOrder(address nftAddress) external {
        saleOrder memory order = saleOrders[nftAddress];

        require(order.seller == msg.sender, "not seller");

        delete saleOrders[nftAddress];

        IERC721(nftAddress).safeTransferFrom(address(this), msg.sender, 0);
    }
}
