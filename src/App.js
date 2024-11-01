import React from 'react'
import LandingScreen from './Screen/LandingScreen'
import UserScreen from './Screen/UserScreen'
import CopyLandingScreen from './Screen/CopyLandingScreen'
import TryOutModal from './Screen/TryOutModal'
import { GlobalProvider } from './GlobalProvider'

const App = () => {
  return (
    <GlobalProvider>
    <div>
      <LandingScreen/>
      {/* <UserScreen/> */}
      {/* <CopyLandingScreen/> */}
      {/* <TryOutModal/> */}
    </div>
    </GlobalProvider>
  )
}

export default App
