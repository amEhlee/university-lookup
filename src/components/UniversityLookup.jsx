import React, { useState, useEffect } from "react";
import {
  Card,
  InputLabel,
  MenuItem,
  FormControl,
  TableCell,
  Table,
  TableRow,
  TableHead,
  TableBody,
} from "@mui/material";
import Select from "@mui/material/Select";
import axios from "axios";

export default function UniversityLookup() {
  const [country, setCountry] = React.useState("");
  const [countryList, setCountryList] = useState([]);
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    const countryListSource =
      "https://countriesnow.space/api/v0.1/countries/info?returns=none/";

    axios
      .get(countryListSource)
      .then((res) => {
        setCountryList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (country !== "") {
      const getUniSource = `http://universities.hipolabs.com/search?country=${country}/`;

      axios
        .get(getUniSource)
        .then((res) => {
          if (res.data.length === 0) {
            setEntities([{ "state-province": "No Entires Found" }]);
          } else {
            setEntities(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [country]);

  return (
    <div className="mt-20 lg:mx-44 text-center ">
      <Card className="mx-4 p-4 shadow-lg">
        <h2 className="text-center py-8">University Lookup</h2>
        <FormControl fullWidth>
          <InputLabel>Country</InputLabel>
          <Select
            value={country}
            label="country"
            className="hover:border-rose-500"
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          >
            {countryList.map((i) => (
              <MenuItem key={i.name} value={i.name}>
                {i.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="flex flex-col mt-10 border-borderGray hover:border-blue-600 duration-200 border-[1px] rounded-lg max-h-[500px] overflow-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Country</TableCell>
                <TableCell align="center">State / Province</TableCell>
                <TableCell align="center">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="whitespace-pre-wrap ">
              {entities.map((i) => (
                <TableRow key={i.name}>
                  <TableCell align="center">{i.country}</TableCell>
                  <TableCell align="center">
                    {i["state-province"] || " None Given "}
                  </TableCell>
                  <TableCell align="center">{i.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
