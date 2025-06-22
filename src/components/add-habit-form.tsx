import React, { useState } from 'react'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { addHabit } from '../store/habit-slice';







const addhabitform:React.FC = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [name, setName]=useState<string>(""); 
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [frequency, setFrequency] = useState<"Daily" | "weekly">("Daily");
    
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const dispatch = useDispatch<AppDispatch>();

const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    if(name.trim()){
        dispatch(
            addHabit(
                {
                    name,
                    frequency,
                }
            )
        );
        setName("");
    }

}
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter habit name"
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={frequency}
            label="Frequency"
            onChange={(e) => setFrequency(e.target.value as "Daily" | "weekly")}
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Habit
        </Button>
      </Box>
    </form>
  )
}

export default addhabitform