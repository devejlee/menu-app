import { Route, Routes } from 'react-router-dom'
import StepOne from './components/StepOne/StepOne'
import StepThree from './components/StepThree/StepThree'
import StepTwo from './components/StepTwo/StepTwo'
import StepFour from './components/StepFour/StepFour'
import Navigation from './components/Navigation/Navigation'
import NotFound from './components/NotFound/NotFound'

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<StepOne />} />
        <Route path='/step-two' element={<StepTwo />} />
        <Route path='/step-three' element={<StepThree />} />
        <Route path='/step-four' element={<StepFour />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
