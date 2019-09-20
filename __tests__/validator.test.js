const validator = require('../lib/validator.js');

describe('validator module', () => {

  const str = 'yes';
  const num = 1;
  const arr = ['a'];
  const obj = { x: 'y' };
  const func = () => { };
  const bool = false;

  describe('performs basic validation of', () => {

    it('strings', () => {
      expect(validator.isString(str)).toBeTruthy();
      expect(validator.isString(num)).toBeFalsy();
      expect(validator.isString(arr)).toBeFalsy();
      expect(validator.isString(obj)).toBeFalsy();
      expect(validator.isString(func)).toBeFalsy();
      expect(validator.isString(bool)).toBeFalsy();
    });

    it('numbers', () => {
      expect(validator.isNumber(str)).toBeFalsy();
      expect(validator.isNumber(num)).toBeTruthy();
      expect(validator.isNumber(arr)).toBeFalsy();
      expect(validator.isNumber(obj)).toBeFalsy();
      expect(validator.isNumber(func)).toBeFalsy();
      expect(validator.isNumber(bool)).toBeFalsy();
    });

    it('arrays', () => {
      expect(validator.isArray(str)).toBeFalsy();
      expect(validator.isArray(num)).toBeFalsy();
      expect(validator.isArray(arr)).toBeTruthy();
      expect(validator.isArray(obj)).toBeFalsy();
      expect(validator.isArray(func)).toBeFalsy();
      expect(validator.isArray(bool)).toBeFalsy();
    });

    it('objects', () => {
      expect(validator.isObj(str)).toBeFalsy();
      expect(validator.isObj(num)).toBeFalsy();
      expect(validator.isObj(arr)).toBeFalsy();
      expect(validator.isObj(obj)).toBeTruthy();
      expect(validator.isObj(func)).toBeFalsy();
      expect(validator.isObj(bool)).toBeFalsy();
    });

    it('booleans', () => {
      expect(validator.isBoolean(str)).toBeFalsy();
      expect(validator.isBoolean(num)).toBeFalsy();
      expect(validator.isBoolean(arr)).toBeFalsy();
      expect(validator.isBoolean(obj)).toBeFalsy();
      expect(validator.isBoolean(func)).toBeFalsy();
      expect(validator.isBoolean(bool)).toBeTruthy();
    });

    it('functions', () => {
      expect(validator.isFunction(str)).toBeFalsy();
      expect(validator.isFunction(num)).toBeFalsy();
      expect(validator.isFunction(arr)).toBeFalsy();
      expect(validator.isFunction(obj)).toBeFalsy();
      expect(validator.isFunction(func)).toBeTruthy();
      expect(validator.isFunction(bool)).toBeFalsy();
    });
  });

  describe('performs array validation of', () => {

    const arrayOfStrings = ['a', 'b', 'c'];
    const arrayOfNumbers = [1, 2, 3];
    const arrayOfObjects = [{}, {}, {}];
    const arrayOfBooleans = [true, false, true];

    it('strings', () => {
      expect(validator.isArrayOfStrings(arrayOfStrings)).toBeTruthy();
      expect(validator.isArrayOfStrings(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfStrings(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfStrings(arrayOfBooleans)).toBeFalsy();
    });

    it('numbers', () => {
      expect(validator.isArrayOfNumbers(arrayOfStrings)).toBeFalsy();
      expect(validator.isArrayOfNumbers(arrayOfNumbers)).toBeTruthy();
      expect(validator.isArrayOfNumbers(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfNumbers(arrayOfBooleans)).toBeFalsy();
    });

    it('objects', () => {
      expect(validator.isArrayOfObjects(arrayOfStrings)).toBeFalsy();
      expect(validator.isArrayOfObjects(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfObjects(arrayOfObjects)).toBeTruthy();
      expect(validator.isArrayOfObjects(arrayOfBooleans)).toBeFalsy();
    });

    it('booleans', () => {
      expect(validator.isArrayOfBooleans(arrayOfStrings)).toBeFalsy();
      expect(validator.isArrayOfBooleans(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfBooleans(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfBooleans(arrayOfBooleans)).toBeTruthy();
    });
  });

  describe('get validator for', () => {

    it('strings', () => {
      // TODO: pass getValidator the rules
      expect(validator.getValidator('string')).toBe(validator.isString);
    });

    it('numbers', () => {
      expect(validator.getValidator('number')).toBe(validator.isNumber);
    });

    it('arrays', () => {
      expect(validator.getValidator('array')).toBe(validator.isArray);
    });

    it('objects', () => {
      expect(validator.getValidator('object')).toBe(validator.isObj);
    });

    it('booleans', () => {
      expect(validator.getValidator('boolean')).toBe(validator.isBoolean);
    });

    it('functions', () => {
      expect(validator.getValidator('function')).toBe(validator.isFunction);
    });

    it('array of strings', () => {
      expect(validator.getValidator('strings')).toBe(validator.isArrayOfStrings);
    });

    it('array of numbers', () => {
      expect(validator.getValidator('numbers')).toBe(validator.isArrayOfNumbers);
    });

    it('array of objects', () => {
      expect(validator.getValidator('objects')).toBe(validator.isArrayOfObjects);
    });

    it('array of booleans', () => {
      expect(validator.getValidator('booleans')).toBe(validator.isArrayOfBooleans);
    });

  });


});

describe('get new validator for', () => {

  const str = '1';
  const strNum = '1';
  const strTrue = 'true';
  const strFalse = 'false';
  const num = 1;
  const numTrue = 1;
  const numFalse = 0;
  const boolTrue = true;
  const boolFalse = false;
  const date = new Date(1568937663000);
  const obj = {};
  const arr = [];

  it('casting string', () => {
    expect(validator.castString(str)).toBe('1');
    expect(validator.castString(num)).toBe('1');
    expect(validator.castString(boolTrue)).toBe('true');
    expect(validator.castString(String(new Date())));
    expect(() => {
      validator.castString(obj);
    }).toThrow(validator.CoerceError);
    expect(() => {
      validator.castString(arr);
    }).toThrow(validator.CoerceError);
  });

  it('casting number', () => {
    expect(validator.castNumber(num)).toBe(1);
    expect(validator.castNumber(strNum)).toBe(1);
    expect(() => {
      validator.castNumber(obj);
    }).toThrow(validator.CoerceError);
  });

  it('casting bool', () => {
    expect(validator.castBool(boolTrue)).toBe(true);
    expect(validator.castBool(boolFalse)).toBe(false);
    expect(validator.castBool(numTrue)).toBe(true);
    expect(validator.castBool(numFalse)).toBe(false);
    expect(validator.castBool(strTrue)).toBe(true);
    expect(validator.castBool(strFalse)).toBe(false);
    expect(() => {
      validator.castBool(obj);
    }).toThrow(validator.CoerceError);
    expect(() => {
      validator.castBool(str);
    }).toThrow(validator.CoerceError);
    expect(() => {
      validator.castBool(arr);
    }).toThrow(validator.CoerceError);
    expect(() => {
      validator.castBool(date);
    }).toThrow(validator.CoerceError);

  });

  it('casting date', () => {
    expect(validator.castDate(date)).toBe(date);
    expect(() => {
      validator.castDate(boolTrue);
    }).toThrow(validator.CoerceError);
    expect(() => {
      validator.castDate(num);
    }).toThrow(validator.CoerceError);
    expect(() => {
      validator.castDate(obj);
    }).toThrow(validator.CoerceError);
    expect(() => {
      validator.castDate(str);
    }).toThrow(validator.CoerceError);
    expect(() => {
      validator.castDate(arr);
    }).toThrow(validator.CoerceError);
  });
});