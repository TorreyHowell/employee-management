import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getContractors } from '../features/contractors/contractorSlice'

function Contractors() {
  const { contractors } = useSelector((state) => state.contractors)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getContractors())
  })
  return <div>Contractors</div>
}
export default Contractors
