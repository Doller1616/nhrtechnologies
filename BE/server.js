const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dyeForm = [
    {
        key: 'Inputbox',
        fieldName: 'Name'
    }
];


app.post('/updateform', (req, res) => {
    console.log('first-------', req.body)
    dyeForm.push(req.body);
    res.send({msg: 'Element Added'})
})

app.get('/updateform', (req, res) => {
    res.send(dyeForm)
})


app.listen(5000, () => {
    console.log('server started at 5000')
})