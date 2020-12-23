import React from 'react'
import ModelData from '../../data/ModelData'
import ModalImage from 'react-modal-image'
import { Link } from 'react-router-dom'

const RandomImg = () => {
  // console.log(ModelData.length)
  const num = Math.floor(Math.random() * ModelData.length)
  const num2 = Math.floor(Math.random() * 4 + 1)
  const name = ModelData[num].model_name
  const lcname = name.toLowerCase().replace(/ /g, '')
  const small =
    'https://powershotz.com/models2/thumbs/' + lcname + '-' + num2 + '.jpg'
  const large = 'https://powershotz.com/models2/' + lcname + '-' + num2 + '.jpg'

  return (
    <figure>
      <div>
        <ModalImage
          small={small}
          large={large}
          alt={name}
          hideDownload="true"
        />
      </div>
      <figcaption>
        <Link to={`/${name}`}>{name}</Link>
      </figcaption>
    </figure>
  )
}

export default RandomImg
