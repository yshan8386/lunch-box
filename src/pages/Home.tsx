import React, {useState, useRef, useEffect} from 'react';

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
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
          ref = {inputRef}
          placeholder='메뉴를 입력하세요.'
          className="flex-1 px-4 py-2 rounded-full border border-sky-200 bg-white/70 backdrop-blur-sm text-sky-800 placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        <button className="px-6 py-2 bg-sky-500 text-white text-sm font-semibold rounded-full hover:bg-sky-600 transition-colors shadow-sm">입력</button>
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
      }, 200);//랜덤 돌아가는 속도
      return () => {
        clearInterval(timer);
      }
    }
  }, [isRotating, menuList, 500]);

  return(
    <div className="p-6 flex flex-col gap-6">
      <h3 className="text-sky-800 font-semibold text-lg">메뉴입력</h3>
      <MenuForm onAddMenu={handleAddMenu}/>
      <ul className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm">
        {menuList.map((menu, index) => {
          return(
            <li key={index} className="flex items-center justify-between px-4 py-3 border-t first:border-t-0 border-sky-100/60 hover:bg-sky-50/60">
              <span className="text-sky-800">{menu}</span>
              <button onClick={() => handleDeleteMenu(index)} className="px-4 py-1 text-sm text-sky-500 border border-sky-300 rounded-full hover:bg-sky-100 transition-colors">삭제</button>
            </li>
          )
        })}
      </ul>
      <div className="flex justify-center">
        <button
          onClick={handleRotate}
          disabled={isRotating || menuList.length === 0}
          className="px-8 py-2 bg-sky-500 text-white text-sm font-semibold rounded-full hover:bg-sky-600 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          메뉴 돌리기
        </button>
      </div>
      {randomMenu && (
        <p className="text-center text-2xl font-bold text-sky-700">{randomMenu}</p>
      )}
    </div>
  )
}
export default Home;