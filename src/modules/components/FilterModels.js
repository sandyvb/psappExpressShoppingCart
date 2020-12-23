export default function FilterModels(q, list) {
  let filteredList = []
  let searchTerm = q.toLowerCase()

  for (let i = 0; i < list.length; i++) {
    if (
      list[i].model_name.toLowerCase().includes(searchTerm) ||
      list[i].keywords.toLowerCase().includes(searchTerm)
    ) {
      filteredList.push(list[i])
    }
  }

  return filteredList
}
