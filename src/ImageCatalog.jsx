import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Grid, GridList, GridListTile, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ImageTile from './ImageTile';
import ImageModal from './ImageModal';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    overflowX: 'hidden',
    width: 800,
    height: 850
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
}));

function ImageCatalog() {
  const classes = useStyles();
  const [catalog, setData] = useState([]);
  const [begin, setBegin] = useState(0);
  const [end, setEnd] = useState(25);
  const [modalOpen, setModal] = useState(false);
  const [photoDescription, setDescription] = useState('');
  const [currentPhoto, setPhoto] = useState({
    title: '',
    url: '',
    description: '',
    id: 0
  });

  // fetch photos w/ axios and async/await
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://jsonplaceholder.typicode.com/photos');

      setData(result.data);
    };

    fetchData();
  }, []);

  const paginate = symbol => {
    // if at beginning and go backwards - sets user to view last tiles
    if (begin === 0) {
      if (symbol === '-') {
        setBegin(5000 - 25);
        setEnd(5000);
        return;
      }
      // if at end, resets user to beginning tiles
    } else if (end === 5000) {
      if (symbol === '+') {
        setBegin(0);
        setEnd(25);
        return;
      }
    }
    // otherwise, paginates
    if (symbol === '+') {
      setBegin(begin + 25);
      setEnd(end + 25);
    } else {
      setBegin(begin - 25);
      setEnd(end - 25);
    }
  };

  const toggleModal = () => setModal(!modalOpen);

  // opens modal and passes photo to it
  const editPhoto = photo => {
    console.log('in edit', photo);
    setPhoto(photo);
    toggleModal();
  };

  // save photo to localstorage
  const savePhoto = photo => {
    //
  };

  // Saves to localStorage as you type
  const onChange = (event, id) => {
    localStorage.setItem(id.toString(), event.target.value);
    setDescription(event.target.value);
  };

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile style={{ width: '100vw' }} key="Subheader" cols={5} style={{ height: 'auto' }}>
          <ListSubheader style={{ width: '75vw' }} component="div">Photos</ListSubheader>
        </GridListTile>
        {catalog.length
          ? catalog.slice(begin, end).map(photo => <ImageTile onEdit={editPhoto} photo={photo} />)
          : <div>...Loading</div>}
      </GridList>
      <Grid style={{ margin: '10px' }} justify="flex-end" container>
        <Button onClick={() => paginate('-')} variant="outlined">Prev</Button>
        <Button onClick={() => paginate('+')} variant="outlined">Next</Button>
      </Grid>
      <ImageModal
        description={photoDescription}
        onCancel={toggleModal}
        onChange={onChange}
        setModal={setModal}
        photo={currentPhoto}
        onSave={savePhoto}
        open={modalOpen}
      />
    </div>
  );
}

export default ImageCatalog;
