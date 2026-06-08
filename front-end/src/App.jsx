import {Routes, Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import { LoginScreen } from './screens/LoginScreen'
import RegisterUser from './screens/RegisterUser'
import UpdateTodo from './screens/UpdateTodo'
import { ToastContainer} from 'react-toastify';

function App() {



  return (
    <>
<ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      <Routes>
<Route path='/' element={<HomeScreen />} />
<Route path='/Login' element={<LoginScreen />} />
<Route path='/register' element={<RegisterUser />} />
<Route path='/edit/:id' element={<UpdateTodo />} />





      </Routes>
    </>
  )
}

export default App
