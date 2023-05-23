import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'

const ModelVersionNavigation = () => {
  // Render
  return (
    <div className='flex flex-row -ml-1'>
      <IoMdArrowRoundBack
        className='text-secondary cursor-pointer active:animate-clickPrimaryBg rounded hover:animate-bgToPrimary'
        size={32}
        onClick={() => console.log('bw clicked')}
      />
      <IoMdArrowRoundForward
        className='text-secondary cursor-pointer active:animate-clickPrimaryBg rounded hover:animate-bgToPrimary'
        size={32}
        onClick={() => console.log('fw clicked')}
      />
    </div>
  )
}

export default ModelVersionNavigation
