import React from 'react'
import MainTabContainer from './components/mainTabContainer'
import PostCreator from '@/components/postCreator'

const HomePage = () => {
  return (
    <div>
      <h1>home page</h1>
      <MainTabContainer/>
      <PostCreator/>
    </div>
  )
}

export default HomePage