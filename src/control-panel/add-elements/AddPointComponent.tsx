import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ModelContext } from '../../App'
import { indexOf } from '../../data-model/Interfaces'
import { Point } from '../../data-model/Point'
import { Layer } from '../../data-model/Layer'
import MultiSelectComponent from '../../common/MultiSelectComponent'
import { prevEnterSub } from '../../common/FormFunctions'

interface AddPointProps {
  onAddPoint: (newPoint: Point[]) => void
}

const AddPoint = ({ onAddPoint }: AddPointProps) => {
  const { layers, points } = useContext(ModelContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      x: 0,
      y: 0,
      z: 0,
      tag: '',
      layerIndex: 0,
    },
  })

  // Multiselect is not supported by useForm - we have layers separately
  const [selectedLayers, setSelectedLayers] = useState<Layer[]>([])

  const addPoint = handleSubmit(data => {
    onAddPoint([
      new Point(
        Number(data.x),
        Number(data.y),
        Number(data.z),
        data.tag,
        selectedLayers
      ),
    ])
    reset()
    setSelectedLayers([])
  })

  const generateRandomPoints = () => {
    const newPoints: Point[] = []
    for (let x = 0; x < 10; x++) {
      const newPoint = new Point(
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        x.toString(),
        [layers[0]]
      )
      if (indexOf(points, newPoint) === -1) {
        newPoints.push(newPoint)
      }
    }
    onAddPoint(newPoints)
  }

  // Render
  return (
    <form
      onSubmit={addPoint}
      className='inputForm'
      onKeyDown={e => prevEnterSub(e)}
    >
      <div className='table-column inputBlock'>
        <div className='table-row'>
          <label className='table-cell itemLabel'>X:</label>
          <input
            {...register('x', { required: true })}
            type='number'
            id='x'
            step='0.001'
            className='table-cell input input-bordered input-sm'
          />
        </div>

        <div className='table-row'>
          <label className='table-cell itemLabel'>Y:</label>
          <input
            {...register('y', { required: true })}
            type='number'
            id='y'
            step='0.001'
            className='table-cell input input-bordered input-sm'
          />
        </div>

        <div className='table-row'>
          <label className='table-cell itemLabel'>Z:</label>
          <input
            {...register('z', { required: true })}
            type='number'
            id='x'
            step='0.001'
            className='table-cell input input-bordered input-sm'
          />
        </div>

        <div className='table-row'>
          <label className='table-cell itemLabel'>Tag:</label>

          <input
            {...register('tag')}
            type='string'
            id='tag'
            className='table-cell input input-bordered input-sm'
          />
        </div>

        <div className='table-row'>
          <label className='table-cell itemLabel align-top'>Layers:</label>
          <div className='table-cell mt-10'>
            <MultiSelectComponent
              onRemove={(selectedList: Layer[]) =>
                setSelectedLayers(selectedList)
              }
              onSelect={(selectedList: Layer[]) =>
                setSelectedLayers(selectedList)
              }
              placeholder='Select layers...'
              selectedValues={selectedLayers}
              // this is here bacause of a bug on resetting selectedLayers
              options={layers}
              displayValue='name'
              emptyRecordMsg='No layers available'
            />
          </div>
        </div>
      </div>

      <div className='submitButton'>
        <button type='submit' className='buttonOutline'>
          Add point
        </button>
      </div>
      <div>
        <button
          type='button'
          className='buttonOutline'
          onClick={generateRandomPoints}
        >
          10 random points
        </button>
      </div>
    </form>
  )
}

export default AddPoint
