import React from 'react'
import Pie from './Pie'
import vars from './styles/export.scss'

console.log('vars', vars)
const App = () => {
  React.useEffect(() => {}, [])
  return (
    <div id="app">
      <Pie />
      <div className="success">success</div>
      <div className="success-dark">success-dark</div>
    </div>
  )
}

export default App
