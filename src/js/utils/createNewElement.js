export const createNewElement = (tag, classes) => {
  const elem = document.createElement(tag)
  if (typeof classes === 'object') {
    elem.classList.add(...classes)
  } else {
    elem.classList.add(classes)
  }

  return elem
}
