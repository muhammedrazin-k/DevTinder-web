import {BrowserRouter, Routes ,Route} from "react-router-dom"
import Body from "./body"
import Login from "./Login"

function App() {

  return (
    <>

    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
        <Route path="/login" element={<Login/>}></Route>

      </Route>
    </Routes>
    </BrowserRouter>

  
      
    </>
  )
}

export default App
