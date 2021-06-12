import React from 'react'
import Pie from './Pie'

const App = () => {
  React.useEffect(() => {}, [])
  return (
    <div id="app">
      <Pie />
      <div className="success">s!uccess</div>
      <div className="success-dark">success-dark</div>
    </div>
  )
}

export default App
