import VideoData from '../../data/VideoData'

export default function FilterVideos(q, list) {
  let filteredList = []
  let searchTerm = q.toLowerCase()

  for (let i = 0; i < list.length; i++) {
    if (
      list[i].title.toLowerCase().includes(searchTerm) ||
      list[i].id.includes(searchTerm) ||
      list[i].description.toLowerCase().includes(searchTerm) ||
      list[i].keywords.toLowerCase().includes(searchTerm)
    ) {
      filteredList.push(list[i])
    } else if (list[i].pz_code) {
      if (list[i].pz_code.toLowerCase().includes(searchTerm)) {
        filteredList.push(list[i])
      }
    }
  }

  if (searchTerm.includes('full')) {
    filteredList = VideoData.sort((a, b) => {
      if (a.pz_code > b.pz_code) {
        return 1
      }
      if (a.pz_code < b.pz_code) {
        return -1
      }
      return 0
    })
  }

  return filteredList
}
