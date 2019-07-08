pragma solidity ^0.5.0;


contract Warehouse {
  constructor() public {
  }

   struct warehouse{
        uint id;
        string location ;
        uint space ;
        address owner ;
    }
    
    mapping(uint => warehouse) public warehouses ;
    uint public warehouseCount = 0;
    struct productsAdded {
        uint warehouse_id ;
        string product_name ;
        uint quantity ;
        string quality ;
    }
    
    uint nextId ;
    mapping(uint => productsAdded) public list ;
    function createWarehouse(string memory _location,uint _space) public {
        nextId++;
        warehouses[nextId].id = nextId;
        warehouses[nextId].location = _location;
        warehouses[nextId].space = _space;
        warehouses[nextId].owner = msg.sender;
        warehouseCount++;
    }
    
    uint j = 0 ;
    
    function add(uint _id,string memory _product_name,uint _quantity,string memory _quality) public returns(bool){
        require(_id <= warehouseCount, "handlind reuire");
        j++;
        list[j].warehouse_id = _id;
        list[j].product_name = _product_name;
        list[j].quantity = _quantity;
        list[j].quality = _quality;
    }
    
}
