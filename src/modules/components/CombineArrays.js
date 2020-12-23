import Clips from '../../data/Clips'
import VideoData from '../../data/VideoData'

const CombineArrays = () => {
  // change length format of Clips
  const splitTimeClips = Clips.map((item) => {
    if (item.length.includes(':')) {
      let a = item.length.split(':')
      let h = Number(a[0]) * 60
      let m = Number(a[1])
      let s = Number(a[2] / 60)
      let totalM = (h + m + s).toFixed(0)
      item.length = totalM
    }
    item.length === '0.0' && console.log(item.id)
    return item
  })

  // remove full-length vids from Clips
  for (let i = 0; i < VideoData.length; i++) {
    for (let j = 0; j < splitTimeClips.length; j++) {
      if (VideoData[i].id === splitTimeClips[j].id) {
        splitTimeClips.splice(j, 1)
      }
    }
  }

  //combine arrays & sort alphabetically
  const list = [...splitTimeClips, ...VideoData]
  let sortResult = list.sort((a, b) => {
    if (a.title > b.title) {
      return 1
    }
    if (a.title < b.title) {
      return -1
    }
    return 0
  })
  return sortResult
}

export default CombineArrays
