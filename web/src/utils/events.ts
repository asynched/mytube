interface ImplPreventDefault {
  preventDefault(): void
}

interface ImplStopPropagation {
  stopPropagation(): void
}

export const preventDefault = (fn: (event: ImplPreventDefault) => void) => {
  return (event: ImplPreventDefault) => {
    event.preventDefault()
    fn(event)
  }
}

export const stopPropagation = (fn: (event: ImplStopPropagation) => void) => {
  return (event: ImplStopPropagation) => {
    event.stopPropagation()
    fn(event)
  }
}
