import React from 'react'
import { TextField } from '@mui/material'

export default function Inputbox(props) {
    console.log(props)
  return (<div>
    <TextField size='small' fullWidth label={ props?.fieldName } variant="outlined" />
    </div> )
}
