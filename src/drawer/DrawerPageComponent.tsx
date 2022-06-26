interface DrawerPageProps {
  toggleAxis: () => void
  handleAxisChange: (event: React.FormEvent<HTMLInputElement>) => void
  children?: React.ReactNode
}

const DrawerPage = ({
  toggleAxis,
  handleAxisChange,
  children,
}: DrawerPageProps) => {
  // Render
  return (
    <div className='drawer'>
      <input id='drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>{children}</div>

      <div className='drawer-side'>
        <label htmlFor='drawer' className='drawer-overlay'></label>
        <div className='menu p-4 overflow-y-auto bg-base-100 text-base-content w-1/4'>
          <div>
            <label>Axis size:</label>
            <input
              type='range'
              min='0'
              max='10'
              defaultValue={1}
              onChange={handleAxisChange}
              step='0.1'
            />
            <button onClick={toggleAxis} className='buttonPrimary'>
              Toggle axis
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrawerPage
