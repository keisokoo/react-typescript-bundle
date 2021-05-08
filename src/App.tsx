import React from 'react'
const App = () => {
  React.useEffect(() => {}, [])
  const [test, setTest] = React.useState('hah')
  return (
    <div id="main">
      <header>Hello World</header>
    </div>
  )
}

export default App
