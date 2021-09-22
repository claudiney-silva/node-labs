import React, { Fragment } from 'react'

import './index.css'

interface Props {
  loading: boolean
}

export const Loading: React.FC<Props> = ({ loading }: Props) => {
  return <Fragment>{loading && <div className="loading-spinner" />}</Fragment>
}
