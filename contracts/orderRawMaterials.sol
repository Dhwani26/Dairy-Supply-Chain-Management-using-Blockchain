pragma solidity ^0.5.0;
import "./addRawMaterials.sol";

contract orderRawMaterials {
  addRawMaterials ar ;

  constructor() public {
  }
  function giveInstance(address _ar) public{
        ar = addRawMaterials(_ar);
    }
    event RecieptPrint(uint,string,uint,uint);
    
    uint j=0; // used to give order ids
    struct Order{
        address ordered_by ;
        uint orderId;
        uint itemId;
        uint quantityOrdered;
        address payable fulfilled_by ;
    }
        
    mapping(uint =>Order) public orders;
    uint public ordersCount = 0;
    uint i=0;
  
    function createOrder(uint _itemId,uint _quantityOrdered) public {
        require(_quantityOrdered <= ar.getQuantity(_itemId), "handling require");
        j++;
        orders[j].ordered_by = msg.sender;
        orders[j].orderId = j;
        orders[j].itemId = _itemId;
        orders[j].quantityOrdered = _quantityOrdered;
        orders[j].fulfilled_by = ar.getAdded_by(_itemId);
        ar.decreaseQuantity(_itemId, _quantityOrdered);
        ordersCount++;
    }
    
    function getOrdered_by(uint x) public view returns(address){
        return orders[x].ordered_by;
    }
    
    function getFulfilled_by(uint x) public view returns(address){
        return orders[x].fulfilled_by;
    }
    
    function getOrdersCount() public view returns(uint){
        return ordersCount;
    }
        
}
