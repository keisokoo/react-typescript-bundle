import React from 'react'
import Pie from './Pie'
import { color } from './themes'
import styles from './styles/export.module.scss'
import { ReactComponent as Info } from './assets/svg/Info.svg'

const App = () => {
  React.useEffect(() => {
    console.log(color['accent-dark'])
    console.log(JSON.parse(styles.json.replace(/'/g, '')))
  }, [])
  return (
    <div id="app">
      <Info />
      <Pie />
      <div className="success-default">success</div>
      <div className="success-dark">success-dark</div>
    </div>
  )
}

export default App
