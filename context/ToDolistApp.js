import React, { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { toDoListAddress, toDoListABI } from "./constants";

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(toDoListAddress, toDoListABI, signerOrProvider);

const ToDolistApp = () => {};

export default ToDolistApp;
