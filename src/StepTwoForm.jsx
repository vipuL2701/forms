import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addSubmittedUser } from './actions';


const StepTwoForm = ({ onBack, onSubmit }) => {
  const [countries, setCountries] = useState([]);
  const validationSchema = Yup.object().shape({
    address: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    country: Yup.string().required('Country is required'),
    pincode: Yup.string().matches(/^\d+$/, 'Pincode must be numeric').nullable(),
  });

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();
  const handleFormSubmit = (data) => {
    dispatch(addSubmittedUser(data)); 
  
  };


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = (event) => {
    setValue('country', event.target.value);
  };

  const handleFinish = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFinish)}>
      <TextField name="address" label="Address" inputRef={register} error={!!errors.address} helperText={errors.address?.message} />
      <TextField name="state" label="State" inputRef={register} error={!!errors.state} helperText={errors.state?.message} />
      <TextField name="city" label="City" inputRef={register} error={!!errors.city} helperText={errors.city?.message} />
      <FormControl error={!!errors.country}>
        <InputLabel id="country-label">Country</InputLabel>
        <Select
          labelId="country-label"
          name="country"
          onChange={handleCountryChange}
          defaultValue=""
        >
          <MenuItem value="">Select Country</MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.name.common} value={country.name.common}>
              {country.name.common}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.country?.message}</FormHelperText>
      </FormControl>
      <TextField name="pincode" label="Pincode" inputRef={register} error={!!errors.pincode} helperText={errors.pincode?.message} />
      <Button onClick={onBack} variant="contained">Back</Button>
      <Button type="submit" variant="contained" color="primary">Finish</Button>
    </form>
  );
};

export default StepTwoForm;
