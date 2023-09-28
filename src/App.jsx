import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/UI/NavBar'
import { RenderRoutes } from './components/UI/RenderNavigation'
import { UserContext } from './components/Context/UserContext'
import { FilterContext } from './components/Context/FilterContext'




function App() {


  return (
    <UserContext>
      <FilterContext>
        <BrowserRouter>
          <NavBar />
          <RenderRoutes />
        </BrowserRouter>
      </FilterContext>
    </UserContext>



  )
}

export default App
