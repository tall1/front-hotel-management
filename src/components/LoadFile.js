import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../LoadFile.css';

export default function LoadFile() {
  const theme = createTheme();

  const [roomfile, setRoomFile] = useState('');
  const [resfile, setResFile] = useState('');

  /*const [isFilePicked, setIsSelected] = useState(false);*/

  const handleResChange = async (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = (e) => {
      console.log('e.target.result', e.target.result);
      setResFile(e.target.result);
    };
  };
  const handleRoomChange = async (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = (e) => {
      console.log('e.target.result', e.target.result);
      setRoomFile(e.target.result);
    };
  };

  const handleSubmission = async (event) => {
    event.preventDefault();

    if (resfile.length > 1) {
      console.log('1');
      await fetch('/reservations/insert/reservation_list', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: resfile,
      });
    }

    if (roomfile.length > 1) {
      await fetch('/rooms/insert/room_list', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: roomfile,
      });
    }
  };

  return (
    <form onSubmit={handleSubmission}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div>
              <label className="file"> upload reservations file :</label>
              <input
                type="file"
                id="file"
                name="resfile"
                onChange={handleResChange}
              />
              <label> upload rooms file :</label>
              <input type="file" name="roomfile" onChange={handleRoomChange} />
              <div>
                <button>Submit</button>
              </div>
            </div>
          </Box>
        </Container>
      </ThemeProvider>
    </form>
  );
}