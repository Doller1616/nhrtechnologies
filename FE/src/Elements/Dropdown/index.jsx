import React from 'react'
import { Select, InputLabel, MenuItem, FormControl } from '@mui/material'

export default function Selectbox(props) {
    console.log(props)
    return (
        <FormControl fullWidth size='small'>
            <InputLabel size='small' >{ props?.fieldName }</InputLabel>
            <Select
                // value={age}
                label="Age"
                // onChange={handleChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    )
}