# obj2fs-hoc
Higher-Order Component that adds ability for object to be stored on FileSytem by key as a JSON file, and late retrieved as Object of correct type.

## Usage

In the class that you want to enhance with this HOC
```js
import Obj2fsHOC from 'obj2fs-hoc'

```
Then declare your class and at the end ```export``` as Higher-Order Component
```js
class Account {
  // have to make publicKey optional for json2Obj HOC to work
  // (object must support a constructor with no parameters)
  constructor({ publicKey } = { publicKey: '' }) {
    this.publicKey = publicKey
    this.balance = 0
    this.stake = 0
  }

  // this method defines behavior of Account data type,
  // which will be preserved after you deserialize the object from JSON
  addBalance({ amount }) {
    this.balance += amount
  }
}

export default Obj2fsHOC(Account) // enhancing Account
```
Wrapping ```Account``` with ```Obj2fsHOC``` adds 3 methods to ```Account``` type.

```store(key)``` which saves `this` object as JSON string to disk with name `key`. It will create the file if it does not exist.

and

```retrieve(key)``` which loads object instance of correct type from disk. If the file is not found it will throw exception.
```js
throw new Error('No such key or file name found on disk')
```

and

```retrieveOrNew(key)``` which loads object instance of correct type from disk. If the file is not found it will create a new file contents of an object initialized with default constructor and then return it. This method should never fail.

Here are examples how to use the ```Account``` object:

```js
import Account from './account'

let account = new Account({ publicKey: 'some public key' }) // constructor with required parameter
const amount = 100
account.addBalance({ amount })

const key = 'myAccount.json'

const jsonAccount = account.store(key)
// jsonAccount will be saved to disk as JSON string

// now let's re-created another instance of the Account object from file on disk
const generatedAccount = new Account().retrieve(key)
// can still call the addBalance method, because the object is of the right type
generatedAccount.addBalance({ amount })

console.log(generatedAccount.balance) // ----> 200
```

## Future
Currently only synch version is supported. There are plans to include asynch methods at some point.
