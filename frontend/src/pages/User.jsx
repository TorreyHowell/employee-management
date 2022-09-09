import { useSelector } from 'react-redux'

function User() {
  const { user } = useSelector((state) => state.users)

  return <></>
}
export default User
