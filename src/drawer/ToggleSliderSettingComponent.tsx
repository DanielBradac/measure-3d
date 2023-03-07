import { FormEvent } from 'react'
import FadeInFadeOutComp from '../animation-components/FadeInFadeOutComp'

interface ToggleSliderSettingProps {
  toggleLabel: string
  sliderLabel: string
  settingToggled: boolean
  hanndleToggleChange: () => void
  handleSliderChange: (event: FormEvent<HTMLInputElement>) => void
  sliderDefault: number
  sliderMin: string
  sliderMax: string
  sliderStep: string
}

const ToggleSliderSetting = ({
  toggleLabel,
  sliderLabel,
  settingToggled,
  hanndleToggleChange,
  handleSliderChange,
  sliderMin,
  sliderMax,
  sliderDefault,
  sliderStep,
}: ToggleSliderSettingProps) => {
  // Render
  return (
    <>
      <div className='table-row'>
        <label className='itemLabel table-cell align-middle'>
          {toggleLabel}:
        </label>
        <div className='table-cell'>
          <input
            type='checkbox'
            className='toggle toggle-primary align-middle'
            checked={settingToggled}
            onChange={hanndleToggleChange}
          />
        </div>
      </div>

      <FadeInFadeOutComp show={settingToggled} className='table-row'>
        <label className='itemLabel table-cell align-middle'>
          {sliderLabel}:
        </label>
        <input
          type='range'
          min={sliderMin}
          max={sliderMax}
          defaultValue={sliderDefault}
          onChange={handleSliderChange}
          step={sliderStep}
          className='table-cell align-middle range range-primary'
        />
      </FadeInFadeOutComp>
    </>
  )
}

export default ToggleSliderSetting
