import { Snackbar } from '@mui/material';
import { FC, forwardRef, memo } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

/** Severity level for alert color. */
export enum Severity {
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning',
}

interface MySnackbarProps {

  /** Open state for snackbar. */
  readonly open: boolean;

  /** Duration in milliseconds for snackbar to display. */
  readonly duration?: number;

  /** OnClose callback for snackbar. */
  readonly onClose: (event?: React.SyntheticEvent | Event, reason?: string,) => void;

  /** Snackbar message. */
  readonly message: string;

  /** Severity level for snackbar. */
  readonly severity?: Severity;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const MySnackbarComponent: FC<MySnackbarProps> = ({ open, duration, onClose, message, severity }) => (
  <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={open}
    autoHideDuration={duration}
    onClose={onClose}
  >
    <Alert
      severity={severity}
      sx={{ width: '100%' }}
      onClose={onClose}
    >
      {message}
    </Alert>
  </Snackbar>
);

export const MySnackbar = memo(MySnackbarComponent);
