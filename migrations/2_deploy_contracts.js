// // migrations/2_deploy_contracts.js
// const MyNFT = artifacts.require("MyNFT");

// module.exports = function (deployer) {
//   deployer.deploy(MyNFT, "MyNFT", "MNFT");
// };


const CustomToken = artifacts.require("CustomToken");

module.exports = function (deployer) {
  deployer.deploy(
    CustomToken,
    "MyToken",
    "MTK",
    web3.utils.toWei("1000000", "ether")
  ); // Adjust the total supply as needed
};