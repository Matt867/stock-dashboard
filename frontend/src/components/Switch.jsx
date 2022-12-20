import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function ControlledSwitches({setParent}) {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(event.target.checked)
    setParent(event.target.checked)
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}