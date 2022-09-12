import { Button, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContractorItem from '../components/ContractorItem'
import {
  createContractor,
  getContractors,
  reset as resetContractors,
} from '../features/contractors/contractorSlice'
import { toast } from 'react-toastify'

function Contractors() {
  const { contractors } = useSelector((state) => state.contractors)

  const [addContractor, setAddContractor] = useState(false)
  const [newContractor, setNewContractor] = useState({
    name: '',
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getContractors())

    return () => {
      dispatch(resetContractors())
    }
  }, [dispatch])

  const onChange = (e) => {
    setNewContractor((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCancel = () => {
    setNewContractor({
      name: '',
    })
    setAddContractor(false)
  }

  const handleSubmit = () => {
    if (newContractor.name.length <= 2) {
      return toast.error('Enter a name')
    }

    dispatch(createContractor(newContractor))

    handleCancel()
  }
  return (
    <>
      <Button
        variant="outlined"
        fullWidth
        sx={{
          marginBottom: 2,
        }}
        onClick={() => setAddContractor(true)}
      >
        Add Client
      </Button>

      {addContractor && (
        <>
          <Grid container mb={2} direction="row" spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="name"
                onChange={onChange}
                size="small"
                variant="outlined"
                label="Name"
                autoComplete="off"
              />
            </Grid>
            <Grid item sm={3} xs={6}>
              <Button
                fullWidth
                onClick={handleCancel}
                color="secondary"
                variant="outlined"
              >
                <Typography variant="button" noWrap>
                  Cancel
                </Typography>
              </Button>
            </Grid>
            <Grid item sm={3} xs={6}>
              <Button fullWidth onClick={handleSubmit} variant="outlined">
                <Typography variant="button" noWrap>
                  Submit
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      <Grid container spacing={1}>
        {contractors.map((contractor) => (
          <Grid item key={contractor._id} xs={6}>
            <ContractorItem contractor={contractor} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
export default Contractors
