import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

function Home(){
  const [menus, setMenus] = useState<string[]>([]); //입력된 메뉴 리스트 담는 배열
  const [randomMenu, setRandomMenu] = useState<string | null>(null); //랜덤으로 선택된 메뉴 담는 배열
  const [isRotating, setIsRotating] = useState(false); //메뉴리스트가 돌아가고있는지 체크하는 상태 변수

  //useEffect 훅을 사용 메뉴 리스트가 돌아가는 동작 구현
  useEffect(() => {
    if(isRotating) {
      const timer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * setMenus.length);
        setRandomMenu(menus[randomIndex]);
      }, 500)

      return () => {
        clearInterval(timer);
      }
    }
  }, [isRotating, menus, 500]);

  // 입력한 메뉴를 배열에 추가 
  //handleAddMenu 함수는 매개변수 menu를 받아와서 menus 배열에 새로운 메뉴를 추가
  const handleAddMenu = (menu: string) => {
    setMenus([...menus, menu]); //...는 전개 연산자
  };

  // 입력한 메뉴를 배열에 삭제
  const handleDeleteMenu = (index: number) => {
    const updatedMenus = [...menus];
    updatedMenus.splice(index, 1);
    setMenus(updatedMenus);
  };

  //메뉴 돌리기 버튼 클릭시 메뉴 돌리기
  const handleRotate = () => {
    if (menus.length > 0) {
      setIsRotating(true);

      setTimeout(() => {
        setIsRotating(false);
        const randomIndex = Math.floor(Math.random() * menus.length);
        setRandomMenu(menus[randomIndex]);
      }, 3000);
    }
  };

  //다시 돌리기 클릭시 랜덤으로 선택된 메뉴 다시 초기화
  const handleRestart = () => {
    setRandomMenu(null);
  };

  const MenuList = ({menus, onDeleteMenu}: {menus: string[], onDeleteMenu: (index: number) => void}) => {
    return(
      <ul>
        {menus.map((menu: string, index: number) => {
          return <li key={index}>
            {menu}
            <button onClick={() => onDeleteMenu(index)}>삭제</button>
          </li>
        })}
      </ul>
    )
  }

  const MenuForm = ({onAddMenu} : {onAddMenu : (menu: string) => void}) => {
    const [menu, setMenu] = useState(''); //사용자가 입력한 메뉴를 담는 상태변수

  // 입력했을때 실행되는 이벤트 함수
  const handleSubmit = (e) => {
    e.preventDefault(); //페이지 새로고침 방지
    if (menu.trim() === '') {  //사용자가 입력한 메뉴가 빈 문자열이면 알럿창으로 띄우고 다시 리턴
        alert('메뉴 추가부탁드립니다')
        return
    }; 
    // 사용자가 입력한 메뉴가 있다면 onAddMenu함수를 호출해 입력한 메뉴 추가
    onAddMenu(menu);
    setMenu(''); // 입력후 meun상태 초기화하여 입력창을 비움
  };

  return (
    // 메뉴를 입력하는 폼 생성
    <form onSubmit={handleSubmit}>

        {/* 사용자가 메뉴입력할수 있는 입력창 */}
      <input
        type="text"
        value={menu}
        onChange={(e) => setMenu(e.target.value)}
        placeholder="메뉴를 입력하세요"
      />

      <button type="submit">메뉴 추가</button>
    </form>
  );
  }

  return(
    <>
    <Link to='/list'>리스트 보기</Link>
    <div>
      <h3>점심메뉴추천</h3>
      <MenuForm onAddMenu={handleAddMenu}/>
      <MenuList menus={menus} onDeleteMenu={handleDeleteMenu} />
    <div className="rotation-container">
        <div className={`menu-container ${isRotating ? 'rotating' : ''}`}>
          {menus.map((menu, index) => (
            <div key={index} className={`menu-item ${randomMenu === menu ? 'selected' : ''}`}>
              {menu}
            </div>
          ))}
        </div>
        <p>메뉴를 추가해주세요</p>
        <button onClick={handleRotate} disabled={isRotating || menus.length === 0}>
          메뉴돌리기
        </button>
        {randomMenu && (
          <div className="popup">
            <h2>오늘의 선택</h2>
            <p>{randomMenu}</p>
            <button onClick={handleRestart}>다시돌리기</button>
          </div>
        )}
      </div>
    </div>  
    </>
  );
}

export default Home;