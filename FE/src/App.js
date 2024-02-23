
import { useState, useRef, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import Inputbox from './Elements/Inputbox'
import Dropdown from './Elements/Dropdown'
import Button from '@mui/material/Button' 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material'
import axios from 'axios';
import { Select, InputLabel, MenuItem, FormControl } from '@mui/material'


function App() {

   const [open, setOpen] = useState(false);
   const [selectElement, setSelectElement] = useState(null);
   const textFieldRef = useRef('');
   const [elementConfig, setElementConfig] = useState([
    {
      key: 'Inputbox',
      fieldName: 'Name'
    },
    {
      key: 'Dropdown',
      fieldName: 'Age'
    }
   ]);


  

  const handleAddElement = () => {
    handleCloseDialoag()
  }

  const handleCloseDialoag = () => {
    setOpen((state) => (!state));
  }

  const handleSelectElement = ({target}) => {
    setSelectElement(target?.value);
  }

  useEffect(() => {
    
    (async () => {
     
      const res = await axios.get('http://localhost:5000/updateform');
      setElementConfig(res.data);
    })();


  }, [JSON.stringify(elementConfig)])
  

  const handleDialoagAddElementButton = async () => {
    setElementConfig((pre) =>([...pre, {key: selectElement, fieldName: textFieldRef.current?.value }]));
    const body = {key: selectElement, fieldName: textFieldRef.current?.value };
    const res = await axios.post('http://localhost:5000/updateform', body);
    console.log('res', res);
    setSelectElement(null)
    handleCloseDialoag()
  }

  const ElementKeys = (props) => {
     const { details } = props || {}

     switch (details?.key) {
      case 'Inputbox':
       return  <Inputbox {...details} />
      case 'Dropdown':
        return <Dropdown {...details} />
     }
  }

  return (
    <div style={{ backgroundColor: 'gray', padding: '20px', position: 'relative' }}>

      <Box display='flex' justifyContent='center' sx={{ backgroundColor: 'lightpink' }}>
        <Grid container spacing={2} padding={2}>
           
           {

            elementConfig.map((details, i)=>(
                    <Grid item xs={12} md={12}> 
                               <ElementKeys details={details} /> 
                      </Grid>))
           
           }

        </Grid>
      </Box>


      <div className='floating-button'>
        <div style={{
          backgroundColor: 'yellowgreen', borderRadius: '30px', padding: '20px',
          width: '20px', height: '20px', position: 'absolute', right: '1%', fontSize: '24px',
          display: 'flex', alignItems: 'center'
        }}
          onClick={handleAddElement}
        > + </div>
      </div>

      {/* Add Element Dialoag Box */}
      <Dialog
        open={open}
        onClose={handleCloseDialoag}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
        <TextField inputRef={textFieldRef} size='small' fullWidth label="Element Lable" variant="outlined" />
          <FormControl fullWidth size='small'>
            <InputLabel size='small' >Select Element</InputLabel>
            <Select
              value={selectElement}
              label="Select Element"
              onChange={handleSelectElement}
            >
              <MenuItem value='Inputbox'>Inputbox</MenuItem>
              <MenuItem value='Dropdown'>Dropdown</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialoagAddElementButton}> Add </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
