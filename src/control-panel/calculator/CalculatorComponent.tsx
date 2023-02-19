import { useRef, useState } from 'react'
import { formula } from 'exact-math'

const Calculator = () => {
  const [result, setResult] = useState<number | null>(null)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const onChangeExpr = (expression: string) => {
    try {
      let res: number | null = Number(formula(expression))
      if (isNaN(res)) {
        res = null
      }
      setResult(res)
    } catch (e: unknown) {
      setResult(null)
    }
  }
  // Render
  return (
    <div className='flex flex-col'>
      <textarea
        ref={textareaRef}
        onSelectCapture={() =>
          textareaRef.current && console.log(textareaRef.current.selectionStart)
        }
        className='textarea textarea-bordered w-full'
        placeholder='Input expression...'
        onChange={e => onChangeExpr(e.target.value)}
      ></textarea>

      <div className='mt-2 ml-1'>
        <label>=</label>
        <span className='ml-2'>{result?.toString()}</span>
      </div>
    </div>
  )
}

export default Calculator
