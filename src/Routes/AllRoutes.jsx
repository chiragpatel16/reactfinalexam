import {Routes,Route} from "react-router-dom"
import Home from "../Pages/Home/Home"

export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}
