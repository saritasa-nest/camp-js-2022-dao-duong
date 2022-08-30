import { Snackbar } from '@mui/material';
import { FC, forwardRef, memo, SyntheticEvent, useState } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

/** Severity level for alert color. */
export enum Severity {
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning',
}

const SNACKBAR_DURATION = 3000;

interface MySnackbarProps {

  /** Snackbar message. */
  readonly message: string;

  /** Severity level for snackbar. */
  readonly severity?: Severity;

}

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const AppSnackbarComponent: FC<MySnackbarProps> = ({
  message,
  severity,
}) => {

  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(true);

  const onSnackbarClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isSnackbarOpen}
      autoHideDuration={SNACKBAR_DURATION}
      onClose={onSnackbarClose}
    >
      <Alert severity={severity} sx={{ width: '100%' }} onClose={onSnackbarClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export const AppSnackbar = memo(AppSnackbarComponent);
