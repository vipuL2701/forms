import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addSubmittedUser } from "./actions";

const StepOneForm = ({ onNext }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be a positive number")
      .integer("Age must be an integer"),
    sex: Yup.string()
      .required("Sex is required")
      .oneOf(["Male", "Female"], "Invalid sex"),
    mobile: Yup.string()
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Invalid mobile number")
      .required("Mobile is required"),
    govtIdType: Yup.string().oneOf(
      ["Aadhar", "PAN"],
      "Invalid government ID type"
    ),
    govtId: Yup.string().when("govtIdType", {
      is: "Aadhar",
      then: Yup.string()
        .matches(/^[2-9]\d{11}$/, "Invalid Aadhar number")
        .required("Aadhar number is required"),
    }),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addSubmittedUser(data));
    onNext();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <TextField
        name="name"
        label="Name"
        inputRef={register}
        error={!!errors.name}
        helperText={errors.name?.message}
      /> */}
      <TextField
        name="name"
        label="Name"
        inputRef={register}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        name="age"
        label="Age"
        type="number"
        inputRef={register}
        error={!!errors.age}
        helperText={errors.age?.message}
      />
      <FormControl error={!!errors.sex}>
        <InputLabel id="sex-label">Sex</InputLabel>
        <Select
          labelId="sex-label"
          name="sex"
          inputRef={register}
          defaultValue=""
        >
          <MenuItem value="">Select Sex</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
        <FormHelperText>{errors.sex?.message}</FormHelperText>
      </FormControl>
      <TextField
        name="mobile"
        label="Mobile"
        inputRef={register}
        error={!!errors.mobile}
        helperText={errors.mobile?.message}
      />
      <FormControl error={!!errors.govtIdType}>
        <InputLabel id="govt-id-type-label">Govt Issued ID Type</InputLabel>
        <Select
          labelId="govt-id-type-label"
          name="govtIdType"
          inputRef={register}
          defaultValue=""
        >
          <MenuItem value="">Select ID Type</MenuItem>
          <MenuItem value="Aadhar">Aadhar</MenuItem>
          <MenuItem value="PAN">PAN</MenuItem>
        </Select>
        <FormHelperText>{errors.govtIdType?.message}</FormHelperText>
      </FormControl>
      {errors.govtIdType === "Aadhar" && (
        <TextField
          name="govtId"
          label="Aadhar Number"
          inputRef={register}
          error={!!errors.govtId}
          helperText={errors.govtId?.message}
        />
      )}
      <Button type="submit" variant="contained" color="primary">
        Next
      </Button>
    </form>
  );
};

export default StepOneForm;
