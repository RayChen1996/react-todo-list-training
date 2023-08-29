import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
const LoginView = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [username, setUsername] = useState('ray.10315332@gmail.com');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const ClickLoginEvt = async() =>{
 
        
        const result = await axios.post('/api/users/sign_in', {
            "email": username,
            "password": password
          
        });
   
        setIsSuccess(result.data.status)
        document.cookie = `token=${result.data.token};exp=${result.data.exp}`;
        axios.defaults.headers.common['Authorization'] = result.data.token;
        if(isSuccess){
            localStorage.setItem("token",JSON.stringify(result.data))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '登入成功！',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(()=>{
                navigate('/todo');
            },500)
        }
    }
    const GotoReg = ()=>{
        navigate('/register');
    }
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return(
      <div className="container ">
       <div className='row d-flex justify-content-center  '>
       <div className='col-6  '>
        <form>
        <div className="mb-3">
        <label htmlFor="account" className="form-label">Email</label>
        <input type="text" className="form-control" id="account" placeholder="輸入帳號" value={username}
        onChange={handleUsernameChange} />
        </div>
        <div className="mb-3">
        <label htmlFor="pwd" className="form-label">密碼</label>
        <input type="password" className="form-control" id="pwd" placeholder="輸入密碼"  value={password}
        onChange={handlePasswordChange} />
        </div>  
        <div className="mb-3 d-flex justify-content-around">
        <button type="submit" className="btn btn-primary" onClick={ClickLoginEvt}  >登入</button>
        <button type="submit" className="btn btn-outline-primary" onClick={GotoReg}  >註冊</button>
        </div>

        </form>
        
       </div>
       </div>

      </div>
    )
}

export default LoginView;
