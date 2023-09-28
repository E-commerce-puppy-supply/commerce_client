import { CssBaseline } from '@mui/material'
import React, { useEffect, useState} from 'react'

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch('https://fakestoreapi.com/users/1');
      const result = await response.json();
      setUser(result)
    }
    getUser();
  }, []);


  return (
    <>
      <CssBaseline />
      <h1>hello {user?.name.firstname}</h1>
      
    </>
  )
}

export default Profile