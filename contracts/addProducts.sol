pragma solidity ^0.5.0;


contract addProducts {
  constructor() public payable {
  }
    struct Product{
        address payable added_by;
        uint productId;
        string ProductName; //product name
        uint fat;
        uint calories;
        uint protein;
        uint carbohydrate;
        uint rate;
        uint quantity;
        uint status;
    }

    event ProductAdded(address added_by ,string name,uint rate,uint status);
    mapping(uint=>Product) public ProductList;
    uint i=0;

        function addProduct(string memory _name,uint _fat,uint _cal,uint _pro,uint _carb,uint _rate,uint _quantity)  public returns(bool){
            require(_fat>0 && _cal>0 && _quantity>0 && _rate>0 && _carb>0 && _pro>0, "handling require");
                i++;
                ProductList[i].added_by = msg.sender;
                ProductList[i].productId = i;
                ProductList[i].ProductName = _name;
                ProductList[i].fat = _fat;
                ProductList[i].calories = _cal;
                ProductList[i].protein = _pro;
                ProductList[i].carbohydrate = _carb;
                ProductList[i].rate = _rate;
                ProductList[i].status = 1;
                ProductList[i].quantity = _quantity;
                emit ProductAdded(msg.sender,_name,_rate, ProductList[i].status);
        }
    function getQuantity(uint x) public view returns(uint){
        return ProductList[x].quantity;
    }
    function getAdded_by(uint x) public view returns(address payable){
        return ProductList[x].added_by;
    }
    function decreaseQuantity(uint x,uint q) public {
        ProductList[x].quantity -= q;
    }
    function getProductsCount() public view returns(uint) {
        return i;
    }
}
