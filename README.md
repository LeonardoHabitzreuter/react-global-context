# react-global-context
Global context for React applications

## How to use

### Create your initial state and the lenses
```
// state.js
import { lensProp, lensPath } from 'react-global-context'

const CUSTOMER = 'customer'

export const initialState = {
  [CUSTOMER]: {
    id: '1',
    name: 'jhon',
    car: {
      year: '2019',
      plate: 'abc123',
      model: 'Lancer Evolution'
    }
  }
}

export const customerLens = lensProp(CUSTOMER)
export const customerCarLens = lensPath([CUSTOMER, 'car'])
```

### Render you app
```
import React from 'react'
import { render } from 'react-dom'
import AppContextProvider from 'react-global-context'
import { initialState } from './state'
import Page from './page'

const App = () => (
  <AppContextProvider initialState={initialState}>
    <Page />
  </AppContextProvider>
)

render(<App />, document.getElementById('app'))
```

### Now you can access the state using the lenses!
```
import { useAppContext } from 'react-global-context'
import { customerLens, customerCarLens } from './state'

const Page = () => {
  const [wholeState, setWholeState] = useAppContext()
  const [customerState, setCustomerState] = useAppContext(customerLens)
  const [customerCarState, setCustomerCarState] = useAppContext(customerCarLens)
}

export default Page
```

### With lenses you can choose the scope to be modified
```
const [customerCarState, setCustomerCarState] = useAppContext(customerCarLens)

setCustomerCarState({ plate: 'yxz789' })
```
***will change the customer car to:
```
car: {
  year: '2019',
  plate: 'yxz789,
  model: 'Lancer Evolution'
}
```
