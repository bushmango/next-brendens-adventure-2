import React from 'react'

export const LinkButton = (props: {
  onClick: () => void
  children: React.ReactNode
}) => {
  return (
    <a style={{ color: 'blue', cursor: 'pointer' }} onClick={props.onClick}>
      {props.children}
    </a>
  )
}
