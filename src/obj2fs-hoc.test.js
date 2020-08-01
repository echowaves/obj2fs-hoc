import ObjectInTest from './object-in-test'
const path = require('path')
const fs = require('fs-extra')

describe('ObjectInTest', () => {
  let objectInTest
  beforeEach(() => {
    objectInTest = new ObjectInTest()
  })

  describe('objectInTest.store()', () => {
    const key = './.test/obj.json'
    beforeEach(() => {
      if (fs.existsSync(key)) {
        fs.unlinkSync(path.resolve(key))
      }
    })

    it('should generate file with named `key`', () => {

      const jsonObjectInTest = objectInTest.store(key)

      // expect(typeof jsonObjectInTest).toBe('string')
      // expect('{"prop1":"","prop2":2,"prop3":"three"}')
      //   .toEqual(jsonObjectInTest)
    })
  })

  // describe('ObjectInTest.parse()', () => {
  //   it('should generate an `ObjectInTest` instance from JSON', () => {
  //     const jsonObjectInTest = objectInTest.stringify()
  //     const generatedObjectInTest = ObjectInTest.parse(jsonObjectInTest)
  //     expect(generatedObjectInTest).toMatchObject(objectInTest)
  //     // check if the loaded object responds to methods calls after re-construction from JSON
  //     generatedObjectInTest.incProp2()
  //     expect(generatedObjectInTest.prop2).toEqual(3)
  //   })
  //   it('should fail to generate an `ObjectInTest` object from wrong JSON', () => {
  //     expect(() => {
  //       ObjectInTest.parse('{ some: json }')
  //     }).toThrowError('Unexpected token s in JSON at position 2')
  //   })
  // })
})
