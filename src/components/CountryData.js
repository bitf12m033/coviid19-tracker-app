import React,{useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '48%',
      height: theme.spacing(16),
    },
  },
}));

const useStylesTypography = makeStyles({
    root: {
      width: '100%',
      maxWidth: 500,
    },
  });

export default function CountryData({country}) {
  const classes = useStyles();
  const classTypography = useStylesTypography();
  const [countryName, setCountryName] = useState(country)
  const [CountryData, setCountryData] = useState([])
  const [dataLoading, setdataLoading] = useState(false) 
  useEffect(() => {
    if (country !== countryName) {
      setCountryName(country);
    }
  }, [country,countryName]);

  useEffect(() => {
      async function fetchCountryData(){
          setdataLoading(true);
          const apiResponse = await fetch('https://api.thevirustracker.com/free-api?countryTotal='+countryName);
          const dataFromApi = await apiResponse.json();
          setCountryData(dataFromApi);
          setdataLoading(false);
      }
      fetchCountryData();
  }, [countryName])

  const loading = 'Loading...';
  if(dataLoading)
  {
    return (
        <div className={classes.root}>
            <Paper elevation={3}>
                <div className={classTypography.root}>
                    <Typography variant="h4" gutterBottom style={{color:'black'}}>
                        {loading}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom style={{color:'black'}}>
                        Global Data as of Today
                    </Typography>
               </div>
            </Paper>
            <Paper elevation={3}>
            <div className={classTypography.root}>
                    <Typography variant="h4" gutterBottom style={{color:'orange'}}>
                    {loading}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom style={{color:'orange'}}>
                        Active
                    </Typography>
               </div>
            </Paper>
            <Paper elevation={3}>
            <div className={classTypography.root}>
                    <Typography variant="h4" gutterBottom style={{color:'green'}} >
                    {loading}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom style={{color:'green'}}> 
                        Recovered
                    </Typography>
               </div>
            </Paper>
            <Paper elevation={3}>
            <div className={classTypography.root}>
                    <Typography variant="h4" gutterBottom style={{color:'red'}}>
                    {loading}   
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom style={{color:'red'}}>
                        Fataleties
                    </Typography>
               </div>
            </Paper>
            
        </div>
      );
  }
  else
  {

      return (
        <div className={classes.root}>
            <Paper elevation={3}>
                <div className={classTypography.root}>
                    <Typography variant="h4" gutterBottom style={{color:'black'}}>
                        
                        <NumberFormat value={CountryData && CountryData.countrydata && CountryData.countrydata[0].total_cases} displayType={'text'} thousandSeparator={true} prefix={''} />

                    </Typography>
                    <Typography variant="subtitle2" gutterBottom style={{color:'black'}}>
                        Global Data as of Today
                    </Typography>
               </div>
            </Paper>
            <Paper elevation={3}>
            <div className={classTypography.root}>
                    <Typography variant="h4" gutterBottom style={{color:'orange'}}>
                    <NumberFormat value={CountryData&& CountryData.countrydata && CountryData.countrydata[0].total_active_cases} displayType={'text'} thousandSeparator={true} prefix={''} />

                    </Typography>
                    <Typography variant="subtitle2" gutterBottom style={{color:'orange'}}>
                        Active
                    </Typography>
               </div>
            </Paper>
            <Paper elevation={3}>
            <div className={classTypography.root}>
                    <Typography variant="h4" gutterBottom style={{color:'green'}} >
                    <NumberFormat value={CountryData && CountryData.countrydata && CountryData.countrydata[0].total_recovered} displayType={'text'} thousandSeparator={true} prefix={''} />

                    </Typography>
                    <Typography variant="subtitle2" gutterBottom style={{color:'green'}}> 
                        Recovered
                    </Typography>
               </div>
            </Paper>
            <Paper elevation={3}>
            <div className={classTypography.root}>
                    <Typography variant="h4" gutterBottom style={{color:'red'}}>
                    <NumberFormat value={CountryData && CountryData.countrydata && CountryData.countrydata[0].total_deaths} displayType={'text'} thousandSeparator={true} prefix={''} />

                    </Typography>
                    <Typography variant="subtitle2" gutterBottom style={{color:'red'}}>
                        Fataleties
                    </Typography>
               </div>
            </Paper>
            
        </div>
      );
  }
}
