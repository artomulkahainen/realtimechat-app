import { Button } from '@mui/material';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    ariaLabel?: string;
    color?: 'primary' | 'secondary';
    isLoading?: boolean;
    variant?: 'contained' | 'outlined' | 'text';
    width?: string;
};

function ChatButton({
    children,
    ariaLabel,
    color = 'primary',
    isLoading = false,
    variant = 'outlined',
    width,
}: Props) {
    return (
        <Button
            aria-label={ariaLabel}
            type="submit"
            disableFocusRipple
            disableTouchRipple
            color={color}
            loading={isLoading}
            variant={variant}
            sx={{ width }}
        >
            {children}
        </Button>
    );
}

export default ChatButton;
