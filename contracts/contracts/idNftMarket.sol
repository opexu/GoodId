// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract idNftMarket {
    uint256 private _saleOrderIndex = 0;
    uint256 public fixedPlatformFee = 0.1 ether;
    struct saleOrderParams {
        address nftAddress;
        uint256 tokenId;
        uint256 price;
        address buyer;
    }

    struct saleOrder {
        uint256 id;
        address nftAddress;
        uint256 tokenId;
        uint256 price;
        address buyer;
        address seller;
    }
    event CreatedSaleOrder(
        uint256 id,
        address nftAddress,
        uint256 tokenId,
        uint256 price,
        address buyer,
        address seller
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

    function getOrderPrice(uint256 orderId) public view returns (uint256) {
        return saleOrders[orderId].price;
    }

    function createSaleOrder(
        saleOrderParams calldata params
    ) public payable returns (uint256) {
        require(msg.value == fixedPlatformFee, "platform fee is 0.1");
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
            buyer: params.buyer
        });

        _saleOrderIndex++;
        emit CreatedSaleOrder(
            currentId,
            params.nftAddress,
            params.tokenId,
            params.price,
            msg.sender,
            params.buyer
        );
        return currentId;
    }

    function buy(uint256 orderId) public payable {
        saleOrder memory order = saleOrders[orderId];

        require(order.buyer == msg.sender, "incorrect buyer");
        require(order.price <= msg.value, "low balance");
        address nftAddress = order.nftAddress;
        uint256 tokenId = order.tokenId;
        address seller = order.seller;
        delete saleOrders[orderId];
        payable(seller).transfer(order.price);

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
