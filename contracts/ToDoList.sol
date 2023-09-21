// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ToDoList {
    uint256 public _idUser;
    address public owner;

    address[] public creators;
    string[] public message;
    uint256[] public messageId;

    struct ToDoListApp {
        address account;
        uint256 userId;
        string message;
        bool completed;
    }

    event ToDoEvent(
        address indexed account,
        uint256 indexed userId,
        string message,
        bool completed
    );

    mapping(address => ToDoListApp) public toDoListApps;

    constructor() {
        owner = msg.sender;
    }

    function inc() internal {
        _idUser++;
    }

    function createList(string calldata _message) external {
        inc();

        uint256 id = _idUser;
        ToDoListApp storage toDo = toDoListApps[msg.sender];

        toDo.account = msg.sender;
        toDo.userId = id;
        toDo.message = _message;
        toDo.completed = false;

        creators.push(msg.sender);
        message.push(_message);
        messageId.push(id);

        emit ToDoEvent(msg.sender, toDo.userId, _message, toDo.completed);
    }

    function getCreatorData(
        address _address
    ) public view returns (address, uint256, string memory, bool) {
        ToDoListApp memory singleUser = toDoListApps[_address];

        return (
            singleUser.account,
            singleUser.userId,
            singleUser.message,
            singleUser.completed
        );
    }

    function getAddress() external view returns (address[] memory) {
        return creators;
    }

    function getMessage() external view returns (string[] memory) {
        return message;
    }

    //changing the completion state
    function toggle(address _creator) public {
        ToDoListApp storage singleUser = toDoListApps[_creator];
        singleUser.completed = !singleUser.completed;
    }
}
