import ObjectInTest from './object-in-test'
const path = require('path')
const fs = require('fs-extra')

describe('ObjectInTest', () => {
  const key = './.test/obj.json'
  let objectInTest
  beforeEach(() => {
    objectInTest = new ObjectInTest()
  })

  describe('objectInTest.store()', () => {
    beforeEach(() => {
      fs.removeSync(path.resolve(key))
    })

    it('should generate file with `key`', () => {
      expect(fs.existsSync(key)).toBe(false)
      const jsonObjectInTest = objectInTest.store(key)
      expect(fs.existsSync(key)).toBe(true)
    })
  })

  describe('objectInTest.retrieve()', () => {
    beforeEach(() => {
      objectInTest.incProp2()
      objectInTest.store(key)
    })

    it('should retrieve file named `key`', () => {
      const retrievedObject = new ObjectInTest().retrieve(key)
      expect(retrievedObject.constructor.name).toBe("ObjectInTest")
      expect(retrievedObject.prop1).toBe('')
      expect(retrievedObject.prop2).toBe(3) // this value is different from default and should be retrieved from file
      expect(retrievedObject.prop3).toBe('three')
      retrievedObject.incProp2() // test if object contains methods that correspond to type object type
      expect(retrievedObject.prop2).toBe(4)
    })
    it('should fail to retrieve file  that does not exist', () => {
      fs.removeSync(`${key}-non_existing_key`)
      expect(() => {
        new ObjectInTest().retrieve('non_existing_key')
      }).toThrowError('No such key or file name found on disk')
    })
  })

  describe('ObjectInTest.retrieveOrNew()', () => {
    beforeEach(() => {
      objectInTest.store(key)
    })
    it('should retrieve file named `key`', () => {
      const retrievedObject = new ObjectInTest().retrieveOrNew(key)
      expect(retrievedObject.constructor.name).toBe("ObjectInTest")
      expect(retrievedObject.prop1).toBe('')
      expect(retrievedObject.prop2).toBe(2)
      expect(retrievedObject.prop3).toBe('three')
      retrievedObject.incProp2() // test if object contains methods that correspond to type object type
      expect(retrievedObject.prop2).toBe(3)
    })
    it('should create new instance when file does not exist', () => {
      fs.removeSync(`${key}-non_existing_key`)
      const newObjects = new ObjectInTest().retrieveOrNew(`${key}-non_existing_key`)
      expect(newObjects.prop1).toBe('')
      expect(newObjects.prop2).toBe(2)
      expect(newObjects.prop3).toBe('three')
      newObjects.incProp2() // test if object contains methods that correspond to type object type
      expect(newObjects.prop2).toBe(3)
    })
  })
})
