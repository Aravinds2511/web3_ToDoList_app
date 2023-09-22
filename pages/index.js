import React, { useEffect, useState, useContext } from "react";

import { ToDoListContext } from "@/context/ToDolistApp";

const Home = () => {
  const { checkWalletConnected, toDoList } = useContext(ToDoListContext);

  useEffect(() => {
    checkWalletConnected();
  }, []);

  return <div>Home</div>;
};

export default Home;
