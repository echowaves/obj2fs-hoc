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
  store() {
    const key = this.key
    delete this.key // key is transitent property, let's clear it before persisting to fs
    const string = this.stringify()
    fs.outputFileSync(path.resolve(key), string)
    this.key = key
    return string
  }

  /* retrieve object from fs, key === file_name */
  retrieve() {
    if (!fs.existsSync(path.resolve(this.key))) {
      throw new Error('No such key or file name found on disk')
    }
    return this.parse(fs.readFileSync(path.resolve(this.key)))
  }

  /*  retrieve object from fs, key === file_name, or return new Object initialized with default constructor() */
  retrieveOrNew() {
    if (!fs.existsSync(path.resolve(this.key))) {
      this.store()
    }
    return this.parse(fs.readFileSync(path.resolve(this.key)))
  }
}

export default Obj2fsHOC
