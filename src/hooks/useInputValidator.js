import { useState } from 'react'
export default (initValue, validator) => {
  const [value, setValue] = useState(initValue)
  const hookChange = (event) => {
    const willUpdate = useRef(true)
    if (typeof validator === 'function') {
      willUpdate.current = validator(event.target.value)
    }
    if (willUpdate.current) {
      return setValue(event.target.value)
    }
    return [value, hookChange]
  }
}
