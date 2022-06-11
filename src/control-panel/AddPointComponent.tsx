import {useForm} from 'react-hook-form'
import { Drawable, Point } from '../data-model/Drawable'

type FormData = {
    x: number
    y: number
    z:number
}

interface AddPointProps {
    onAddElement: (newElement: Drawable) => void
}

const AddPoint = ({onAddElement}: AddPointProps) => {

    const {register, handleSubmit, reset} = useForm({
        defaultValues: {
            x: 0,
            y: 0,
            z: 0
          }
    })

    let y = 0;
    let z = 0; 
    // Render

    const addPoint = handleSubmit((data) => {
        onAddElement(new Point(data.x, data.y, data.z))
        reset()
    })


    return (
        <form onSubmit={addPoint}>
            <label htmlFor='X'>X:</label>
            <input {...register('x')} type='number' id='x' step="0.1"/>

            <label htmlFor='Y'>Y:</label>
            <input {...register('y')} type='number' id='y'/>

            <label htmlFor='Z'>Z:</label>
            <input {...register('z')} type='number' id='z'/>

            <button type="submit">Add point</button>
        </form>
    )

}

export default AddPoint
