import React from "react";
import { Controller, useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
//radio button
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
//ant
import { Button } from "antd";
//datepicker
// import DatePicker from "react-multi-date-picker";
// import ReactDatePicker from "react-datepicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
//data
import nationJson from "../storage/nation.json";

export default function User_form() {
  //title state
  const [title, setTitle] = React.useState("");
  //date state
  //   const [date, setDate] = React.useState("");
  //nation state
  const [nation, setNation] = React.useState("");
  //Hook form
  const { register, handleSubmit, control } = useForm();
  //gender state
  const [gender, setGender] = React.useState("");
  //mobile state
  const [mobileCode, setMobileCode] = React.useState("");
  var [mobilePhone, setMobilePhone] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  //citizenship state
  //   const [citizenship, setCitizenship] = React.useState("");
  //จัดการกับTitleเวลามีการเลือก
  const handleTitleChange = (event) => {
    // console.log(event.target.value);
    setTitle(event.target.value);
  };
  //Handle mobile phone
  const handleMobileCodeChange = (event) => {
    // console.log(event.target.value);
    setMobileCode(event.target.value);
  };
  const handleMobilePhoneChange = (event) => {
    // console.log(event.target.value);
    setMobilePhone(event.target.value);
    setMobile(mobileCode + mobilePhone);
  };

  //set nation data from json
  const nationData = nationJson;
  //   console.log(nationData);
  //handle input change style
  const ValidationTextField = styled(TextField)({
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  });

  //handle submit
  const onSubmit = (data) => {
    console.log(data);
    //setItem on LocalStorage
    localStorage.setItem("info", JSON.stringify(data));
  };

  //register onChange
  const registerTitleChange = register("title", { required: true });
  //   console.log(handleTitleChange);
  const registerNationChange = register("nation", { required: true });
  //   const registerDateChange = register("date", { required: true });
  const registerGender = register("gender");
  const registerMobile = register("mobile", { required: true });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ display: "flex" }}
        >
          <Grid item xs={1}>
            <p>Title:</p>
          </Grid>
          <Grid item xs={1.5}>
            <FormControl fullWidth>
              <Select
                required
                size="small"
                value={title}
                {...registerTitleChange}
                onChange={(e) => {
                  setTitle(e.target.value);
                  registerTitleChange.onChange(e);
                  handleTitleChange(e);
                }}
              >
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
                <MenuItem value="Ms">Ms</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <p>First Name:</p>
          </Grid>
          <Grid item xs={2.5}>
            <ValidationTextField
              required
              variant="outlined"
              id="firstName"
              size="small"
              {...register("firstName", { required: true })}
            ></ValidationTextField>
          </Grid>
          <Grid item xs={2}>
            <p>Last Name:</p>
          </Grid>
          <Grid item xs={2.5}>
            <ValidationTextField
              required
              variant="outlined"
              id="lastName"
              size="small"
              {...register("lastName", { required: true })}
            ></ValidationTextField>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ display: "flex" }}
        ></Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ display: "flex" }}
        >
          <Grid item xs={3}>
            <p>BirthDate:</p>
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={control}
              name="date"
              rules={{ required: true }}
              render={({ field: { onChange, name, value } }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    onChange={onChange}
                    value={value}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <p>Nationality:</p>
          </Grid>
          <Grid item xs={3}>
            <Select
              required
              size="small"
              value={nation}
              {...registerNationChange}
              onChange={(e) => {
                setNation(e.target.value);
                registerNationChange.onChange(e);
              }}
            >
              {nationData.map((nation) => (
                <MenuItem key={nation.name} value={nation.name}>
                  {nation.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "center" }}
          direction="row"
        >
          <Grid item xs={3}>
            <p>CitizenID:</p>
          </Grid>
          <Grid item xs={9}>
            <TextField
              size="small"
              maxLength={13}
              id="citizenID"
              type={"number"}
              required
              {...register("citizenID", { required: true })}
            ></TextField>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          direction="row"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item xs={3}>
            <p>Gender:</p>
          </Grid>
          <Grid item xs={9}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={gender}
                {...registerGender}
                onChange={(e) => {
                  console.log(e.target.value);
                  setGender(e.target.value);
                  registerGender.onChange(e);
                }}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="unisex"
                  control={<Radio />}
                  label="Unisex"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={1} direction="row" justifyContent="center">
          <Grid item xs={4}>
            <p>Mobile Phone:</p>
          </Grid>
          <Grid item xs={3}>
            <Select
              required
              size="small"
              value={mobileCode}
              onChange={(e) => {
                // setMobileCode(e.target.value);
                handleMobileCodeChange(e);
              }}
            >
              {nationData.map((nation) => (
                <MenuItem key={nation.code} value={nation.code}>
                  {nation.code}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={1}>
            <p>-</p>
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 12);
              }}
              id="mobilePhone"
              type={"number"}
              value={mobilePhone}
              required
              {...registerMobile}
              onChange={(e) => {
                // setMobilePhone(e.target.value);
                handleMobilePhoneChange(e);
                // mobilePhone = mobileCode + e.target.value;
                // console.log(mobilePhone);
                registerMobile.onChange(e);
              }}

              //   {...register("mobile", { required: true })}
            ></TextField>
          </Grid>
        </Grid>
        <Grid container spacing={1} direction="row" justifyContent="center">
          <Grid item xs={4}>
            <p>Passport No:</p>
          </Grid>
          <Grid item xs={8}>
            <TextField
              size="small"
              type={"number"}
              defaultValue=""
              id="passport"
              {...register("passport")}
            ></TextField>
          </Grid>
        </Grid>
        <Grid container spacing={1} direction="row" justifyContent="center">
          <Grid item xs={3}>
            <p>Expected Salary:</p>
          </Grid>
          <Grid item xs={5}>
            <TextField
              size="small"
              type={"number"}
              defaultValue=""
              id="salary"
              {...register("salary")}
            ></TextField>
          </Grid>
          <Grid item xs={1}>
            <p>THB</p>
          </Grid>
          <Grid item xs={3}>
            <Button color="blue" htmlType="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
