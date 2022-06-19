// create my custom node for the Singly linked List(SLL)
class SLLnode<DataType>{
  public next: SLLnode<DataType> | null = null;
  constructor (public data: DataType){}
}

// create interface for my SLL class
interface SinglyLinkedListInterface<DataType> {
  insertAtHead(data: DataType): SLLnode<DataType>;
  insertAtTail(data: DataType): SLLnode<DataType>;
  insertAtPosition(data: DataType, position: number): SLLnode<DataType> | null;
  RemoveAtHead(): SLLnode<DataType> | null;
  RemoveAtTail(): SLLnode<DataType>|null;
  Search(data: DataType): SLLnode<DataType> | null;
  Traverse(): DataType[] | null;
  ListSize(): number;
}

// create SLL class
class SinglyLinkedList<DataType> implements SinglyLinkedListInterface<DataType>{
  private head: SLLnode<DataType> | null = null;
  private tail: SLLnode<DataType> | null = null;

  private setTailForHead (node: SLLnode<DataType>): void{
    if(this.ListSize() === 2) this.tail = node.next;
  }
  public insertAtHead(data: DataType): SLLnode<DataType> {
    const node = new SLLnode(data);
    if(this.head){
      node.next = this.head;
    }
    this.head = node;
    this.setTailForHead(node);
    return node;
  }

  private returnLastNode(currentNode: SLLnode<DataType>, node: SLLnode<DataType>): SLLnode<DataType>{
    while(currentNode?.next){
      currentNode = currentNode.next
    }
    currentNode.next = node;
    return currentNode;
  }
  public insertAtTail(data: DataType): SLLnode<DataType> {
    const node = new SLLnode(data)
    this.tail = node;
    let currentNode = this.head;
    return (!currentNode) ? this.head = node: this.returnLastNode(currentNode, this.tail);
  }

  private insertedNode: SLLnode<DataType> | null = null;
  private rightTrackerNode: SLLnode<DataType> | null = null;
  private insertHeadForPosition(position: number, data: DataType): void{
    if(position === 1) this.insertedNode = this.insertAtHead(data);
  }
  private insertTailForPosition(position: number, data: DataType): void{
    if(position === this.ListSize()+1) this.insertedNode = this.insertAtTail(data);
  }
  private showErrorEmptyList(currentNode: SLLnode<DataType>|null, position: number): void{
    if(!currentNode && position > 1){
      console.log("The list is empty so no such position.");
      this.insertedNode = null;
    }
  }
  private insertMiddleForPosition(position: number, currentNode: SLLnode<DataType> | null, newNode: SLLnode<DataType>){
    let trackPosition = 1;
    while(trackPosition !== position-1){
      currentNode = currentNode?.next
      this.rightTrackerNode = currentNode?.next;
      trackPosition++
    }
    if(currentNode){
      currentNode.next = newNode;
      newNode.next = this.rightTrackerNode;
    }
    this.insertedNode = currentNode;
  }
  public insertAtPosition(data:DataType, position: number): SLLnode<DataType> | null{
    const newNode = new SLLnode(data)
    let currentNode: SLLnode<DataType> | null | undefined = this.head;
    this.showErrorEmptyList(currentNode, position)
    this.insertHeadForPosition(position, data)
    this.rightTrackerNode= currentNode?.next;
    if(position > 1) this.insertMiddleForPosition(position, currentNode, newNode);
    this.insertTailForPosition(position, data)
    return this.insertedNode;
  }

  private rearrangeListForRemoval(firstNode: SLLnode<DataType>): SLLnode<DataType> | null{
    if(this.head?.next) {
      firstNode = this.head.next
      this.head=firstNode
    }
    return this.head
  }
  public RemoveAtHead(): SLLnode<DataType> | null{
    let firstNode = this.head;
    return firstNode? this.rearrangeListForRemoval(firstNode): this.head = null;
  }

  private removeTailIterator(): SLLnode<DataType> | null{
    let currentNode = this.head;
    while(currentNode?.next?.next){
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  public RemoveAtTail(): SLLnode<DataType> | null {
    let currentNode = this.removeTailIterator()
    if(currentNode)currentNode.next = null;
    return this.tail = null;
  }

  private searchIterator(data: DataType, currentNode: SLLnode<DataType> | null, nodeMatch: SLLnode<DataType>|null): SLLnode<DataType>|null{
      if(currentNode?.data === data) nodeMatch = currentNode;
    return nodeMatch;
  }
  public Search(data: DataType): SLLnode<DataType> | null{
    let currentNode = this.head;
    let nodeMatch = null;
    while(currentNode){
      nodeMatch = this.searchIterator(data, currentNode, nodeMatch)
      currentNode = currentNode.next;
    }
    return nodeMatch;
  }

  public Traverse(): DataType[] | null {
    let listArray = [];
    let currentNode = this.head;
    while(currentNode){
      listArray.push(currentNode.data);
      currentNode = currentNode.next;
    }
    return listArray;
  }
  public ListSize(): number {
    let currentNode: SLLnode<DataType> | null = this.head;
    let listLength: number = 0;
    while(currentNode){
      currentNode = currentNode.next;
      listLength++;
    }
    return listLength;
  }
}

const TestSLL = new SinglyLinkedList()
TestSLL.insertAtHead(3)
TestSLL.insertAtHead(7)
// TestSLL.insertAtHead(5)
// TestSLL.insertAtHead(6)
// TestSLL.insertAtHead(6)
// TestSLL.insertAtTail(9)
// TestSLL.RemoveAtHead()
// TestSLL.RemoveAtTail()
TestSLL.insertAtPosition(4, 2)
console.log(TestSLL);

// THE END
