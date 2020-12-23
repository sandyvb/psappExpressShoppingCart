import React from 'react'

export default function Popup(props) {
  const url = props.url
  const msg = props.msg
  const width = 690
  const height = 700
  const left = (window.screen.width - width) / 2
  const top = (window.screen.height - height) / 2
  let params =
    'width=' +
    width +
    ', height=' +
    height +
    ', top=' +
    top +
    ', left=' +
    left +
    ', directories=no, location=no, menubar=yes, resizable=yes, scrollbars=yes, status=no, toolbar=yes'
  return (
    <button
      onClick={() => {
        window.open(url, 'PZWindow', params)
      }}
    >
      {msg}
    </button>
  )
}
