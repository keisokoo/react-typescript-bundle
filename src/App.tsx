import React from 'react'
import Pie from './Pie'
import themes, { defaults } from './themes'

const App = () => {
  React.useEffect(() => {
    console.log('themes', themes)
    console.log('defaults', defaults)
  }, [])
  return (
    <div id="app">
      <Pie />
      <div className="success">success</div>
      <div className="success-dark">success-dark</div>
    </div>
  )
}

export default App
