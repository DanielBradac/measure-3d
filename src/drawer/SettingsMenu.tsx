import { Drawer, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { Settings } from '@mui/icons-material'
import './SettingsMenu.css'

interface SettingsMenuProps {
  toggleAxis: () => void
  handleAxisChange: (event: React.FormEvent<HTMLInputElement>) => void
}

const SettingsMenu = ({ toggleAxis, handleAxisChange }: SettingsMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)} size='large' edge='start'>
        <Settings className='iconPrimary' />
      </IconButton>
      <Drawer anchor='left' open={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <Typography variant='h6' component='div'>
            <label>Axis size:</label>
            <input
              type='range'
              min='0'
              max='10'
              defaultValue={1}
              onChange={handleAxisChange}
              step='0.1'
            />
            <button onClick={toggleAxis}>Toggle axis</button>
          </Typography>
        </div>
      </Drawer>
    </>
  )
}

export default SettingsMenu
