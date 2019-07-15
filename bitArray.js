const SIZE = 100000;

var BitVector = function(size) 
{
  this.store = [size / 32 + 1];
};

BitVector.prototype.setBit = function(bit, val) 
{
  var index = ~~(bit / 32);
  var shift = ~~(bit % 32);
  var mask = 1 << shift;
  if (val) {
    this.store[index] = this.store[index] | mask;
  } else {
    this.store[index] = this.store[index] & ~mask;
  }
};

BitVector.prototype.isSet = function(bit) 
{
  var index = ~~(bit / 32);
  var shift = ~~(bit % 32);
  var mask = 1 << shift;
  return (this.store[index] & mask) > 0;
};

var Set = function(values) 
{
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

Set.prototype.showElements = function() 
{
  for (var position = 0; position < SIZE; position++)
    if (this.bitArray.isSet(position)) console.log(position);
};

Set.prototype.has = function(value) 
{
  return this.bitArray.isSet(value);
};

Set.prototype.getMin = function() 
{
  for (var position = 0; position < SIZE; position++)
    if (this.bitArray.isSet(position)) return position;
  return 0;
};

Set.prototype.getMax = function() 
{
  var answer = 0;
  for (var position = 0; position < SIZE; position++)
    if (this.bitArray.isSet(position)) answer = position;
  return answer;
};

Set.prototype.addElement = function(value) 
{
  if (!this.bitArray.isSet(value)) {
    this.bitArray.setBit(value, 1);
    this.size++;
  }
};

Set.prototype.deleteElement = function(value) 
{
  if (this.bitArray.isSet(value)) {
    this.bitArray.setBit(value, 0);
    this.size--;
  }
};

Set.prototype.setZeroAll = function() 
{
  for (var position = 0; position < SIZE; position++)
    this.bitArray.setBit(position, 0);
};

Set.prototype.assign = function(set) 
{
  this.bitArray = set.bitArray;
  this.size = set.size;
};

Set.prototype.union = function(set) 
{
  for (var position = 0; position < SIZE; position++)
    if (set.bitArray.isSet(position) && !this.bitArray.isSet(position)) {
      this.bitArray.setBit(position, 1);
      this.size++;
    }
};

Set.prototype.isDisjunctive = function(set) 
{
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

Set.prototype.unionDisjunctive = function(set) 
{
  if (this.isDisjunctive(set)) return this.union(set);
  else return null;
};

Set.prototype.intersect = function(set) 
{
  for (var position = 0; position < SIZE; position++)
    if (this.bitArray.isSet(position))
        if(!set.bitArray.isSet(position))
        {
            this.bitArray.setBit(position, 0);
            this.size--;
        }
};

Set.prototype.difference = function(set) 
{
  for (var position = 0; position < SIZE; position++)
    if (this.bitArray.isSet(position))
        if(set.bitArray.isSet(position)) 
        {
            this.bitArray.setBit(position, 0);
            this.size--;
        }
};

Set.prototype.equals = function(set) 
{
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

var A = new Set([1, 2, 3, 6, 7, 8]);
var B = new Set([2, 3, 5, 9]);
var C = new Set([12, 13, 5, 9]);
var D = new Set([12, 13]);
var F = new Set([4, 5, 9, 10]);

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

A.addElement(155);
var E = new Set();
E.assign(A);
E.showElements();

console.log(" ");

A.deleteElement(155);
A.showElements();

console.log(" ");

B.setZeroAll();
B.showElements();

console.log(" ");

console.log("A is disjunctive with B ? " + A.isDisjunctive(B));
console.log("C is disjunctive with F ? " + C.isDisjunctive(F));
console.log("A is disjunctive with F ? " + A.isDisjunctive(F));

console.log(" ");

C.unionDisjunctive(F);
console.log("length C disjunctive union F: " + C.size);
C.showElements();
