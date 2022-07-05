import { useContext } from 'react'
import { SettingsContext } from '../App'

interface DrawerPageProps {
  toggleAxis: () => void
  handleAxisChange: (event: React.FormEvent<HTMLInputElement>) => void
  toggleTags: () => void
  handleTagSizeChange: (event: React.FormEvent<HTMLInputElement>) => void
  handlePointSizeChange: (event: React.FormEvent<HTMLInputElement>) => void
  children?: React.ReactNode
}

const DrawerPage = ({
  toggleAxis,
  handleAxisChange,
  toggleTags,
  handleTagSizeChange,
  handlePointSizeChange,
  children,
}: DrawerPageProps) => {
  // Import global settings
  const { axisToggled, pointTagsToggled } = useContext(SettingsContext)
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
                Show axis:
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
                defaultValue={5}
                onChange={handleAxisChange}
                step='0.1'
                className='table-cell align-middle'
              />
            </div>

            <div className='table-row'>
              <label className='itemLabel table-cell align-middle'>
                Show point tags:
              </label>
              <div className='table-cell'>
                <input
                  type='checkbox'
                  className='settingsToggle align-middle'
                  checked={pointTagsToggled}
                  onChange={toggleTags}
                />
              </div>
            </div>

            <div className='table-row'>
              <label className='itemLabel table-cell align-middle'>
                Point tags size:
              </label>
              <input
                type='range'
                min='1'
                max='100'
                defaultValue={8}
                onChange={handleTagSizeChange}
                step='0.5'
                className='table-cell align-middle'
              />
            </div>

            <div className='table-row'>
              <label className='itemLabel table-cell align-middle'>
                Point size:
              </label>
              <input
                type='range'
                min='0.00001'
                max='0.25'
                defaultValue={0.025}
                onChange={handlePointSizeChange}
                step='0.005'
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
