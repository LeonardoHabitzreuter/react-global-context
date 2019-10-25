import React, { createContext, useContext } from 'react'
import { useSetState } from 'react-use'
import { is, view, over, mergeDeepLeft } from 'ramda'

const AppContext = createContext()

const AppContextProvider = ({ initialState, children }) => {
  const [state, dispatch] = useSetState(initialState)

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}

const typeError = new TypeError('The result of dispatch call should be an object')

export const useAppContext = (lens) => {
  const [appState, dispatch] = useContext(AppContext)

  if (!lens) return [appState, dispatch]

  return [
    view(lens, appState),
    (state) => {
      const result = is(Function, state) ? state(appState) : state

      if (!is(Object, result)) {
        throw typeError
      }

      dispatch(over(lens, mergeDeepLeft(result)))
    }
  ]
}

export { lensProp, lensPath } from 'ramda'
export default AppContextProvider
