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

  describe('objectInTest.retreive()', () => {
    beforeEach(() => {
        objectInTest.store(key)
    })

    it('should retreive file  named `key`', () => {
      const retreivedObject = ObjectInTest.retreive(key)

      expect(retreivedObject.constructor.name).toBe("ObjectInTest")
      // const jsonObjectInTest = objectInTest.store(key)
      // expect(fs.existsSync(key)).toBe(true)
    })
  })

  describe('ObjectInTest.parse()', () => {
    it('should generate an `ObjectInTest` instance from JSON', () => {
      const jsonObjectInTest = objectInTest.stringify()
      const generatedObjectInTest = ObjectInTest.parse(jsonObjectInTest)
      expect(generatedObjectInTest).toMatchObject(objectInTest)
      // check if the loaded object responds to methods calls after re-construction from JSON
      generatedObjectInTest.incProp2()
      expect(generatedObjectInTest.prop2).toEqual(3)
    })
    it('should fail to generate an `ObjectInTest` object from wrong JSON', () => {
      expect(() => {
        ObjectInTest.parse('{ some: json }')
      }).toThrowError('Unexpected token s in JSON at position 2')
    })
  })
})
