import { useState ,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword]= useState("")

  //useRef
  const passwordRef = useRef(null);



  const passswordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      str+"0123456789"
    }
    if(charAllowed){
      str+"!@#$%^&*-_+={{}[]"
    }

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length +1);

      pass += str.charAt(char);
    }
    setPassword(pass);

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPAsswwordToClipBoard = useCallback(()=>{
     passwordRef.current?.select()
     passwordRef.current?.setSelectionRange(0,3)
     window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passswordGenerator()
  },[length,numberAllowed,charAllowed,passswordGenerator])

  return (
    <>
     <h1>password generator</h1>
    <div>
        
        <div>
          <input 
             type="text"
             value={password}
             className='textfield1 bg'
             placeholder='password' readOnly
             ref={passwordRef}
          />
          <button
             onClick={copyPAsswwordToClipBoard}
             className='copy1'

          >copy</button>

        </div>

         <div>
          <div>
            <input 
  
          type="range"
          name=''
          id=''
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
           />
           <label htmlFor="">Length:{length}</label>
          </div>
            
          <div className='flex-items-center gap-x-1'>
                   <input 
                   type="checkbox"
                   defaultChecked={numberAllowed}
                   id='numberInput'
                   onChange={()=>{
                    setNumberAllowed((prev)=>!prev);
                
                   }}
                    />
                <label htmlFor="charInput">Numbers</label>

                <input 
                   type="checkbox"
                   defaultChecked={charAllowed}
                   id='charInput'
                   onChange={()=>{
                    setCharAllowed((prev)=>!prev);
                   }}
                    />
                <label htmlFor="charInput">characters</label>
          </div>

         </div>

    
    </div>
    </>
  )
}

export default App
