import React, { useEffect, useState, useContext } from "react";
import { MdVerified } from "react-icons/md";
import { RiSendPlaneFill, RiCloseLine } from "react-icons/ri";
import Image from "next/image";

import { ToDoListContext } from "@/context/ToDolistApp";
import Style from "../styles/index.module.css";
import Loading from "../loading.gif";
import Data from "../components/Data";

const Home = () => {
  const [message, setMessage] = useState("");
  const {
    checkWalletConnected,
    connectWallet,
    toDoList,
    getToDoList,
    change,
    currentAccount,
    error,
    allToDoList,
    myList,
    allAddress,
  } = useContext(ToDoListContext);

  useEffect(() => {
    checkWalletConnected();
    getToDoList();
  }, []);

  return (
    <div className={Style.home}>
      <div className={Style.navBar}>
        <img src={ Loading } alt="logo" width={50} height={50} />
        <div className={Style.connect}>
          {!currentAccount ? (
            <button onClick={() => connectWallet()}>Connect Wallet</button>
          ) : (
            <button>{currentAccount.slice(0, 20)}...</button>
          )}
        </div>
      </div>
      <div className={Style.home_box}>
        <div className={Style.home_completed}>
          <h2>ToDo History</h2>
          <div>
            {myList.map((el, i) => (
              <div className={Style.home_completed_list}>
                <MdVerified className={Style.iconColor} />
                <p>{el.slice(0, 30)}...</p>
              </div>
            ))}
          </div>
        </div>
        <div className={Style.home_create}>
          <div className={Style.home_create_box}>
            <h2>Create ToDoList</h2>
            <div className={Style.home_create_input}>
              <input
                type="Text"
                placeholder="Enter your todo"
                onChange={(e) => setMessage(e.target.value)}
              />

              {currentAccount ? (
                <RiSendPlaneFill
                  className={Style.iconBlack}
                  onClick={() => toDoList(message)}
                />
              ) : (
                <RiSendPlaneFill
                  className={Style.iconBlack}
                  onClick={() => connectWallet()}
                />
              )}
            </div>

            <Data
              allToDoList={allToDoList}
              allAddress={allAddress}
              myList={myList}
              change={change}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
