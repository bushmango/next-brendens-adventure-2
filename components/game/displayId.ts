import _ from 'lodash'

export function displayId(id: string) {
  let newId = id.replace(/\-/g, ' ')

  // Capitalize most words
  // newId = _.startCase(newId)
  // newId = newId.replace(/\sThe\s/g, ' the ')

  // Capitalize the first letter
  newId = newId[0].toUpperCase() + newId.substring(1)

  return newId
}
