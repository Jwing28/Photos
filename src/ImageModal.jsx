import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@material-ui/core';

const ImageModal = ({ photo, handleClose, onCancel, onChange, onSave, open }) => {
  const { title, url, description, id } = photo;
  const storedDescription = localStorage.getItem(id.toString());
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent style={{ margin: '0 auto' }}>
        <img src={url} />
        <DialogContentText>
          {description}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label={storedDescription ? `Current Description: ${storedDescription}` : 'Description'}
          type="text"
          onChange={event => onChange(event, id)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onCancel} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageModal;
