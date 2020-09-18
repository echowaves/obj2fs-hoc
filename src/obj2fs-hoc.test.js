import ObjectInTest from './object-in-test'
const path = require('path')
const fs = require('fs-extra')

describe('ObjectInTest', () => {
  const key = './.test/obj.json'
  let objectInTest
  beforeEach(() => {
    objectInTest = new ObjectInTest()
    objectInTest.setKey(key)
  })

  describe('objectInTest.store(key)', () => {
    beforeEach(() => {
      fs.removeSync(path.resolve(key))
    })

    it('should generate file with `key`', () => {
      expect(fs.existsSync(key)).toBe(false)
      objectInTest.store()
      expect(fs.existsSync(key)).toBe(true)
    })
    it('should return json string', () => {
      expect(fs.existsSync(key)).toBe(false)
      const jsonObjectInTest = objectInTest.store()
      expect(typeof jsonObjectInTest).toBe('string')
      expect('{"prop1":"","prop2":2,"prop3":"three"}')
        .toEqual(jsonObjectInTest) })
  })

  describe('objectInTest.retrieve(key)', () => {
    beforeEach(() => {
      objectInTest.incProp2()
      objectInTest.store()
    })

    it('should retrieve file named `key`', () => {
      const retrievedObject = new ObjectInTest().setKey(key).retrieve()
      expect(retrievedObject instanceof ObjectInTest).toBe(true)
      expect(retrievedObject.prop1).toBe('')
      expect(retrievedObject.prop2).toBe(3) // this value is different from default and should be retrieved from file
      expect(retrievedObject.prop3).toBe('three')
      retrievedObject.incProp2() // test if object contains methods that correspond to type object type
      expect(retrievedObject.prop2).toBe(4)
    })
    it('should fail to retrieve file  that does not exist', () => {
      fs.removeSync(`${key}-non_existing_key`)
      expect(() => {
        new ObjectInTest().setKey('non_existing_key').retrieve()
      }).toThrowError('No such key or file name found on disk')
    })
  })

  describe('ObjectInTest.retrieveOrNew()', () => {
    beforeEach(() => {
      objectInTest.store(key)
    })
    it('should retrieve file named `key`', () => {
      const retrievedObject = new ObjectInTest().setKey(key).retrieveOrNew()
      expect(retrievedObject instanceof ObjectInTest).toBe(true)
      expect(retrievedObject.prop1).toBe('')
      expect(retrievedObject.prop2).toBe(2)
      expect(retrievedObject.prop3).toBe('three')
      retrievedObject.incProp2() // test if object contains methods that correspond to type object type
      expect(retrievedObject.prop2).toBe(3)
    })
    it('should create new instance when file does not exist', () => {
      fs.removeSync(`${key}-non_existing_key`)
      const newObjects = new ObjectInTest().setKey(`${key}-non_existing_key`).retrieveOrNew()
      expect(newObjects.prop1).toBe('')
      expect(newObjects.prop2).toBe(2)
      expect(newObjects.prop3).toBe('three')
      newObjects.incProp2() // test if object contains methods that correspond to type object type
      expect(newObjects.prop2).toBe(3)
    })
  })
})
