import {useState, useRef, useEffect} from 'react';

function CategoryForm({
  onAdd,
  onEdit,
  onEditStart,
}:{
  onAdd: (userInput:string) => void,
  onEdit: (id:string, userInput:string) => void,
  onEditStart: (id:string) => void,
}){
  const [userInput, setUserInput] = useState(''); //입력창
  const [isEditing, setIsEditing] = useState<null | string>(null); //수정중인지 여부
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if(userInput === ''){
      alert('텍스트를 입력해주세요.');
      return;
    }

    if(isEditing){
      onEdit(isEditing, userInput); //수정중
      setIsEditing(null); //수정완료 후 등록모드
    }else{
      onAdd(userInput); //등록모드
    }

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
        <button>{isEditing ? '수정' : '등록' }</button>
        {isEditing && (
          <button type="button" onClick={() => {
            setIsEditing(null); // 수정 취소
            setUserInput('');
          }}>
            취소
          </button>
        )}
      </form>
    </>
  )
}

function CategoryPage(setIsEditing:any){
  const [categories, setCategories] = useState<{id: string; code_name: string}[]>([]); //카테고리 목록
  
  //데이터 불러오기
  useEffect(() => {
    fetch(`/api/commonCodes/`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setCategories(data)
      })
      .catch(err => console.log(err))
  }, []);

  //리스트 추가
  const handleAdd = (userInput:string) => {
    fetch(`/api/commonCodes/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        mst_code:'',
        mst_code_name:'',
        code:'',
        code_name: userInput,
      })
    })
      .then(res => res.json())
      .then(newCategory => {
        console.log(newCategory);
        setCategories([...categories, newCategory]);
        console.log(newCategory)
      })
      .catch(err => console.log(err))
  }

  //리스트 수정
  const handleEdit = (id: string, userInput: string) => {
    fetch(`/api/commonCodes/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({code_name: userInput}),
    })
    .then(res => res.json())
    .then(updateCategory => {
      setCategories(categories.map(
        cate => cate.id === id ? updateCategory : cate
      ));
    })
    .catch(err => console.log(err))
  }

  const handleEditStart = (id:string) => {
    setIsEditing(id);
  }

  //리스트 삭제
  const handleDelete = (id:string) => {
    if(window.confirm('삭제하시겠습니까?')){
      fetch(`/api/commonCodes/${id}`, {
        method: 'DELETE',
      })
      .then(() => {
        setCategories(categories.filter(cate => cate.id !== id));
      })
      .catch(err => console.log(err))
    }
    
  }

  return(
    <>
      <h3>카테고리 관리</h3>
      <div className='h-full'>
        {/* 카테고리 등록/수정 */}
        <div className='flex-1 p-6'>
          <CategoryForm 
            onAdd={handleAdd}
            onEdit={handleEdit}
          />
        </div>
        {/* 카테고리 목록 */}
        <div className='w-64 bg-gray-50 border-r border-gray-200 p-4'>
          {categories.map((cate, index) => {
            return (
              <div key={index} className='px-3 py-2 rounded hover:bg-gray-100 flex'>
                <p>{cate.code_name}</p>
                <button onClick={() => handleEditStart(cate.id)}>수정</button>
                <button onClick={() => handleDelete(cate.id)}>삭제</button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
export default CategoryPage;