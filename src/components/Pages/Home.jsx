import React, { useEffect, useState } from 'react'
import { Box, CssBaseline, Typography } from '@mui/material'


const Home = () => {
  const [category, setCategory] = useState({})
  useEffect(() => {
    const getCategories = async () => {
      const [electronics, jewelery, mensCloth, womensClot] = await Promise.all([
        fetch('https://fakestoreapi.com/products/category/electronics'),
        fetch('https://fakestoreapi.com/products/category/jewelery'),
        fetch("https://fakestoreapi.com/products/category/men's clothing"),
        fetch("https://fakestoreapi.com/products/category/women's clothing")
      ]);
      const ele = await electronics.json()
      const jew = await jewelery.json()
      const men = await mensCloth.json()
      const wom = await womensClot.json()
      setCategory({electronic: ele, jewelery: jew, mensCloth: men, womensClot: wom})
    }

    
    getCategories();    
  })
  return (
    <Box>
      <CssBaseline />
      <Typography>
        hello
        
      </Typography>
    

    </Box>

  )
}

export default Home;