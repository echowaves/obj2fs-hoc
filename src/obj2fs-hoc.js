import Json2ObjHOC from 'json2obj-hoc'

const path = require('path')
const fs = require('fs-extra')

const Obj2fsHOC = WrappedObject => class extends Json2ObjHOC(WrappedObject) {
  /* store object in fs, key === file_name */
  store(key) {
    fs.ensureFileSync(key)
    fs.writeFileSync(path.resolve(key), this.stringify())
  }

  /* retreive object from fs, key === file_name */
  static retreive(key) {
    return obj = WrappedObject.parse(fs.readFileSync(path.resolve(key)))
  }

  /* retreive object from fs, key === file_name, or return new Object initialized with default constructor() */
  static retreiveOrNew(key) {
    let obj
    if (!fs.existsSync(key)) {
      // return new empty object
      obj = new WrappedObject()
    fs.writeFileSync(path.resolve(key), this.stringify())
    } else {
        obj = retreive(key)
    }
  }
}

export default Obj2fsHOC
