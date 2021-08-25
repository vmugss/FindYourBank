import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { BankTable } from './components/BankTable';
import { Container } from 'reactstrap';
import BankDetails from './components/BankDetails';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('MUMBAI');
  const [selectedRow, setSelectedRow] = useState({});

  useEffect(()=>{
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=${city.toUpperCase()}`);
         if (res.status !== 200){
           throw Error ('Could not fetch data');
         }
        setData(res.data);
        setError(null);
        setLoading(false);
      }
      catch(err){
        setLoading(false);
        setError(err.message);
      }
    }
    fetchData();
  },[city]);

  return (
    <Router>
      <div className="content">
        <Switch>
        <Route exact path="/"
          render={() => {
              return (
                <Redirect to="/all_banks" /> 
              )
          }
        }/>
          <Route path="/all_banks">
            <Container style={{marginTop: 35}}>
              <h2><strong>All Banks</strong></h2>
              { error && 
                    <div>{ error }</div>
                }
              { loading && 
                    <div id="cover-spin"></div>
                }
                
              { data && 
                <div style={{marginTop: 25}}>
                  <select class="inputElement" value={city} onChange={e=>{
                        setCity(e.target.value);
                    }}>
                        {['Mumbai', 'Kolkata', 'Bangalore', 'Delhi', 'Kochi'].map(city => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                  <BankTable data={data} setSelectedRow={setSelectedRow}  title="All Banks"/>
                </div>
                }
            </Container>
          </Route>
          <Route path="/bank_details/:ifsc_code">
              <BankDetails data={selectedRow}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

