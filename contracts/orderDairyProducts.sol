pragma solidity ^0.5.0;
import "./addProducts.sol";

contract orderDairyProducts {
  constructor() public payable{
  }

  addProducts ap ;
    
    function giveInstance(address _ap) public{
        ap = addProducts(_ap);
    }
    
    event RecieptPrint(uint,string,uint,uint);
    
    uint j=0; // used to give order ids
    struct Order{
        address payable ordered_by ;
        uint orderId;
        uint productId;
        uint quantityOrdered;
        address payable fulfilled_by ;
    }
        
    mapping(uint =>Order) public orders;
    uint public ordersCount = 0;
    uint i=0;
  
    function createOrder(uint _productId,uint _quantityOrdered) public {
        require(_quantityOrdered <= ap.getQuantity(_productId), "handling require");
        j++;
        orders[j].ordered_by = msg.sender;
        orders[j].orderId = j;
        orders[j].productId = _productId;
        orders[j].quantityOrdered = _quantityOrdered;
        orders[j].fulfilled_by = ap.getAdded_by(_productId);
        ap.decreaseQuantity(_productId, _quantityOrdered) ;
        ordersCount++;
    }
    
    function getOrdered_by(uint x) public view returns(address payable){
        return orders[x].ordered_by;
    }
    
    function getFulfilled_by(uint x) public view returns(address payable){
        return orders[x].fulfilled_by;
    }
    
    function getOrdersCount() public view returns(uint){
        return ordersCount;
    }
}
