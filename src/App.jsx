
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link, useNavigate } from 'react-router-dom';
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Todolist from './pages/TodoList'
import {HashRouter,Route,Routes} from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';

function NavBar() {
  let user = JSON.parse(localStorage.getItem("token")) 
  const navigate = useNavigate();
  const Logout = async() => {



    try {
      let token = JSON.parse(localStorage.getItem("token"));
      axios.defaults.headers.common['Authorization'] = token.token;
       
      const result = await axios.post(`/api/users/sign_out`, {
      });
            Swal.fire({
                icon: 'success',
                title: `登出成功`,
                text: `${result?.data?.message}`,
                showConfirmButton: true,
                confirmButtonColor: '#6c5ce7',
                confirmButtonText: '確認',
            }).then((result) => {
                 
           
                  setTimeout(()=>{
                    navigate('/login');
                  },500)


            });

    } catch (err) {


      setTimeout(()=>{
        navigate('/login');
      },500)
      console.error("Error sign out :", err);
    }

  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">TodoList</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          
 
        </ul>
        <span className="navbar-text  ">
          <span>{user?.nickname} 的待辦</span>
          <a className="btn btn-primary text-white" onClick={Logout}>登出</a>
        </span>
      </div>
    </div>
  </nav>
  );
}


function App() {
  return (
    <HashRouter>
    <div className="container">
      <NavBar />
      <Routes>
        <Route path="/" element={<Todolist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<Todolist />} />
      </Routes>
    </div>
  </HashRouter>
  )
}

export default App
