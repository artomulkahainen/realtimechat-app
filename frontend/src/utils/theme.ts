import { createTheme } from '@mui/material';

export const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:focus-visible': {
                        outline: '1px solid black',
                        outlineOffset: '4px',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                        outline: '1px solid black',
                        outlineOffset: '4px',
                    },
                },
            },
        },
    },
});
