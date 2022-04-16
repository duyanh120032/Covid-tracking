import axios from "axios";
import { BaseURl } from "./Constants.js";

export const getCountries = async () => {
  const res = await axios.get(`${BaseURl}/countries`);
  return res.data;
};
export const getSummary = async () => {
  const res = await axios.get(`${BaseURl}/summary`, {
    headers: {
      "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
    },
  });
  return res.data;
};
export const getPremiumSummary = async () => {
  const res = await axios.get(`${BaseURl}/premium/summary`, {
    headers: {
      "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
    },
  });
  return res.data;
};
export const getReportByCountry = async (country) => {
  const res = await axios.get(`${BaseURl}/dayone/country/${country}`);
  // const res = axios.get("https://api.covid19api.com/premium/country/south-africa");
  return res.data;
};
export const getCountry = async (country) => {
  const res = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
  return res.data;
};
export const getCountryData = async (country) => {
  const res = await axios.get(`${BaseURl}/premium/country/data/${country}`, {
    headers: {
      "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
    },
  });
  return res.data;
};
export const getConfirmedCases = async (country) => {
  const res1 = await axios.get(
    `${BaseURl}/total/country/${country}/status/confirmed?from=2022-01-01T00:00:00Z&to=2022-02-01T00:00:00Z`,
    {
      headers: {
        "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
      },
    }
  );

  const res2 = await axios.get(
    `${BaseURl}/total/country/${country}/status/confirmed?from=2022-02-01T00:00:00Z&to=2022-03-01T00:00:00Z`,
    {
      headers: {
        "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
      },
    }
  );
  const res3 = await axios.get(
    `${BaseURl}/total/country/${country}/status/confirmed?from=2022-03-01T00:00:00Z&to=2022-04-01T00:00:00Z`,
    {
      headers: {
        "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
      },
    }
  );
  const res4 = await axios.get(
    `${BaseURl}/total/country/${country}/status/confirmed?from=2022-04-01T00:00:00Z&to=2022-05-01T00:00:00Z`,
    {
      headers: {
        "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
      },
    }
  );
  return [res1.data.length, res2.data.length, res3.data.length, res4.data.length];
};
