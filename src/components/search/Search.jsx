import React from 'react';
import { Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Search(props) {
  return (
    <div>
      <TextField
        type="text"
        label="Search News"
        placeholder="Search News"
        inputRef={props.inputRef}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button onClick={props.handleSearch} type="button" variant="contained">
                <SearchIcon />
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default Search;
