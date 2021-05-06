import { CLIPS } from '../../data/Clips'
// import VideoData from '../../data/VideoData'

const CombineArrays = () => {
  // change length format of Clips
  const splitTimeClips = CLIPS.map((item) => {
    if (item.length.includes(':')) {
      let a = item.length.split(':')
      let h = Number(a[0]) * 60
      let m = Number(a[1])
      let s = Number(a[2] / 60)
      let totalM = (h + m + s).toFixed(0)
      item.length = totalM
    }
    return item
  })

  //combine arrays & sort alphabetically
  // const list = [...splitTimeClips, ...VideoData]
  let sortResult = splitTimeClips.sort((a, b) => {
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
