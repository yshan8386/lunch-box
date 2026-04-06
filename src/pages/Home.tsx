import React, {useState, useRef, useEffect} from 'react';
import '../Random.css';

//입력창 컴포넌트
function MenuForm({onAddMenu}: {onAddMenu: (menu:string) => void}){
  const [menu, setMenu] = useState(''); //메뉴 입력창
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(menu === ''){
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
        <input 
          type="text" 
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
          ref = {inputRef}
          placeholder='메뉴를 입력하세요.'
        />
        <button>입력</button>
      </form>
    </>
  )
}

function Home(){
  const [menuList, setMenuList] = useState<string[]>([]);
  const [randomMenu, setRandomMenu] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  //메뉴 추가
  const handleAddMenu = (menu:string) => {
    setMenuList([...menuList, menu]);
  }
  //메뉴 삭제
  const handleDeleteMenu = (index:number) => {
    setMenuList(menuList.filter((_, i) => i !== index));
  }
  //랜덤 버튼
  const handleRotate = () => {
    if(menuList.length > 0){
      setIsRotating(true);

      setTimeout(() => {
        setIsRotating(false);
        const randomIndex = Math.floor(Math.random() * menuList.length);
        setRandomMenu(menuList[randomIndex]);
      }, 2000);
    }
  }
  //랜덤 돌아가는 모션
  useEffect(() => {
    if(isRotating){
      const timer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * menuList.length);
        setRandomMenu(menuList[randomIndex]);
      }, 100);//랜덤 돌아가는 속도
      return () => {
        clearInterval(timer);
      }
    }
  }, [isRotating, menuList, 500]);

  return(
    <div className="home-container">
      <h3>메뉴입력</h3>
      <MenuForm onAddMenu={handleAddMenu}/>
      <ul>
        {menuList.map((menu, index) => {
          return(
            <li key={index}>
              {menu}
              <button onClick={() => handleDeleteMenu(index)}>삭제</button>
            </li>
          )
        })}
      </ul>
      <button className="spin-button" onClick={handleRotate} disabled={isRotating || menuList.length === 0}>
        메뉴 돌리기
      </button>
      {randomMenu && <div className="result-box">{randomMenu}</div>}
    </div>
  )
}
export default Home;