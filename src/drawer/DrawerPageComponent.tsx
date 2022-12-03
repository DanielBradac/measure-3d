import { FormEvent, ReactNode, useContext } from 'react'
import FadeInFadeOutComp from '../animation-components/FadeInFadeOutComp'
import { SettingsContext } from '../App'

interface DrawerPageProps {
  toggleAxis: () => void
  handleAxisChange: (event: FormEvent<HTMLInputElement>) => void
  toggleTags: () => void
  handleTagSizeChange: (event: FormEvent<HTMLInputElement>) => void
  togglePoints: () => void
  handlePointSizeChange: (event: FormEvent<HTMLInputElement>) => void
  children?: ReactNode
}

const DrawerPage = ({
  toggleAxis,
  handleAxisChange,
  toggleTags,
  handleTagSizeChange,
  togglePoints,
  handlePointSizeChange,
  children,
}: DrawerPageProps) => {
  // Import global settings
  const {
    axisToggled,
    pointTagsToggled,
    pointSize,
    axisSize,
    pointTagsSize,
    pointsToggled,
  } = useContext(SettingsContext)
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

            <FadeInFadeOutComp show={axisToggled} className='table-row'>
              <label className='itemLabel table-cell align-middle'>
                Axis size:
              </label>
              <input
                type='range'
                min='0'
                max='50'
                defaultValue={axisSize}
                onChange={handleAxisChange}
                step='0.1'
                className='table-cell align-middle'
              />
            </FadeInFadeOutComp>

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

            <FadeInFadeOutComp show={pointTagsToggled} className='table-row'>
              <label className='itemLabel table-cell align-middle'>
                Point tags size:
              </label>
              <input
                type='range'
                min='1'
                max='300'
                defaultValue={pointTagsSize}
                onChange={handleTagSizeChange}
                step='0.5'
                className='table-cell align-middle'
              />
            </FadeInFadeOutComp>

            <div className='table-row'>
              <label className='itemLabel table-cell align-middle'>
                Show points:
              </label>
              <div className='table-cell'>
                <input
                  type='checkbox'
                  className='settingsToggle align-middle'
                  checked={pointsToggled}
                  onChange={togglePoints}
                />
              </div>
            </div>

            <FadeInFadeOutComp show={pointsToggled} className='table-row'>
              <label className='itemLabel table-cell align-middle'>
                Point size:
              </label>
              <input
                type='range'
                min='0.00001'
                max='0.5'
                defaultValue={pointSize}
                onChange={handlePointSizeChange}
                step='0.005'
                className='table-cell align-middle'
              />
            </FadeInFadeOutComp>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrawerPage
