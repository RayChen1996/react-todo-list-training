import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '../config.js'; 
const TodoView = () => {
    // const [isSuccess, setIsSuccess] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [TodoList, setTodoList] = useState([]);
    const [selectedOption, setSelectedOption] = useState('btnradio1');// 預設為全部

    const [TodoText, setTodoText] = useState('');
    const navigate = useNavigate();
    const [editingId, setEditingId] = useState(null);
    const [editedContent, setEditedContent] = useState('');
  

    useEffect(() => {
      // 在組件載入後執行
      FetchTodo();
    }, []); // 空依賴數組表示只在組件載入時執行一次

    const handleEditClick = (id, content) => {
      setEditingId(id);
      setEditedContent(content);
    };
  
    const handleSaveClick = async (id) => {
      try {
        let token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common['Authorization'] = token.token;
        
        // 執行 PATCH 請求，將編輯後的內容提交到後端
        const result = await axios.put(`${API_BASE_URL}todos/${id}`, {
          content: editedContent
        });
 
        // 完成編輯後，清空編輯狀態
        setEditingId(null);
        setEditedContent('');
        FetchTodo()
      } catch (err) {
        console.error("Error editing todo:", err);
      }
    };

    const handleInputChange = (event) => {
      setTodoText(event.target.value); // 更新状态
    };

    const handleAddClick = async() =>{
        try{
            let token = JSON.parse(localStorage.getItem("token")) 
     
            axios.defaults.headers.common['Authorization'] = token.token;
  
            const result = await axios.post(API_BASE_URL+'todos', {
              "content": `${TodoText}`
            });
            
        
           
         
            setTodoText("")
            FetchTodo();
          
        }catch(err){
          console.error("Error fetching todo list:", err);
        }
    }

    const handleCheckboxChange = async (id, status) => {
      try {
        let token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common['Authorization'] = token.token;
        
        // 執行 PATCH 請求，將狀態更新提交到後端
        const result = await axios.patch(API_BASE_URL+`todos/${id}/toggle`, {
          status: !status
        });
 
        FetchTodo()
        // 可以根據需要進行後續處理
      } catch (err) {
        console.error("Error updating status:", err);
      }
    };


    const fillterDoneItem = () =>{
      
      Swal.fire({
        title: '刪除確認',
        text: "您確定刪除嗎?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: '取消',
        confirmButtonText: '確認'
      }).then(async (result) => {
        if (result.isConfirmed) {
          let fillterItems = TodoList.filter((item,idx)=>{
            return item.status == true
           }) 
      

           fillterItems.forEach(async(item,idx)=>{
            const result2 = await axios.delete(API_BASE_URL+'todos/'+item.id, {
      
            });
            if(result2.data.status){
              FetchTodo()
            }
         
           })
            
    
        }
      })


  
    }
    const GetTodoNotYetDoneCount = () => {
      
      let Count = 0
      TodoList.forEach((item,idx)=>{
 
        if(!item.status){
          Count++
        }
      }) 
      return Count
    }

    const handleDeleteRowsClick = async(id) =>{

      Swal.fire({
        title: '刪除確認',
        text: "您確定刪除嗎?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: '取消',
        confirmButtonText: '確認'
      }).then(async (result) => {
        if (result.isConfirmed) {
           try{
            let token = JSON.parse(localStorage.getItem("token")) 
  
            axios.defaults.headers.common['Authorization'] = token.token;
            const result2 = await axios.delete(API_BASE_URL+'todos/'+id, {
      
            });
       
            if(result2.data.status){
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '刪除成功！',
                showConfirmButton: false,
                timer: 1500
              })
              FetchTodo();
            }
            
        }catch(err){
          console.error("Error fetching todo list:", err);
        }
        }
      })
   
  }

    const handleEnterPress = async(event) => {
      if (event.key === 'Enter' && TodoText.trim() !== '') {
         
          try{
              let token = JSON.parse(localStorage.getItem("token")) 
           
              axios.defaults.headers.common['Authorization'] = token.token;
              const result = await axios.post(`${API_BASE_URL}todos`, {
                "content": `${TodoText}`
              });
              
           
              if(result.data.status){
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: '新增成功！',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
              setTodoText("")
    
              FetchTodo();
          }catch(err){
            console.error("Error fetching todo list:", err);
          }

      }
    };
    

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.id);
    };
    const filteredTodos = TodoList.filter(item => {
      if (selectedOption === 'btnradio2') {
        return item.status === true; // 已完成
      } else if (selectedOption === 'btnradio3') {
        return item.status === false; // 未完成
      }
      return true; // 全部
    });

    const FetchTodo = async() => {
      try{
          let token = JSON.parse(localStorage.getItem("token")) 
      
          axios.defaults.headers.common['Authorization'] = token.token;
          const result = await axios.get(`${API_BASE_URL}todos`, {
          
          });
          
          
          setTodoList(result.data.data)
          
      }catch(err){
        console.error("Error fetching todo list:", err);
      }
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return(
      <div className="container">
        <div className='row d-flex justify-content-center  '>
          <div className='col-6  '>
              {/* button Group切換 */}
              <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                  <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="btnradio1"
                      autoComplete="off"
                      checked={selectedOption === 'btnradio1'}
                      onChange={handleRadioChange}
                  />
                  <label className="btn btn-outline-primary" htmlFor="btnradio1">
                      全部
                  </label>

                  <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="btnradio2"
                      autoComplete="off"
                      checked={selectedOption === 'btnradio2'}
                      onChange={handleRadioChange}
                  />
                  <label className="btn btn-outline-primary" htmlFor="btnradio2">
                      已完成
                  </label>

                  <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="btnradio3"
                      autoComplete="off"
                      checked={selectedOption === 'btnradio3'}
                      onChange={handleRadioChange}
                  />
                  <label className="btn btn-outline-primary" htmlFor="btnradio3">
                      未完成
                  </label>
              </div>


              {/* table  切換 */}
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">狀態</th>
                    <th scope="col">事項</th>
                    <th scope="col">編輯</th>
                    <th scope="col">刪除</th>
                  </tr>
                </thead>
                <tbody>
       

                {filteredTodos.length === 0 ? (
                  <tr>
                    <td colSpan="4">目前尚無待辦事項</td>
                  </tr>
                ) : (
                  filteredTodos.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                      <input
                        type="checkbox"
                        checked={item.status}
                        onChange={() => handleCheckboxChange(item.id, item.status)}
                      />
                                
                      </td>
                      <td>
                      
                        {editingId === item.id ? (
                          <input
                            type="text"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                          />
                        ) : (
                          item.content
                        )}          
                      </td>
                      <td>
                        {editingId === item.id ? (
                          <button className="btn btn-success" onClick={() => handleSaveClick(item.id)}>儲存</button>
                        ) : (
                          <button className="btn btn-primary" onClick={() => handleEditClick(item.id, item.content)}>編輯</button>
                        )}          
                        
                      
                      </td>
                      <td>
                        <a className="btn btn-danger" onClick={() => handleDeleteRowsClick(item.id)}>刪除</a>
                      </td>
                    </tr>
                  ))
                )}


                </tbody>
              </table>

              <div className='d-flex justify-content-between '>
              <span>{GetTodoNotYetDoneCount()}個待完成項目</span>
              <span>
              <button className="btn btn-outline-secondary" type="button"   onClick={fillterDoneItem}  id="button-addon2">清除已完成項目</button>
              </span>
              </div>

              {/* 輸入區  */}
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="請輸入待辦事項"    value={TodoText}
                onChange={handleInputChange}   onKeyDown={handleEnterPress} aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <button className="btn btn-outline-secondary" type="button"   onClick={handleAddClick}  id="button-addon2">新增</button>
              </div>
          </div>
        </div>
      </div>
    )


  }
  
export default TodoView;
  