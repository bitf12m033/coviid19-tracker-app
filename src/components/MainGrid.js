import React , {useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { NativeSelect, FormControl } from "@material-ui/core";

// import components
import GlobalData from './GlobalData'
import CountryData from './CountryData'
import Chart from './Chart'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


// const [dataLoading, setdataLoading] = useState(false) 
/*useEffect(() => {
  const fetchAPI = async () => {
    const apiResponse = await fetch('https://covid19.mathdro.id/api/countries');
    const countryRes = await apiResponse.json();
    console.log(countryRes)
    setFetchedCountries(countryRes);
  };
  fetchAPI();
}, [setFetchedCountries]);
*/



export default function MainGrid() {

  const [selectCountry, setSelectCountry] = useState('US');



  const handleCountryChange = async (country) => {
    console.log('Main-'+country);
    setSelectCountry(country);
  }

  const [fetchedCountries, setFetchedCountries] = useState([]);
  useEffect(() => {
    async function fetchAPI(){
      const apiResponse = await fetch('https://covid19.mathdro.id/api/countries');
      const countryRes = await apiResponse.json();
      setFetchedCountries(countryRes.countries.map((country) => [country.name,country.iso2] ));
  }
  fetchAPI();
  
  }, [setFetchedCountries]);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
       
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <GlobalData />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>

            <FormControl className='form-control'>
              <NativeSelect
                
                value={selectCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
              >
                {fetchedCountries.map((country, key) => (

                  <option key={key} value={country[1]}>
                    {country[0]}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
            </Paper>
          <Paper className={classes.paper}>
            <CountryData country={selectCountry} />
          </Paper>
          <Chart country = {selectCountry} />
        </Grid>
        
      </Grid>
    </div>
  );
}
