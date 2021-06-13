import React from 'react'
import Pie from './Pie'
import { color } from './themes'
import styles from './styles/export.module.scss'

const App = () => {
  React.useEffect(() => {
    console.log(color['accent-dark'])
    console.log(JSON.parse(styles.json.replace(/'/g, '')))
  }, [])
  return (
    <div id="app">
      <Pie />
      <div className="success">s!uccess</div>
      <div className="success-dark">success-dark</div>
    </div>
  )
}

export default App
