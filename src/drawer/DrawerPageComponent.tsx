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
            <table>
              <tr>
                <td>
                  <label className='settingsLabel'>Toggle axis:</label>
                </td>
                <td>
                  <input
                    type='checkbox'
                    className='settingsToggle'
                    checked={axisToggled}
                    onClick={toggleAxis}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label className='settingsLabel'>Axis size:</label>
                </td>
                <td>
                  <input
                    type='range'
                    min='0'
                    max='10'
                    defaultValue={1}
                    onChange={handleAxisChange}
                    step='0.1'
                    className='mt-2.5'
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrawerPage
