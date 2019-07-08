pragma solidity ^0.5.0;
contract addRawMaterials{
    
    constructor() public payable {
    }
    
    struct Item{
        address payable added_by;
        uint itemId ;
        string itemName;
        uint fat;
        uint calories;
        uint protein;
        uint carbohydrate;
        uint rate;
        uint quantity;
        uint status;
    }
    
    event AddedRawMaterials(address added_by,string itemName,uint quantity,uint status);
    mapping(uint=>Item) public itemList; // mapping of all items added 

    uint j = 0;
    uint i=0;
    uint public itemsCount = 0 ;
    function addEntry(string memory _name,uint _fat,uint _cal,uint _pro,uint _carb,uint _rate,uint _quantity) public
    {   require(bytes(_name).length != 0 && _fat>0 && _cal>0 && _quantity>0 && _rate>0 && _carb>0 && _pro>0, "handling require");
        i++;
        itemList[i].added_by = msg.sender;
        itemList[i].itemId = i;
        itemList[i].itemName = _name;
        itemList[i].fat = _fat;
        itemList[i].calories = _cal;
        itemList[i].protein = _pro;
        itemList[i].carbohydrate = _carb;
        itemList[i].rate = _rate;
        itemList[i].status = 1;
        itemList[i].quantity = _quantity;
        emit AddedRawMaterials(msg.sender, _name,_quantity,itemList[i].status);
        itemsCount++;
    }
    
    function getQuantity(uint x) external view returns(uint){
        return itemList[x].quantity;
    }
    
    function getAdded_by(uint x) external view returns(address payable){
        return itemList[x].added_by;
    }
    
    function decreaseQuantity(uint x,uint q) external{
        itemList[x].quantity -= q;
    }
   
    function getItemsCount() public view returns(uint){
        return i;
    }

    function getItemName(uint x) public view returns (string memory){
        return itemList[x].itemName;
    }

    function getPrice(uint x) public view returns(uint){
        return itemList[x].rate;
    }
}