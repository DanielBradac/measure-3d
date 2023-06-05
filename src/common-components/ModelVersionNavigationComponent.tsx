import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { ModelContext } from '../context/GlobalContextComponent'
import { useContext } from 'react'

const ModelVersionNavigation = () => {
  const { forward, backward } = useContext(ModelContext)
  // Render
  return (
    <div className='flex flex-row -ml-1'>
      <IoMdArrowRoundBack
        className='text-secondary cursor-pointer active:animate-clickPrimaryBg rounded hover:animate-bgToPrimary'
        size={32}
        onClick={() => backward()}
      />
      <IoMdArrowRoundForward
        className='text-secondary cursor-pointer active:animate-clickPrimaryBg rounded hover:animate-bgToPrimary'
        size={32}
        onClick={() => forward()}
      />
    </div>
  )
}

export default ModelVersionNavigation
