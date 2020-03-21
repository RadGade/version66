import React from 'react';
import {
  withStyles,
  makeStyles,
  useTheme
} from '@material-ui/core/styles';

import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Chip, Input   } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
let YearLevel = [6, 7, 8, 9, 10]
const Credentials = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
        borderWidth : 1,
      },
    },
  },
})(TextField);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
    'History',
    'Maths',
    'Science',
    'English',
    'STEM',
    'Drama',
    'Dance'
  ];

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(blue[200]),
    backgroundColor: blue[200],
    '&:hover': {
      backgroundColor: blue[300],
    },
  },
}))(Button);



function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }



  
export default function Register() {
  const theme = useTheme();
  const [school, setSchool] = React.useState('');
  const [step, setStep] = React.useState(1);
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [teach, setTeach] = React.useState(false);
  const [Year, setYear] = React.useState([]);
  const [Subjects, setSubjects] = React.useState([]);
  const [personName, setPersonName] = React.useState([]);
  
const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    top : "15%",
    width : "20%"
  },
  margin: {
    margin: theme.spacing(1),
  },
TextField : {
    background: "transparent",
    width: "70vw",
    maxWidth : "500px",
    height: "5vh"
},
con : {
    margin: theme.spacing(1),
  justifyContent : "center",
  marginLeft : "5vw",
  alignItems : "center",
  paddingTop: "45px",
},
button : {
  color : "white",
  position : "absolute",
  top : "125%",
  marginLeft : "5vw",
  width: "30vw",
  maxWidth : "500px",
  height: "5vh",
  boxShadow: "none"
},
Select : {
    justifyContent : "center",
    width: "37vw",
    marginTop : "5vh",
    marginBottom : "0",
    marginLeft : "5vw"
},
    accType1 : {
        width : "146px",
        height : "75px",
        border :  !teach ?   "1px solid #56B995" : "1px solid #000000",
        boxSizing : "border-box",
        borderRadius : "8px",
        justifyContent : "center",
        marginLeft : "200px",
        alignItems: "center",
        textAlign : "center",
        paddingTop : "3vh"
    },
    accType : {
        width : "146px",
        float : "left",
        height : "75px",
        border :  teach ?  "1px solid #56B995" : "1px solid #000000",
        boxSizing : "border-box",
        borderRadius : "8px",
        justifyContent : "center",
        alignItems: "center",
        marginLeft: "10%",
        textAlign : "center",
        paddingTop : "3vh"
    },
    beam : {
        marginLeft : "20%",
        marginTop : "20%"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
}));


const classes = useStyles();

  const handleChange = e => {
    setSchool(e.target.value);
  };

  const handlePerChange = event => {
    setPersonName(event.target.value);
  };

  const handleYearChange = event => {
    setYear(event.target.value);
  };

  // eslint-disable-next-line default-case
  switch(step) {
      case 1:
        return (
            <form className={classes.root} noValidate>
            <FormControl variant="outlined" className={classes.Select}>
            <InputLabel id="simple-select-outlined-label">School</InputLabel>
            <Select
              id="simple-select-outlined"
              value={school}
              onChange={handleChange}
              label="School"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Charles Campbell Collage"}>Charles Campbell Collage</MenuItem>
            </Select>
          </FormControl>
              <div className={classes.con}>
              <Credentials
              className={classes.TextField}
              label="Email"
              variant="outlined"
              id="custom-css-outlined-input"
            />
              </div>
            <div className={classes.con}>
            <Credentials
            className={classes.TextField}
            label="Password"
            type = "password"
            variant="outlined"
            id="custom-css-outlined-input"
          />
            </div>
        
            <ColorButton variant="contained" color="primary" className={classes.button} onClick={() => setStep(step + 1)}>
              Next
            </ColorButton>
            </form>
          );

    case 2: 
    return (
        <form className={classes.root} noValidate>
        <div className={classes.beam}>
        <div className = {classes.accType} onClick={() => setTeach(true)}>Teacher</div>
        <div className = {classes.accType1} onClick={() => setTeach(false)}>Student</div>
        </div>
        <FormControl className={classes.Select}>
        <InputLabel id="demo-mutiple-chip-label">Subjects</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={personName}
          onChange={handlePerChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {names.map(name => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.Select}>
        <InputLabel id="demo-mutiple-chip-label">Year Level</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={Year}
          onChange={handleYearChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => ( 
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {YearLevel.map(Year => (
            <MenuItem key={Year} value={Year}>
              {Year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <ColorButton variant="contained" color="primary" className={classes.button}>
          Register
        </ColorButton>
        </form>
      );
  }
}
