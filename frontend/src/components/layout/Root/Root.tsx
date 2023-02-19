import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../ui'

type Props = {}

const Root = (props: Props) => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Root