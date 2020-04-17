"use strict";
(() => {
  // allKeysAndSymbols
  const objectHashTable = Object.create(null);
  objectHashTable.apple = "🍏";
  objectHashTable.pear = "🍐";
  objectHashTable.cherry = "🍒";

  const plainObject = {};
  plainObject.apple = "🍏";
  plainObject.pear = "🍐";
  plainObject.cherry = "🍒";

  const inheritedObject = Object.create(plainObject);
  inheritedObject.orange = "🍊";
  inheritedObject.lemon = "🍋";

  const inheritedObjectWithMethods = Object.create(plainObject);
  inheritedObjectWithMethods.orange = "🍊";
  inheritedObjectWithMethods.lemon = "🍋";

  inheritedObjectWithMethods.getOrange = function () {
    return this.orange;
  };

  inheritedObjectWithMethods.getCherry = function () {
    return this.cherry;
  };

  const inheritedObjectWithSymbols = Object.create(plainObject);
  const s1 = Symbol("redApple");
  inheritedObjectWithSymbols[s1] = "🍎";

  function allKeysAndSymbols(obj) {
    if (!obj) return;

    let arrayOfKeysAndSymbols = [];

    const props = Object.getOwnPropertyNames(obj);
    const symbols = Object.getOwnPropertySymbols(obj);

    arrayOfKeysAndSymbols = [...props, ...symbols];

    const proto = Object.getPrototypeOf(obj);
    if (proto) {
      arrayOfKeysAndSymbols = [...arrayOfKeysAndSymbols, ...allKeysAndSymbols(proto)];
    }

    return arrayOfKeysAndSymbols;
  }

  console.groupCollapsed("[allKeysAndSymbols]");
  console.log("objectHashTable", objectHashTable, "\nprops", allKeysAndSymbols(objectHashTable));
  console.log("plainObject", plainObject, "\nprops", allKeysAndSymbols(plainObject));
  console.log("inheritedObject", inheritedObject, "\nprops", allKeysAndSymbols(inheritedObject));
  console.log(
    "inheritedObjectWithMethods",
    inheritedObjectWithMethods,
    "\nprops",
    allKeysAndSymbols(inheritedObjectWithMethods)
  );
  console.log(
    "inheritedObjectWithSymbols",
    inheritedObjectWithSymbols,
    "\nprops",
    allKeysAndSymbols(inheritedObjectWithSymbols)
  );
  console.groupEnd("[allKeysAndSymbols]");
})();

(() => {
  // PROXY FOR IN
  const proto = { value: 42 };
  const object = Object.create(proto);

  Object.defineProperty(object, "year", {
    value: 2020,
    writable: true,
    configurable: true,
    enumerable: false,
  });

  const symbol = Symbol("bazzinga");
  object[symbol] = 42;

  console.groupCollapsed("[IN OPERATOR PROXY]");
  console.log("без proxy");
  console.log("value" in object);
  console.log("year" in object);
  console.log(symbol in object);

  const proxy = new Proxy(object, {
    has(target, key) {
      const isOwnProp = Object.prototype.hasOwnProperty.call(target, key);
      return isOwnProp;
    },
  });
  console.log("с proxy");
  console.log("value" in proxy);
  console.log("year" in proxy);
  console.log(symbol in proxy);
  console.groupEnd("[IN OPERATOR PROXY]");
})();
