import React from 'react'
import '../../css/detail.css'
import VideoDetail from '../detail/VideoDetail'
import CombineArrays from '../components/CombineArrays'
import ModelDetail from '../detail/ModelDetail'
import ModelData from '../../data/ModelData'
import RandomGif from '../components/RandomGif'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import VideoData from '../../data/VideoData'

export default function Detail() {
  const pathname = window.location.pathname
  var subString = pathname.substring(1)
  const isString = isNaN(subString) //string=true number=false
  var isModel = null
  let title
  let item
  let prev
  let next

  function chooseTag() {
    // if subString is a string
    if (isString) {
      let formatSubString = subString.replace(/%20/g, '').toLowerCase()

      switch (formatSubString) {
        case 'lexis':
          formatSubString = 'lexislane'
          break
        case 'delila':
          formatSubString = 'deliladarling'
          break
        case 'bianca':
          formatSubString = 'biancapureheart'
          break
        case 'martina':
          formatSubString = 'martinawarren'
          break
        case 'aubrytatum':
          formatSubString = 'aubry&tatum'
          break
        case 'aubry':
          formatSubString = 'aubry&tatum'
          break
        case 'tatum':
          formatSubString = 'aubry&tatum'
          break
        case 'julie':
          formatSubString = 'juliesimone'

          break
        case 'natalie':
          formatSubString = 'natalierose'
          break
        default:
          break
      }
      // find model
      isModel = ModelData.find(
        (item) =>
          item.model_name.replace(/\s/g, '').toLowerCase() === formatSubString
      )
      // if model is found, return getModel()
      if (isModel) {
        return getModel()
      } else {
        // if model doesn't exist check to see if string is a pz_code
        const pzCode = VideoData.find(
          (item) => item.pz_code.toLowerCase() === formatSubString
        )
        // if pz_code exists, change subString to the video's id and return getVideo()
        if (pzCode) {
          subString = pzCode.id
          return getVideo()
        } else {
          // if not a model or pz_code, the string is not valid so return oops()
          return oops()
        }
      }
    } else {
      // if subString is a number, return getVideo()
      return getVideo()
    }
  }

  function getModel() {
    item = isModel
    title = isModel.model_name

    // if model is found, get next and prev values
    const length = ModelData.length - 1
    for (let i = 0; i < length + 1; i++) {
      if (ModelData[i].model_name === title) {
        if (i === 0) {
          prev = ModelData[length].model_name
          next = ModelData[i + 1].model_name
        } else if (i === length) {
          prev = ModelData[i - 1].model_name
          next = ModelData[0].model_name
        } else {
          prev = ModelData[i - 1].model_name
          next = ModelData[i + 1].model_name
        }
        break
      }
    }
    // if model is found, return model div with links to prev & next models
    return (
      <div>
        <div className="prevnext">
          <Link to={`/${prev}`} className="prevbtn">
            <button>
              <FontAwesomeIcon icon={faCaretLeft} /> {prev}
            </button>
          </Link>
          <h1 className="title">{title}</h1>
          <Link to={`/${next}`} className="next nextbtn">
            <button>
              {next} <FontAwesomeIcon icon={faCaretRight} />
            </button>
          </Link>
        </div>
        <div className="data">
          <ModelDetail key={item} model={item} />
        </div>
      </div>
    )
  }

  function getVideo() {
    // subString is a number (or changed to a number)
    let previd
    let nextid
    // combine powershotz and c4s json data and sort
    let combine = CombineArrays()
    let finalArray = combine.sort((a, b) => {
      if (a.title > b.title) {
        return 1
      }
      if (a.title < b.title) {
        return -1
      }
      return 0
    })
    // find the video based on subString variable
    const length2 = finalArray.length - 1
    const numberData = finalArray.find((item) => item.id === subString)
    // if video exists, get item and title values
    if (numberData) {
      item = numberData
      title = numberData.title

      // if video exists, get next and prev values
      for (let i = 0; i < length2 + 1; i++) {
        if (finalArray[i].title === title) {
          if (i === 0) {
            prev = finalArray[length2].title
            previd = finalArray[length2].id
            next = finalArray[i + 1].title
            nextid = finalArray[i + 1].id
          } else if (i === length2) {
            prev = finalArray[i - 1].title
            previd = finalArray[i - 1].id
            next = finalArray[0].title
            nextid = finalArray[0].id
          } else {
            prev = finalArray[i - 1].title
            previd = finalArray[i - 1].id
            next = finalArray[i + 1].title
            nextid = finalArray[i + 1].id
          }
          break
        }
      }
      // if video is found, return next and prev links and video details
      return (
        <div>
          <div className="prevnext">
            <Link to={`/${previd}`} className="prevbtn">
              <button
                style={{
                  maxWidth: '180px',
                  padding: '15px 10px',
                }}
              >
                <FontAwesomeIcon icon={faCaretLeft} /> {prev}
              </button>
            </Link>
            <h1 className="title">{title}</h1>
            <Link to={`/${nextid}`} className="nextbtn">
              <button
                style={{ maxWidth: '180px', padding: '15px 10px' }}
                className="next"
              >
                {next} <FontAwesomeIcon icon={faCaretRight} />
              </button>
            </Link>
          </div>

          <div className="data">
            <VideoDetail key={item} video={item} />
          </div>
        </div>
      )
    } else {
      return oops()
    }
  }

  function oops() {
    return (
      <div className="oops">
        <h1>Oops! Page Not Found!</h1>
        <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>
          The preview is coming, or
        </p>
        <p style={{ textAlign: 'center' }}>
          Try removing ".html" from the address bar, or...
        </p>
        <Link to="/home" className="homebtn">
          <div className="homebtndiv">Click to Powershotz Home Page</div>
        </Link>
        <RandomGif />
      </div>
    )
  }

  return <div className="detail">{chooseTag()}</div>
}
