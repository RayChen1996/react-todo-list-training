import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

const RegisterView =  () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickName, setNickName] = useState('');
    const navigate = useNavigate();

    const GotoLogin = () => {
        navigate('/login');
    }
    const ClickRegEvt = async() =>{
      

        try{
            const result = await axios.post('/api/users/sign_up', {
                "email":username,
                "password": password,
                "nickname": nickName
            });
       

            setIsSuccess(result.data.status)
            if(result.data.status){ 
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: '成功註冊！',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        title: 'custom-red-title' // 自定義 CSS 類名
                      }
                  })
                setTimeout(()=>{
                    navigate('/Login');
                },500)
            }
        }catch(error){
            if(error.response.data.message=="用戶已存在"){

                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: '用戶已存在',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        title: 'custom-red-title' // 自定義 CSS 類名
                      }
                  })
            }
        }


       
                    
    }
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleNicknameChange = (event) => {
        setNickName(event.target.value);
    };

    const handleConfirmPasswordChange = (event) =>{
        setConfirmPassword(event.target.value);
    }
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return(
        <div className="conatiner">
            <div className='row  '>
                    <div className='col-3'>
                        <div className="side">
                            <a href="#"><img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt="" /></a>
                            <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg"/>
                        </div>
                    </div>
 
                    <div className='col-8 pl-2'>
                        <form className="formControls" >
                            <h2 className="formControls_txt">註冊帳號</h2>
                            <div className="mb-3">
                            <label htmlFor="account" className="form-label">Email</label>
                            <input type="text" className="form-control" id="account" placeholder="輸入帳號" value={username}
                            onChange={handleUsernameChange} />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="nickname" className="form-label">您的暱稱</label>
                            <input type="text" className="form-control" id="nickname" placeholder="輸入您的暱稱" value={nickName}
                            onChange={handleNicknameChange} />
                            </div>


                            <div className="mb-3">
                            <label htmlFor="pwd" className="form-label">密碼</label>
                            <input type="password" className="form-control" id="pwd" placeholder="輸入密碼"  value={password}
                            onChange={handlePasswordChange} />
                            </div>  

                            <div className="mb-3">
                            <label htmlFor="confirmpwd" className="form-label">再次輸入密碼</label>
                            <input type="password" className="form-control" id="confirmpwd" placeholder="再次輸入密碼"  value={confirmPassword}
                            onChange={handleConfirmPasswordChange} />
                            </div>  

                            <div className='d-flex justify-content-center gap-2'>
                            <button type="submit" className="btn btn-primary" onClick={ClickRegEvt}  >註冊</button>

                            <button type="submit" className="btn btn-outline-primary" onClick={GotoLogin}  >登入</button>

                            </div>

                            
                        </form>
        
                    </div>
            </div>

        </div>

    )
  }
  
  export default RegisterView;
  