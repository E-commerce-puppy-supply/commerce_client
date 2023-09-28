import React, { createContext, useContext, useState } from 'react'


const FilterProduct = createContext();

export const useFilter = ()=>{
  return useContext(FilterProduct);
}

export const FilterContext = ({children}) => {
const [filter, setfilter] = useState('');

  return (
    <FilterProduct.Provider value={{filter, setfilter}}>
        {children}
    </FilterProduct.Provider>
  )
}

