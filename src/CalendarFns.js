import React from 'react'
import { getYear, getMonth, addDays, startOfWeek } from 'date-fns'

const caleandar = (dateValue) => {
  const year = getYear(dateValue)
  const month = getMonth(dateValue)
  const weekStartsOn = 0
  const matrix = []
  const date = new Date(year, month)
  let curDate = startOfWeek(date, { weekStartsOn })

  ;[...Array(6).keys()].forEach((row) => {
    const week = []
    ;[...Array(7).keys()].forEach((col) => {
      week.push(curDate)
      curDate = addDays(curDate, 1)
    })
    matrix.push(week)
  })

  return matrix
}
console.log('cc', caleandar(new Date()))
const CalendarFns = () => {
  return <></>
}
export default CalendarFns
