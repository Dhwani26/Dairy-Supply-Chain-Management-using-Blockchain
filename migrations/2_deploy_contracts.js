var addProducts = artifacts.require("./addProducts.sol");
var addRawMaterials = artifacts.require("./addRawMaterials.sol");
var orderRawMaterials = artifacts.require("./orderRawMaterials.sol");
var Warehouse = artifacts.require("./Warehouse.sol");
var Login = artifacts.require("./Login.sol");
var Register = artifacts.require("./Register.sol");
var orderDairyProducts = artifacts.require("./orderDairyProducts.sol");
var FeedbackFarmer = artifacts.require("./FeedbackFarmer.sol");
var FeedbackProducer = artifacts.require("./FeedbackProducer.sol");

module.exports = function(deployer) {
  deployer.deploy(addProducts);
  deployer.deploy(addRawMaterials);
  deployer.deploy(orderRawMaterials);
  deployer.deploy(Warehouse);
  deployer.deploy(Login);
  deployer.deploy(Register);
  deployer.deploy(orderDairyProducts);
  deployer.deploy(FeedbackFarmer);
  deployer.deploy(FeedbackProducer);
};