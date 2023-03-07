import { useContext, useRef, useState } from 'react'
import { formula, round } from 'exact-math'
import ElementInfo from '../ElementInfoComponent'
import { InteractionContext } from '../../context/GlobalContextComponent'
import { Vector } from '../../data-model/Vector'
import { FiHelpCircle } from 'react-icons/fi'
// eslint-disable-next-line import/namespace
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'

const Calculator = () => {
  // Interaction context
  const interactions = useContext(InteractionContext)

  const [result, setResult] = useState<number | null>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

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

  // Selected vector is added to the formula
  const addVectorLen = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const vec = interactions.interModel.clicked

    if (textAreaRef.current && e.key === 'Insert' && vec instanceof Vector) {
      const currentStart = textAreaRef.current.selectionStart
      const currentEnd = textAreaRef.current.selectionEnd
      const areaText = textAreaRef.current.value

      const newText = round(vec.length(), -3).toString()

      textAreaRef.current.value =
        areaText.slice(0, currentStart) + newText + areaText.slice(currentEnd)

      // Set the new cursor position
      const newCurPosition = currentStart + newText.length
      textAreaRef.current.setSelectionRange(newCurPosition, newCurPosition)
      onChangeExpr(textAreaRef.current.value)
    }
  }

  // Render
  return (
    <div className='flex flex-col'>
      <textarea
        ref={textAreaRef}
        onKeyDown={addVectorLen}
        className='textarea textarea-bordered w-full'
        placeholder='Input expression...'
        onChange={e => onChangeExpr(e.target.value)}
      ></textarea>

      <div className='mt-2 ml-1'>
        <label>=</label>
        <span className='ml-2 font-semibold'>{result?.toString()}</span>
      </div>

      <div className='mt-10 border-secondary border-t-2 px-5 py-3'>
        <ElementInfo element={interactions.interModel.clicked} />
      </div>

      <div className='collapse collapse-arrow bg-white rounded-lg mt-7 px-1 w-2/3'>
        <input type='checkbox' />
        <div className='collapse-title'>
          <span>
            <FiHelpCircle className='inline pr-1 pb-1' size={22} />
          </span>
          Hint
        </div>
        <div className='collapse-content pl-10'>Hello hint</div>
      </div>
    </div>
  )
}

export default Calculator
