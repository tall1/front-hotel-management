import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useLocation} from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import Settings from './Settings';
import LoadFile from './LoadFile';
import Assignment from './Assignment';
import Info from './Info';

const pages = ['Update Settings and start alogrithem', 'Upload Data', 'Show Assignament'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [currentItem, setCurrentItem] = React.useState("");


    const {state} = useLocation();


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (event) => {
        setAnchorElNav(null);
        setCurrentItem(event.currentTarget.id);

    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const getItemContent = () => {
        switch (currentItem) {
            case "Update Settings and start alogrithem" :
                return (
                    <div>
                        <Settings userid={state}/>
                    </div>
                );
            case  "Upload Data":
                return (
                    <div>
                        <LoadFile/>
                    </div>
                );
            case "Show Assignament":
                return (
                    <div>
                        <Assignment/>
                    </div>
                );

                break;

            default :
                return (
                    <div>
                        <Info userid={state}/>
                    </div>
                );

        }
    }

    return (
        <React.Fragment>
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Hotel management
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem id={page} key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>

                        </Box>
                        <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Hotel management
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    id={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>

                        </Box>
                    </Toolbar>
                </Container>

            </AppBar>
            <div>
                {getItemContent()}
            </div>
        </React.Fragment>


    );
};
export default ResponsiveAppBar;


{/* <div>
{getItemContent()}
</div> */
}


// import react, { Component, useState, useEffect } from 'react';
// import { Link, useNavigate , useLocation} from 'react-router-dom';
// import Select from 'react-select' ;

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepButton from '@mui/material/StepButton';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Settings from './Settings';
// import LoadFile from './LoadFile';


// const steps = ['Select Evolutionary settings', 'Upload data', 'Create an ad'];

// export default function HorizontalNonLinearStepper() {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [completed, setCompleted] = React.useState({});
//     const { state } = useLocation();

//   const getStepContent = (activeStep ) => {

//         switch(activeStep) {
//             case 0:
//                 return(
//                     <div>
//                         <Settings userid ={state}/> 
//                     </div>
//                 )

//             case 1:
//               return(
//                 <div>
//                     <LoadFile/> 
//                 </div>
//             )

//             case 2:
//                 default:

//         }
//   }


//   const totalSteps = () => {
//     return steps.length;
//   };

//   const completedSteps = () => {
//     return Object.keys(completed).length;
//   };

//   const isLastStep = () => {
//     return activeStep === totalSteps() - 1;
//   };

//   const allStepsCompleted = () => {
//     return completedSteps() === totalSteps();
//   };

//   const handleNext = () => {
//     const newActiveStep =
//       isLastStep() && !allStepsCompleted()
//         ? // It's the last step, but not all steps have been completed,
//           // find the first step that has been completed
//           steps.findIndex((step, i) => !(i in completed))
//         : activeStep + 1;
//     setActiveStep(newActiveStep);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleStep = (step) => () => {
//     setActiveStep(step);
//   };

//   const handleComplete = () => {
//     const newCompleted = completed;
//     newCompleted[activeStep] = true;
//     setCompleted(newCompleted);
//     handleNext();
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//     setCompleted({});
//   };

//   return (
//     <Box sx={{ m:4}}>
//       <Stepper nonLinear activeStep={activeStep}>
//         {steps.map((label, index) => (
//           <Step key={label} completed={completed[index]}>
//             <StepButton color="inherit" onClick={handleStep(index)}>
//               {label} 
//             </StepButton>
//           </Step>
//         ))}
//       </Stepper>
//       <div>
//         {allStepsCompleted() ? (
//           <React.Fragment>
//             <Typography sx={{ mt: 2, mb: 1 }}>
//               All steps completed - you&apos;re finished
//             </Typography>
//             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//               <Box sx={{ flex: '1 1 auto' }} />
//               <Button onClick={handleReset}>Reset</Button>
//             </Box>
//           </React.Fragment>
//         ) : (
//           <React.Fragment>
//             <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
//             <div>
//                 {getStepContent(activeStep)};
//             </div>
//             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//               <Button
//                 color="inherit"
//                 disabled={activeStep === 0}
//                 onClick={handleBack}
//                 sx={{ mr: 1 }}
//               >
//                 Back
//               </Button>
//               <Box sx={{ flex: '1 1 auto' }} />
//               <Button onClick={handleNext} sx={{ mr: 1 }}>
//                 Next
//               </Button>
//               {activeStep !== steps.length &&
//                 (completed[activeStep] ? (
//                   <Typography variant="caption" sx={{ display: 'inline-block' }}>
//                     Step {activeStep + 1} already completed
//                   </Typography>
//                 ) : (
//                   <Button onClick={handleComplete}>
//                     {completedSteps() === totalSteps() - 1
//                       ? 'Finish'
//                       : 'Complete Step'}
//                   </Button>
//                 ))}
//             </Box>
//           </React.Fragment>
//         )}
//       </div>
//     </Box>
//   );
// }


// // export default function Login() {
// //     const [userId , setUserId] = useState("");
// //     const [password , setPassword] = useState("");
// //     const [errorMessages, setErrorMessages] = useState("");
// //     const[hotels, setHotels] = useState([]);
// //     const [chosenHotel, setChosenHotel] = useState('');
// //     const navigate = useNavigate();
// //    // const [users, setUsers] = useState([]);

// //     const errors = {
// //         uId: "invalid userId",
// //         pass: "invalid password",
// //         hotel: "this user not exist in this hotel",
// //         login :"you are logged in sucssesfuly"
// //     };


// //      useEffect(() => {
// //         const fetchData = async () => {
// //           const res= await fetch('http://localhost:8080/hotels/'); 
// //          const data = await res.json();
// //          setHotels(data);
// //         }

// //         fetchData();
// //      }, []);

// //      const options = hotels.map(hotel => ({
// //         "value" : hotel.hotelName,
// //         "label" : hotel.hotelName
// //       }))


// //     const handleSubmit = async (event) => {
// //         event.preventDefault();

// //             const res= await fetch('http://localhost:8080/users/' +userId);
// //             console.log({res});
// //             // if ( res === null)
// //             // {
// //             //     setErrorMessages({ name: "uId", message: errors.uId});
// //             // }
// //             // else{
// //             const user = await res.json();

// //             if(user.hotel.hotelName !== chosenHotel){
// //                 setErrorMessages({ name: "hotel", message: errors.hotel });
// //             }
// //             else
// //             {
// //                 if(user.password !== password)
// //                 {
// //                     setErrorMessages({ name: "pass", message: errors.pass });
// //                 }
// //                 else
// //                 {
// //                     navigate("/Settings",{state: {userId}});

// //                 }
// //             }

// //     };

// //     const renderErrorMessage = (name) =>
// //     name === errorMessages.name && (
// //         <div className="error">{errorMessages.message}</div>
// //     );

// //     return (
// //         <div className='Login'>
// //             <header>login to the system</header>
// //             <form onSubmit={handleSubmit}>
// //             <label>
// //                 please choose your hotel:
// //                 <select defaultValue={'DEFAULT'}
// //                 onChange={event=> setChosenHotel(event.target.value)}>
// //                 <option value="DEFAULT" disabled>Choose Hotel</option>
// //                 {/* <Select defaultValue={options[0]}  options={options} value={options.value}
// //                  onChange={selectedOption => setChosenHotel(selectedOption)} /> */}  

// //                 {hotels.map((hotel) => (
// //                     <option key={hotel.id} value={hotel.hotelName}>{hotel.hotelName}</option>
// //                   ))}  
// //                  </select>
// //                 {renderErrorMessage("hotel")}
// //             </label>
// //             <br></br>
// //             <label> user Id</label>
// //             <input  pattern="[0-9]*" onChange={(e) =>
// //             setUserId((v) => (e.target.validity.valid ? e.target.value : v))} required />
// //             {renderErrorMessage("uId")}
// //             <br></br>
// //             <label> password</label>
// //             <input onChange={event => setPassword (event.target.value)} required />
// //             {renderErrorMessage("pass")}
// //             <br></br>
// //             {/* <Link to="/assign"> */}
// //                 <button type ="submit">submit</button>
// //                 {renderErrorMessage("login")}

// //             {/* </Link> */}
// //             </form>
// //         </div>
// //     );
// // }
