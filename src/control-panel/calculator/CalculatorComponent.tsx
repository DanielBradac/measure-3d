import { useState } from 'react'
import { evaluate } from 'mathjs'

const Calculator = () => {
  const [result, setResult] = useState<string>('')

  const onChangeExpr = (expression: string) => {
    try {
      let res: string = evaluate(expression).toString()
      // Workaround for weird text results
      if (res.startsWith('fun')) {
        res = ''
      }
      setResult(res)
    } catch (e: unknown) {
      setResult('')
    }
  }
  // Render
  return (
    <div className='flex flex-col'>
      <textarea
        className='textarea textarea-bordered w-full'
        placeholder='Input expression...'
        onChange={e => onChangeExpr(e.target.value)}
      ></textarea>

      <div className='mt-2 ml-1'>
        <label>=</label>
        <span className='ml-2'>{result}</span>
      </div>
    </div>
  )
}

export default Calculator
