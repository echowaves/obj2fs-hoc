const path = require('path')
const fs = require('fs-extra')

const Obj2fsHOC = WrappedObject => class extends WrappedObject {
  // constructor() {
  //   super()
  // }

  // must call this function to attach object to store by key
  setKey(key) {
    this.key = key
    return this
  }

  /* returns JSON String representation of the object */
  stringify() {
    return JSON.stringify(this)
  }

  /* returns Object instance of a current class */
  parse(json) {
    const obj = JSON.parse(json)
    return Object.assign(this, obj)
  }

  /* store object in fs, key === file_name */
  async store() {
    const key = this.key
    delete this.key // key is transitent property, let's clear it before persisting to fs
    const string = this.stringify()
    await fs.outputFile(path.resolve(key), string)
    this.key = key
    return string
  }

  /* retrieve object from fs, key === file_name */
  async retrieve() {
    if (!fs.existsSync(path.resolve(this.key))) {
      throw new Error("No such key or file name found on disk")
    }
    const json = await fs.readFile(path.resolve(this.key))
    return this.parse(json)
  }

  /*  retrieve object from fs, key === file_name, or return new Object initialized with default constructor() */
  async retrieveThrough() {
    if (!fs.existsSync(path.resolve(this.key))) {
      await this.store()
    }
    const json = await fs.readFile(path.resolve(this.key))
    return this.parse(json)
  }
}

export default Obj2fsHOC
