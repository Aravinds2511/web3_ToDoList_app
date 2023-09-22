import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers, getAddress } from "ethers";

import { toDoListAddress, toDoListABI } from "./constants";

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(toDoListAddress, toDoListABI, signerOrProvider);

export const ToDoListContext = React.createContext();

export const ToDoListProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState("");
  const [allToDoList, setAllToDoList] = useState([]);
  const [myList, setMyList] = useState([]);
  const [allAddress, setAllAddress] = useState([]);

  //connecting to metamask
  const checkWalletConnected = async () => {
    if (!window.ethereum) return setError("please install metamask");
    const account = await window.ethereum.request({ method: "eth_accounts" });
    if (account.length) {
      setCurrentAccount(account[0]);
      console.log(account[0]);
    } else {
      setError("please install metamask and connect");
    }
  };

  // connecting wallet
  const connectWallet = async () => {
    if (!window.ethereum) return setError("please install metamask");
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(account[0]);
  };

  //interacting with smart contract
  const toDoList = async (message) => {
    try {
      //connecting with smart contract
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      //create list
      const createList = await contract.createList(message);
      createList.wait();
      console.log(createList);
    } catch (error) {
      setError("something wrong creating list");
    }
  };

  const getToDoList = async () => {
    try {
      //connecting with smart contract
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      //get data
      const getAllAddress = await contract.getAddress();
      setAllAddress(getAllAddress);
      console.log(getAllAddress);

      getAllAddress.map(async (eL) => {
        const getSingleData = await contract.getCreatorData(eL);
        setAllToDoList.push(getToDoList);
        console.log(getSingleData);
      });

      const allMessage = await contract.getMessage();
      setMyList(allMessage);
    } catch (error) {
      setError("something wrong getting data");
    }
  };
  // change state of completion
  const change = async (address) => {
    try {
      //connecting with smart contract
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      const state = await contract.toggle(address);
      state.wait();
      console.log(state);
    } catch (error) {
      setError("something wrong changing state");
    }
  };
  return (
    <ToDoListContext.Provider
      value={{
        checkWalletConnected,
        connectWallet,
        toDoList,
        getToDoList,
        change,
      }}
    >
      {children}
    </ToDoListContext.Provider>
  );
};
