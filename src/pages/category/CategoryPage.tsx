import {useState, useRef, useEffect} from 'react';

function CategoryForm({onAddCategory}:{onAddCategory: (userInput:string) => void}){
  const [userInput, setUserInput] = useState(''); //입력창
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if(userInput === ''){
      alert('텍스트를 입력해주세요.');
      return;
    }
    onAddCategory(userInput);
    setUserInput('');
    inputRef.current?.focus();
  }

  return(
    <>
      <form onSubmit={handleSubmit}>
        {isEditing ? 
          <>
          <input 
            type="text"
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder='카테고리를 입력하세요'
          /> 
          <button>수정</button>
          <button>삭제</button>
          </>
          :
          <>
          <input 
            type="text"
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder='카테고리를 입력하세요'
          /> 
          <button>등록</button>
          </>
        }
      </form>
    </>
  )
}

function CategoryPage(){
  // const [categories, setCategories] = useState<string[]>([]); //카테고리 목록
  const [categories, setCategories] = useState(['양식', '중식', '일식']); //카테고리 목록
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [localContent, setLocalContent] = useState('');

  //리스트 추가
  const handleAddMenu = (menu:string) => {
    setCategories([...categories, menu]);
  }
  //리스트 삭제
  const handleDeleteMenu = (index:number) => {
    if(window.confirm('삭제하시겠습니까?')){
      setCategories(categories.filter((_, i) => i !== index));
    }
  }
  // 수정 버튼 클릭 → 해당 index를 editingIndex로 저장, 기존 값을 localContent에 세팅
  const handleEditStart = (index: number) => {
    setEditingIndex(index);
    setLocalContent(categories[index]); // 기존 텍스트를 input에 미리 채움
  }

  // 확인 버튼 클릭 → categories 배열에서 해당 index만 localContent로 교체
  const handleEditConfirm = (index: number) => {
    const updated = categories.map((cate, i) => i === index ? localContent : cate);
    setCategories(updated);
    setEditingIndex(null); // 수정 모드 종료
  }

  return(
    <>
      <h3>카테고리 관리</h3>
      <div className='flex h-full'>
        {/* 카테고리 목록 */}
        <div className='w-64 bg-gray-50 border-r border-gray-200 p-4'>
          {categories.map((cate, index) => {
            return (
              <div key={index} className='px-3 py-2 rounded hover:bg-gray-100'>
                <p>{cate}</p>
              </div>
            )
          })}
        </div>
        {/* 카테고리 등록/수정 */}
        <div className='flex-1 p-6'>
          <CategoryForm onAddCategory={handleAddMenu}/>
        </div>
      </div>
    </>
  )
}
export default CategoryPage;