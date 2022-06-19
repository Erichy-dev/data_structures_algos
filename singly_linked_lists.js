"use strict";
// create my custom node for the Singly linked List(SLL)
class SLLnode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
// create SLL class
class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.insertedNode = null;
        this.rightTrackerNode = null;
    }
    setTailForHead(node) {
        if (this.ListSize() === 2)
            this.tail = node.next;
    }
    insertAtHead(data) {
        const node = new SLLnode(data);
        if (this.head) {
            node.next = this.head;
        }
        this.head = node;
        this.setTailForHead(node);
        return node;
    }
    returnLastNode(currentNode, node) {
        while (currentNode === null || currentNode === void 0 ? void 0 : currentNode.next) {
            currentNode = currentNode.next;
        }
        currentNode.next = node;
        return currentNode;
    }
    insertAtTail(data) {
        const node = new SLLnode(data);
        this.tail = node;
        let currentNode = this.head;
        return (!currentNode) ? this.head = node : this.returnLastNode(currentNode, this.tail);
    }
    insertHeadForPosition(position, data) {
        if (position === 1)
            this.insertedNode = this.insertAtHead(data);
    }
    insertTailForPosition(position, data) {
        if (position === this.ListSize() + 1)
            this.insertedNode = this.insertAtTail(data);
    }
    showErrorEmptyList(currentNode, position) {
        if (!currentNode && position > 1) {
            console.log("The list is empty so no such position.");
            this.insertedNode = null;
        }
    }
    insertMiddleForPosition(position, currentNode, newNode) {
        let trackPosition = 1;
        while (trackPosition !== position - 1) {
            currentNode = currentNode === null || currentNode === void 0 ? void 0 : currentNode.next;
            this.rightTrackerNode = currentNode === null || currentNode === void 0 ? void 0 : currentNode.next;
            trackPosition++;
        }
        if (currentNode) {
            currentNode.next = newNode;
            newNode.next = this.rightTrackerNode;
        }
        this.insertedNode = currentNode;
    }
    insertAtPosition(data, position) {
        const newNode = new SLLnode(data);
        let currentNode = this.head;
        this.showErrorEmptyList(currentNode, position);
        this.insertHeadForPosition(position, data);
        this.rightTrackerNode = currentNode === null || currentNode === void 0 ? void 0 : currentNode.next;
        if (position > 1)
            this.insertMiddleForPosition(position, currentNode, newNode);
        this.insertTailForPosition(position, data);
        return this.insertedNode;
    }
    rearrangeListForRemoval(firstNode) {
        var _a;
        if ((_a = this.head) === null || _a === void 0 ? void 0 : _a.next) {
            firstNode = this.head.next;
            this.head = firstNode;
        }
        return this.head;
    }
    RemoveAtHead() {
        let firstNode = this.head;
        return firstNode ? this.rearrangeListForRemoval(firstNode) : this.head = null;
    }
    removeTailIterator() {
        var _a;
        let currentNode = this.head;
        while ((_a = currentNode === null || currentNode === void 0 ? void 0 : currentNode.next) === null || _a === void 0 ? void 0 : _a.next) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }
    RemoveAtTail() {
        let currentNode = this.removeTailIterator();
        if (currentNode)
            currentNode.next = null;
        return this.tail = null;
    }
    searchIterator(data, currentNode, nodeMatch) {
        if ((currentNode === null || currentNode === void 0 ? void 0 : currentNode.data) === data)
            nodeMatch = currentNode;
        return nodeMatch;
    }
    Search(data) {
        let currentNode = this.head;
        let nodeMatch = null;
        while (currentNode) {
            nodeMatch = this.searchIterator(data, currentNode, nodeMatch);
            currentNode = currentNode.next;
        }
        return nodeMatch;
    }
    Traverse() {
        let listArray = [];
        let currentNode = this.head;
        while (currentNode) {
            listArray.push(currentNode.data);
            currentNode = currentNode.next;
        }
        return listArray;
    }
    ListSize() {
        let currentNode = this.head;
        let listLength = 0;
        while (currentNode) {
            currentNode = currentNode.next;
            listLength++;
        }
        return listLength;
    }
}
const TestSLL = new SinglyLinkedList();
TestSLL.insertAtHead(3);
TestSLL.insertAtHead(7);
// TestSLL.insertAtHead(5)
// TestSLL.insertAtHead(6)
// TestSLL.insertAtHead(6)
// TestSLL.insertAtTail(9)
// TestSLL.RemoveAtHead()
// TestSLL.RemoveAtTail()
TestSLL.insertAtPosition(4, 2);
console.log(TestSLL);
// THE END
