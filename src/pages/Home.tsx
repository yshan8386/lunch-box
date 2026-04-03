import React, {useState, useRef} from 'react';
import '../Random.css';

//입력창 컴포넌트
function MenuForm({onAddMenu}: {onAddMenu: (menu:string) => void}){
  const [menu, setMenu] = useState(''); //메뉴 입력창
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(menu.trim() === ''){
      alert('텍스트를 입력해주세요.');
      return;
    }
    onAddMenu(menu);
    setMenu('');
    inputRef.current?.focus(); //submit 동작 후 input에 자동 포커스
  }

  return(
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='메뉴를 입력하세요.'/>
        <button>입력</button>
      </form>
    </>
  )
}

function Home(){
  // const [menuList, setmenuList] = useState<string[]>([]);
  const [menuList, setmenuList] = useState(['짜장면', '된장찌개']);
  
  const handleAddMenu = (menu:string) => {
    setmenuList([...menuList, menu]);
  }
  const handleDeleteMenu = () => {
    
  }
  
  return(
    <>
      <h3>메뉴입력</h3>
      <MenuForm onAddMenu={handleAddMenu}/>
      <ul>
        {menuList.map((menu, index) => {
          return(
            <li key={index}>
              {menu}
              <button onClick={handleDeleteMenu}>삭제</button>
            </li>
          )
        })}
        </ul>
    </>
  )
}
export default Home;