// importing react libraries and method
import { useState } from "react";

// importing mui components
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Select  from "@mui/material/Select";
import { IconButton, MenuItem, OutlinedInput } from "@mui/material";

// importing redux methods
import { useSelector, connect } from "react-redux";

// for notification
import { toast } from "react-toastify"

// importing components
import { Loader, Products } from "../components";

// importing reduces and ations
import {
    resetState,
    sortByPrice,
} from "../features";


const Home = ({sortBy,reset}) => {
    
    // variables
    const [optionValue, setOptionValue] = useState([]);
    const [xVisible, setXVisible] = useState(false);
    const isLoading = useSelector(state => state.products.loading);

    // sort  by options
    const Options = [
        "",
        "asc",
        "desc",
    ];

    // function to handle option select
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;

        setOptionValue(value);

        if (value === 'asc' || value === "desc") {
            // dispatch sort by price action
            sortBy(value);
            // notification
            if (value == 'asc') {
                toast.success(`Sorted by Price : Low to High.`);
            } else {
                toast.success(`Sorted by Price : High to Low.`);
            }

            setXVisible(true);

        } else {
            // dispatch sort by price action
            reset();
             // notification
            toast.success(`Order Back to default..!!`);

            setOptionValue("");
            setXVisible(false)
        }
      };
    
    // loader
    if (isLoading) {
        return <Loader/>
    }

    return (
        <>
            {/* Select button  start*/}
            <div className="selectSort">

                <FormControl sx={{
                    position :"relative",
                    m: 2, width: 300,
                    textTransform: "capitalize",
                    textAlign: "left"
                }}>

                    <InputLabel>Sort By</InputLabel>
                    
                    {/* reset button  section start */}
                    <IconButton
                        sx={{
                            display: `${xVisible ? "block" : "none"}`,
                            position: "absolute",
                            right: 2,
                            top: "-40px",
                            width : "50px",
                            height: "50px",
                            "&:hover": {
                                color: "black",
                                fontWeight: 600,
                                transform: 'scale(1.2)'
                            }
                        }}
                        onClick={() => {
                           reset();
                            toast.success(`Order Back to default..!!`);
                            setOptionValue("");
                            setXVisible(false);
                        }}
                        size="small"
                    >
                        <CloseOutlinedIcon />
                    </IconButton>
                    {/* reset button  section end */}

                    {/* display select */}
                    
                    <Select
                        value={optionValue}
                        onChange={handleChange}
                        input={<OutlinedInput label="Sort By"/>}
                    >
                        {/* looping options */}
                        {Options.map((option, index) => (
                        // display options
                            <MenuItem
                                key={index}
                                value={option}
                                sx={{textTransform:"capitalize"}}
                            >
                                {option}
                            </MenuItem>  
                        ))}
                
                    </Select>

                </FormControl>

            </div>
            {/* select button end */}

            
            <Products />
        </>
    )
}


// sennding  actions to component
const mapDispatchToProp = (dispatch) => {
    return {
        sortBy: (order) => dispatch(sortByPrice(order)),
        reset: () => dispatch(resetState())
    }
}

// exporting Home components
export default connect(null,mapDispatchToProp)(Home);