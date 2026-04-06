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
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={menu}
        onChange={(e) => setMenu(e.target.value)}
        ref={inputRef}
        placeholder='메뉴를 입력하세요.'
        className="flex-1 px-4 py-2 rounded-full border border-sky-200 bg-white/70 backdrop-blur-sm text-sm outline-none focus:ring-2 focus:ring-sky-300 transition"
      />
      <button className="px-5 py-2 bg-sky-500 text-white text-sm font-semibold rounded-full hover:bg-sky-600 transition-colors shadow-sm">
        입력
      </button>
    </form>
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
    <div className="p-6 max-w-md mx-auto">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm p-6">
        <h3 className="text-sky-800 font-semibold text-base mb-4">메뉴 입력</h3>
        <MenuForm onAddMenu={handleAddMenu}/>
        <ul className="flex flex-col gap-2 mb-4">
          {menuList.map((menu, index) => (
            <li key={index} className="flex justify-between items-center px-4 py-2 bg-sky-50/60 border border-sky-100/60 rounded-xl text-sm">
              {menu}
              <button
                onClick={() => handleDeleteMenu(index)}
                className="text-sky-300 text-xs border border-sky-200 rounded-full px-3 py-1 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-colors"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={handleRotate}
          disabled={isRotating || menuList.length === 0}
          className="w-full px-6 py-2 bg-sky-500 text-white text-sm font-semibold rounded-full hover:bg-sky-600 transition-colors shadow-sm disabled:bg-sky-200 disabled:cursor-not-allowed mb-4"
        >
          메뉴 돌리기
        </button>
        {randomMenu && (
          <div className="text-center py-4 bg-sky-50/80 border border-dashed border-sky-300 rounded-2xl text-sky-700 text-xl font-bold">
            {randomMenu}
          </div>
        )}
      </div>
    </div>
  )
}
export default Home;
