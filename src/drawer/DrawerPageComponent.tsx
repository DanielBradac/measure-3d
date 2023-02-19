import { FormEvent, ReactNode, useContext } from 'react'
import { SettingsContext } from '../context/ContextComponent'
import ToggleSliderSetting from './ToggleSliderSettingComponent'

interface DrawerPageProps {
  toggleAxis: () => void
  handleAxisChange: (event: FormEvent<HTMLInputElement>) => void
  toggleTags: () => void
  handleTagSizeChange: (event: FormEvent<HTMLInputElement>) => void
  togglePoints: () => void
  handlePointSizeChange: (event: FormEvent<HTMLInputElement>) => void
  toggleArrows: () => void
  handleArrowSizeChange: (event: FormEvent<HTMLInputElement>) => void
  children?: ReactNode
}

const DrawerPage = ({
  toggleAxis,
  handleAxisChange,
  toggleTags,
  handleTagSizeChange,
  togglePoints,
  handlePointSizeChange,
  toggleArrows,
  handleArrowSizeChange,
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
    arrowSize,
    arrowsToggled,
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
            <ToggleSliderSetting
              toggleLabel='Show axis'
              sliderLabel='Axis size'
              settingToggled={axisToggled}
              hanndleToggleChange={toggleAxis}
              handleSliderChange={handleAxisChange}
              sliderMin='0'
              sliderMax='50'
              sliderDefault={axisSize}
              sliderStep='0.1'
            />
            <ToggleSliderSetting
              toggleLabel='Show point tags'
              sliderLabel='Point tags size'
              settingToggled={pointTagsToggled}
              hanndleToggleChange={toggleTags}
              handleSliderChange={handleTagSizeChange}
              sliderMin='1'
              sliderMax='300'
              sliderDefault={pointTagsSize}
              sliderStep='0.5'
            />
            <ToggleSliderSetting
              toggleLabel='Show points'
              sliderLabel='Point size'
              settingToggled={pointsToggled}
              hanndleToggleChange={togglePoints}
              handleSliderChange={handlePointSizeChange}
              sliderMin='0.00001'
              sliderMax='0.5'
              sliderDefault={pointSize}
              sliderStep='0.005'
            />
            <ToggleSliderSetting
              toggleLabel='Show vector arrows'
              sliderLabel='Vector arrows size'
              settingToggled={arrowsToggled}
              hanndleToggleChange={toggleArrows}
              handleSliderChange={handleArrowSizeChange}
              sliderMin='1'
              sliderMax='50'
              sliderDefault={arrowSize}
              sliderStep='0.005'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrawerPage
