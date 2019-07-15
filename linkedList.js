var linkedListNode = function(value)
{
    this.data = value;
    this.next = null;
}

var linkedList = function(values)
{
    this.head = null;
    this.size = 0;

    if (typeof values === typeof []) 
        for (value of values)
            this.addValue(value);
}

linkedList.prototype.addValue = function(value)
{
    var newNode = new linkedListNode(value);
    if(this.head === null)
        this.head = newNode;
    else
    {
        var current = this.head;
        while(current.next !== null)
            current = current.next;
        current.next = newNode;
    }
    this.size++;
}

linkedList.prototype.showElements = function()
{
    var current = this.head;
    while(current !== null)
    {
        console.log(current.data);
        current = current.next;
    }
}

linkedList.prototype.has = function(value)
{
    var result = false;
    var current = this.head;
    while(current !== null)
    {
        if(current.data === value)
        {
            result = true;
            break;
        }
        current = current.next;
    }
    return result;
}

linkedList.prototype.getMin = function()
{
    var current = this.head.next;
    var min = this.head.data;
    while(current !== null)
    {
        if(current.data < min) min = current.data;
        current = current.next;
    }
    return min;
}

linkedList.prototype.getMax = function()
{
    var current = this.head.next;
    var max = this.head.data;
    while(current !== null)
    {
        if(current.data > max) max = current.data;
        current = current.next;
    }
    return max;
}

linkedList.prototype.deleteValue = function(value)
{
    var current = this.head;
    if(current.data === value)
        this.head = this.head.next;
    else
    {
        while(current.next.data !== value)
            current = current.next;
        current.next = current.next.next;
    }
    this.size--;
}

linkedList.prototype.deleteList = function()
{
    this.head = null;
    this.size = 0;
}

linkedList.prototype.assignList = function(list)
{
    this.head = list.head;
    this.size = list.size;
}

linkedList.prototype.union = function(list)
{
    var current = list.head;
    while(current !== null)
    {
        if(!this.has(current.data))
            this.addValue(current.data);
        current = current.next;
    }
}

linkedList.prototype.isDisjunctive = function(list)
{
    var current = this.head;
    var numberOfDifferences = 0;
    var result = true;
    if(!this.equals(list))
    {
        while(current !== null)
        {
            if(!list.has(current.data))
                numberOfDifferences++;
            current = current.next;
        }
    }
    else
        result = false;
    if(numberOfDifferences !== this.size)
        result = false;
    return result;
}

linkedList.prototype.unionDisjunctive = function(list)
{
    if(this.isDisjunctive(list))
        this.union(list);
}

linkedList.prototype.intersect = function(list)
{
    var current = this.head;
    while(current !== null)
    {
        if(!list.has(current.data))
            this.deleteValue(current.data);
        current = current.next;
    }
}

linkedList.prototype.difference = function(list)
{
    var current = this.head;
    while(current !== null)
    {
        if(list.has(current.data))
            this.deleteValue(current.data);
        current = current.next;
    }
}

linkedList.prototype.equals = function(list)
{
    var current = this.head;
    var numberOfEquals = 0;
    var result = true;
    if(this.size === list.size)
    {
        while(current !== null)
        {
            if(list.has(current.data)) 
                numberOfEquals++;
            current = current.next;
        }
    }
    else
        result = false;
    if(numberOfEquals !== this.size)
        result = false;
    return result;
}

var A = new linkedList([1, 2, 3, 6, 7, 8]);
var B = new linkedList([2, 3, 5, 9]);
var C = new linkedList([12, 13, 5, 9]);
var D = new linkedList([12, 13]);
var F = new linkedList([4, 5, 9, 10]);

console.log("length A :" + A.size);
console.log("length B :" + B.size);
console.log("length C :" + C.size);
console.log("length D :" + D.size);

console.log(" ");

console.log("A have 14 ? " + A.has(14));
console.log("B have 9 ? " + B.has(9));
console.log("D have 12 ? " + D.has(12));

console.log(" ");

console.log("A min ? " + A.getMin());
console.log("B min? " + B.getMin());
console.log("D min ? " + D.getMin());

console.log(" ");

console.log("A max ? " + A.getMax());
console.log("B max? " + B.getMax());
console.log("D max ? " + D.getMax());

console.log(" ");

A.union(B);
console.log("length A union B: " + A.size);
A.showElements();

console.log(" ");

B.intersect(C);
console.log("length B intersection C: " + B.size);
B.showElements();

console.log(" ");

C.difference(F);
console.log("length C difference F: " + C.size);
C.showElements();

console.log(" ");

console.log("A equals B ? " + A.equals(B));
console.log("B equals C ? " + B.equals(C));
console.log("C equals D ? " + C.equals(D));

console.log(" ");

A.addValue(155);
var E = new linkedList();
E.assignList(A);
E.showElements();

console.log(" ");

A.deleteValue(155);
A.showElements();

console.log(" ");

B.deleteList();
B.showElements();

console.log(" ");

console.log("A is disjunctive with B ? " + A.isDisjunctive(B));
console.log("C is disjunctive with F ? " + C.isDisjunctive(F));
console.log("A is disjunctive with F ? " + A.isDisjunctive(F));

console.log(" ");

C.unionDisjunctive(F);
console.log("length C disjunctive union F: " + C.size);
C.showElements();