import React from 'react'
import { Controller } from 'react-hook-form'

const Customselect = ({control, name,  options}) => {
  return (
    <>
    
    <Controller
    // value={value}
    name={name}
    control={control}
    render={({field:{value, onChange}})=>
    <select value={value} onChange={onChange}>
      {
          options.map((item, index)=>
            <option value={item.value}>{item.label}</option>
        )
      }  
    </select>
}
    />    
    </>
    )
}

export default Customselect