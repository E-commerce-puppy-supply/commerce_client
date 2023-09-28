import React from 'react'
import data from '../../../MOCK_DATA (1).json'
import Product from './Product'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { Container, CssBaseline } from '@mui/material'
import SideBar from './SideBar'
import { useFilter } from '../Context/FilterContext'



const Products = () => {
    const [products, setProducts] = useState([]);
    const {filter} = useFilter();
    useEffect(() => {
        const getProduct = async () => {
            const response = await fetch('https://fakestoreapi.com/products')
            const data = await response.json()
            setProducts(data);
        }
        getProduct();

    }, [])




    return (
        <>
            <Box sx={{paddingTop: 3}}>
                <Grid container >
                    {/* <Grid container item xs={4}>
                        <SideBar />
                    </Grid> */}
                    <Grid container item spacing={2}>
                        {products.filter((p)=>{
                            return filter.toLowerCase() === '' ? p : p.title.toLowerCase().includes(filter)
                        }).map(product =>
                            <Grid key={product.id} xs={10} sm={6} lg={3} item>
                                <Product product={product} />
                            </Grid>)}
                    </Grid>
                </Grid>
            </Box>

        </>

    )
}

export default Products