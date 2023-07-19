// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract idNftMarket {
    uint256 private _saleOrderIndex = 0;

    struct saleOrderParams {
        address nftAddress;
        uint256 tokenId;
        uint256 price;
        address buyer;
        uint256 endTime;
    }

    struct saleOrder {
        uint256 id;
        address nftAddress;
        uint256 tokenId;
        uint256 price;
        address buyer;
        address seller;
        uint256 endTime;
    }
    event CreatedSaleOrder(
        uint256 id,
        address nftAddress,
        uint256 tokenId,
        uint256 price,
        address buyer,
        address seller,
        uint256 endTime
    );

    event BoughtItem(
        address nftAddress,
        uint256 tokenId,
        uint256 price,
        address buyer,
        address seller
    );

    event CanceledSaleOrder(
        uint256 id,
        address nftAddress,
        uint256 tokenId,
        uint256 price,
        address buyer,
        address seller
    );

    mapping(uint256 => saleOrder) private saleOrders;

    function createSaleOrder(
        saleOrderParams calldata params
    ) external returns (uint256) {
        if (params.endTime > 0)
            require(block.timestamp <= params.endTime, "invalid time range");

        IERC721 idNftContract = IERC721(params.nftAddress);

        require(
            idNftContract.ownerOf(params.tokenId) == msg.sender,
            "not nft owner"
        );
        idNftContract.transferFrom(msg.sender, address(this), params.tokenId);
        uint256 currentId = _saleOrderIndex;
        saleOrders[currentId] = saleOrder({
            id: currentId,
            nftAddress: params.nftAddress,
            tokenId: params.tokenId,
            price: params.price,
            seller: msg.sender,
            buyer: params.buyer,
            endTime: params.endTime
        });

        _saleOrderIndex++;
        emit CreatedSaleOrder(
            currentId,
            params.nftAddress,
            params.tokenId,
            params.price,
            msg.sender,
            params.buyer,
            params.endTime
        );
        return currentId;
    }

    function buy(uint256 orderId) external {
        saleOrder memory order = saleOrders[orderId];

        require(order.buyer == msg.sender, "incorrect buyer");
        require(order.price < payable(msg.sender).balance, "low balance");
        payable(msg.sender).transfer(order.price);
        address nftAddress = saleOrders[orderId].nftAddress;
        uint256 tokenId = saleOrders[orderId].tokenId;
        delete saleOrders[orderId];

        IERC721(nftAddress).safeTransferFrom(
            address(this),
            msg.sender,
            tokenId
        );

        emit BoughtItem(
            nftAddress,
            tokenId,
            order.price,
            msg.sender,
            order.seller
        );
    }

    function cancelSaleOrder(uint256 orderId) external {
        saleOrder memory order = saleOrders[orderId];

        require(order.seller == msg.sender, "not seller");
        address nftAddress = saleOrders[orderId].nftAddress;
        uint256 tokenId = saleOrders[orderId].tokenId;

        IERC721(nftAddress).safeTransferFrom(
            address(this),
            msg.sender,
            tokenId
        );
        emit CanceledSaleOrder(
            orderId,
            order.nftAddress,
            order.tokenId,
            order.price,
            order.seller,
            order.buyer
        );
        delete saleOrders[orderId];
    }
}
