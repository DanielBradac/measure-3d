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
        <div className='settings'>
          <h2 className='settingsHeader'>Settings</h2>
          <div className='settingsContent'>
            <label className='mr-3 self-center'>Axis size:</label>
            <input
              type='range'
              min='0'
              max='10'
              defaultValue={1}
              onChange={handleAxisChange}
              step='0.1'
              className='mr-3 mt-1.5'
            />
            <button
              onClick={toggleAxis}
              className='buttonPrimary text-sm mt-1.5'
            >
              Toggle axis
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrawerPage
