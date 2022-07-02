interface DrawerPageProps {
  toggleAxis: () => void
  handleAxisChange: (event: React.FormEvent<HTMLInputElement>) => void
  axisToggled: boolean
  children?: React.ReactNode
}

const DrawerPage = ({
  toggleAxis,
  handleAxisChange,
  axisToggled,
  children,
}: DrawerPageProps) => {
  // Render
  return (
    <div className='drawer'>
      <input id='drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>{children}</div>

      <div className='drawer-side'>
        <label htmlFor='drawer' className='drawer-overlay' />
        <div className='settings'>
          <h2 className='settingsHeader'>Settings</h2>
          <div className='settingsContent'>
            <div className='table-row'>
              <label className='itemLabel table-cell align-middle'>
                Toggle axis:
              </label>
              <div className='table-cell'>
                <input
                  type='checkbox'
                  className='settingsToggle align-middle'
                  checked={axisToggled}
                  onChange={toggleAxis}
                />
              </div>
            </div>

            <div className='table-row'>
              <label className='itemLabel table-cell align-middle'>
                Axis size:
              </label>
              <input
                type='range'
                min='0'
                max='50'
                defaultValue={1}
                onChange={handleAxisChange}
                step='0.1'
                className='table-cell align-middle'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrawerPage
