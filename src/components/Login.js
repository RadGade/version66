import React from 'react';
import { useForm } from 'react-hook-form';
import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';


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

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(blue[200]),
    backgroundColor: blue[200],
    '&:hover': {
      backgroundColor: blue[300],
    },
  },
}))(Button);



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
}
}));


export default function Login(props) {

const {Email, setEmail} = React.useState("")
const {password, setPassword} = React.useState("")

  const { register, handleSubmit, errors } = useForm(); // initialise the hook
const onSubmit = data => {
  console.log(data);
console.log(errors.email)
 props.handelRegister(data.email, data.password)
};

  const classes = useStyles();

  return (
    <form className={classes.root} >
      <div className={classes.con}>
      <Credentials
      className={classes.TextField}
      label="Email"
      variant="outlined"
      name="email"
      id="custom-css-outlined-input"
      inputRef={
        register({
          required : true,
        })
      }
      error = {errors.email}
    />
      </div>
    <div className={classes.con}>
    <Credentials
    className={classes.TextField}
    label="Password"
    type = "password"
    variant="outlined"
    name="password"
    id="custom-css-outlined-input" 
    inputRef={
      register({
        required : true,
        message: "oopsies"
      })
    }
  />
    </div>

    <ColorButton variant="contained" color="primary"  className={classes.button} onClick={() => handleSubmit(onSubmit)}>
      Login
    </ColorButton>
    </form>

  );
}
