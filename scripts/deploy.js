const hre = require("hardhat");

async function main() {
  const ToDoList = await hre.ethers.getContractFactory("ToDoList");
  const toDoList = await ToDoList.deploy();
  await toDoList.waitForDeployment();

  console.log("contract deployed to: ", await toDoList.getAddress());
  // console.log(toDoList);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
