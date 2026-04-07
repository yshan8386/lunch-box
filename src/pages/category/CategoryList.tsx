import {useState, useRef} from 'react';

function CategoryForm({onAddCategory}:{onAddCategory: (userInput:string) => void}){
  const [userInput, setUserInput] = useState(''); //입력창
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
        <input 
          type="text"
          ref={inputRef}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder='카테고리를 입력하세요'
        /> 
        <button>등록</button>
      </form>
    </>
  )
}

function CategoryList(){
  const [categories, setCategories] = useState<string[]>([]); //카테고리 목록
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
      <h3>카테고리 등록</h3>
      <CategoryForm onAddCategory={handleAddMenu}/>
      <div>
        {categories.map((cate, index) => {
          return (
            <div key={index} className='flex'>
              {editingIndex === index ?   // 이 항목만 수정 모드인지 체크
                <>
                  <input
                    value={localContent}
                    onChange={(e) => setLocalContent(e.target.value)}
                  />
                  <button onClick={() => handleEditConfirm(index)}>확인</button>
                  <button onClick={() => handleDeleteMenu(index)}>삭제</button>
                </>
                :
                <>
                  <p>{cate}</p>
                  <button onClick={() => handleEditStart(index)}>수정</button>
                  <button onClick={() => handleDeleteMenu(index)}>삭제</button>
                </>
                }
            </div>
          )
        })}
      </div>
    </>
  )
}
export default CategoryList;