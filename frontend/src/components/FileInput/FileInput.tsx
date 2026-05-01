import {Grid, IconButton, TextField} from "@mui/material";
import {useRef, useState} from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

interface Props {
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({name, label, onChange}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;

    if (files && files[0]) {
      setFileName(files[0].name);
    } else {
      setFileName('');
    }

    onChange(e);
  }

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  return (
    <>
      <input
        style={{display: "none"}}
        type="file"
        onChange={onChangeFile}
        ref={inputRef}
        name={name}
      />
      <Grid sx={{display: "flex", alignItems: "center", gap: 3}}>
        <Grid>
          <TextField
            disabled
            label={label}
            value={fileName}
            onClick={activateInput}
          />
        </Grid>
        <Grid>

          <IconButton
            color="primary"
            aria-label="close modal"
            onClick={activateInput}
          >
            <AddAPhotoIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;