import React from 'react';
import { Button, GridListTile, GridListTileBar } from '@material-ui/core';

const ImageTile = ({ photo, onEdit }) => {
  const { id, title, thumbnailUrl } = photo;
  return (
    <GridListTile key={id}>
      <img src={thumbnailUrl} alt={title} />
      <GridListTileBar
        title={title}
        actionIcon={
            <Button onClick={() => onEdit(photo)}>Edit${id}</Button>
        }
      />
    </GridListTile>
  );
};

export default ImageTile;
