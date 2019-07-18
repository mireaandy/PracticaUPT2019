
const SIZE = 100000;

var BitVector = function (size) {
  this.store = [size / 32 + 1];
};

BitVector.prototype.setBit = function (bit, val) {
  var index = ~~(bit / 32);
  var shift = ~~(bit % 32);
  var mask = 1 << shift;
  if (val) {
    this.store[index] = this.store[index] | mask;
  } else {
    this.store[index] = this.store[index] & ~mask;
  }
};

BitVector.prototype.isSet = function (bit) {
  var index = ~~(bit / 32);
  var shift = ~~(bit % 32);
  var mask = 1 << shift;
  return (this.store[index] & mask) > 0;
};

var Set = function (values) {
  this.bitArray = new BitVector(SIZE);
  this.size = 0;

  for (var position = 0; position < SIZE; position++)
    this.bitArray.setBit(position, 0);

  if (typeof values === typeof []) {
    this.size = values.length;
    var posElementsArray = 0;

    for (value of values) this.bitArray.setBit(value, 1);
  }
};

Set.prototype.showElements = function () {
  var result = "";
  for (var position = 0; position < SIZE; position++)
    if (this.bitArray.isSet(position)) result += position + " ";
  return result;
};

Set.prototype.has = function (value) {
  return this.bitArray.isSet(value);
};

Set.prototype.getMin = function () {
  for (var position = 0; position < SIZE; position++)
    if (this.bitArray.isSet(position)) return position;
  return 0;
};

Set.prototype.getMax = function () {
  var answer = 0;
  for (var position = 0; position < SIZE; position++)
    if (this.bitArray.isSet(position)) answer = position;
  return answer;
};

Set.prototype.addElement = function (value) {
  if (!this.bitArray.isSet(value) && value) {
    this.bitArray.setBit(value, 1);
    this.size++;
  }
};

Set.prototype.deleteElement = function (value) {
  if (this.bitArray.isSet(value) && value) {
    this.bitArray.setBit(value, 0);
    this.size--;
  }
};

Set.prototype.deleteSet = function () {
  for (var position = 0; position < SIZE; position++)
    this.bitArray.setBit(position, 0);
};

Set.prototype.assign = function (set) {
  this.bitArray = set.bitArray;
  this.size = set.size;
};

Set.prototype.union = function (set) {
  for (var position = 0; position < SIZE; position++)
    if (set.bitArray.isSet(position) && !this.bitArray.isSet(position)) {
      this.bitArray.setBit(position, 1);
      this.size++;
    }
};

Set.prototype.isDisjunctive = function (set) {
  var result = true;
  if (!this.equals(set)) {
    for (var position = 0; position < SIZE; position++)
      if (this.bitArray.isSet(position))
        if (set.bitArray.isSet(position)) {
          result = false;
          break;
        }
  } else result = false;
  return result;
};

Set.prototype.unionDisjunctive = function (set) {
  if (this.isDisjunctive(set)) return this.union(set);
  else return null;
};

Set.prototype.intersect = function (set) {
  for (var position = 0; position < SIZE; position++)
    if (this.bitArray.isSet(position))
      if (!set.bitArray.isSet(position)) {
        this.bitArray.setBit(position, 0);
        this.size--;
      }
};

Set.prototype.difference = function (set) {
  for (var position = 0; position < SIZE; position++)
    if (this.bitArray.isSet(position))
      if (set.bitArray.isSet(position)) {
        this.bitArray.setBit(position, 0);
        this.size--;
      }
};

Set.prototype.equals = function (set) {
  var result = true;
  if (this.size === set.size)
    for (var position = 0; position < SIZE; position++) {
      if (this.bitArray.isSet(position) !== set.bitArray.isSet(position)) {
        result = false;
        break;
      }
    }
  else result = false;
  return result;
};

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
            this.addElement(value);
}

linkedList.prototype.addElement = function(value)
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
    var result = "";
    var current = this.head;
    while(current !== null)
    {
        result += current.data + " ";
        current = current.next;
    }
    return result;
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

linkedList.prototype.deleteElement = function(value)
{
    var current = this.head;
    if(value)
    {
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
}

linkedList.prototype.deleteSet = function()
{
    this.head = null;
    this.size = 0;
}

linkedList.prototype.assign = function(list)
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
            this.addElement(current.data);
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
            this.deleteElement(current.data);
        current = current.next;
    }
}

linkedList.prototype.difference = function(list)
{
    var current = this.head;
    while(current !== null)
    {
        if(list.has(current.data))
            this.deleteElement(current.data);
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

var set1;
var set2;

var declare = function()
{
    var checkBoxes = document.getElementsByClassName("declare");
    for(var i = 0; checkBoxes[i]; i++)
    {
        if(checkBoxes[i].checked)
        {
            var checkedValue = checkBoxes[i].value;
            break;
        }
  }
  switch(checkedValue)
  {
    case "bitArray":
        set1 = new Set();
        set2 = new Set();
        break;
    case "linkedList":
        set1 = new linkedList();
        set2 = new linkedList();
        break;
  }
}

var parseInputAdd = function(input, setNumber)
{
    for(value of input)
        switch(setNumber)
        {
            case 1:
                set1.addElement(value);
                break;
            case 2:
                set2.addElement(value);
                break;
        }
}

var parseInputDelete = function(input, setNumber)
{
    for(value of input)
        switch(setNumber)
        {
            case 1:
                set1.deleteElement(value);
                break;
            case 2:
                set2.deleteElement(value);
                break;
        }
}

var updateCurrentSets = function()
{
    document.getElementById("currentSet1").value = set1.showElements();
    document.getElementById("currentSet2").value = set2.showElements();
}

var onButtonAddClicked = function()
{
    parseInputAdd(document.getElementById("Set1").value.split(" "), 1);
    parseInputAdd(document.getElementById("Set2").value.split(" "), 2);
    document.getElementById("Set1").value = "";
    document.getElementById("Set2").value = "";
    updateCurrentSets();
}

var onButtonDeleteClicked = function()
{
    parseInputDelete(document.getElementById("Set1").value.split(" "), 1);
    parseInputDelete(document.getElementById("Set2").value.split(" "), 2);
    document.getElementById("Set1").value = "";
    document.getElementById("Set2").value = "";
    updateCurrentSets();
}

var onButtonUnion1Clicked = function()
{
    set1.union(set2);
    updateCurrentSets();
}

var onButtonUnion2Clicked = function()
{
    set2.union(set1);
    updateCurrentSets();
}

var onButtonIntersect1Clicked = function()
{
    set1.intersect(set2);
    updateCurrentSets();
}

var onButtonIntersect2Clicked = function()
{
    set2.intersect(set1);
    updateCurrentSets();
}

var onButtonDifference1Clicked = function()
{
    set1.difference(set2);
    updateCurrentSets();
}

var onButtonDifference2Clicked = function()
{
    set2.difference(set1);
    updateCurrentSets();
}