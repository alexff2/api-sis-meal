type Props = {
  month: number
  year: number
}

export type Output = {
  startDate: Date
  endDate: Date
}

export function getStartEndOfMonth({ month, year }: Props): Output {
  const startDate = new Date(
    `${year}-${month.toString().length > 1 ? month : '0' + month}-02`,
  )
  startDate.setHours(0)

  const endDate = new Date(
    `${year}-${month.toString().length > 1 ? month : '0' + (month + 1)}-02`,
  )
  endDate.setHours(23)
  endDate.setMinutes(59)
  endDate.setSeconds(59)

  return {
    startDate,
    endDate,
  }
}
