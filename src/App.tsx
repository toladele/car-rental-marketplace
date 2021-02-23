import * as React from "react";
import axios from "axios";
import { Row, Col } from "react-simple-flex-grid";
import {Helmet} from 'react-helmet';
import "react-simple-flex-grid/lib/main.css";
import styled, { ThemeConsumer } from "styled-components";
import Deezer from "/images/deezer-logo.png";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';

const HeaderContainer = styled.div`
  width: 100%;
  padding-bottom: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 20vw;
`;

const CarInfo = styled.div`
font-size: 1.5em;
`

const styles = {
  header: {
    boxShadow: "1px 2px 4px 2px grey",
  },
  paper: {
    backgroundColor: "transparent" as const, 
    verticalAlign: "middle" as const,
    textAlign: "center" as const,
    margin: 1 as const,
    width: "15vw" as const,
    border: "solid 3px" as const,
    borderImage: "linear-gradient(to right, #d05d29, #831869, #514384) 1 100%" as const,
    borderImageSlice: 1 as const,
    boxShadow: "1px 3px 1px grey" as const,
  },  
  column: {
    paddingTop: "5vh" as const,
  },
  picture: {
    marginTop: "5vh" as const,
    borderRadius: "15px" as const,
    boxShadow: "1px 3px 1px grey",
  },
  bookButton: {
    marginTop: "2vh" as const,
    marginBottom: "1vh" as const,
    fontWeight: "bold" as const,
    border: "solid 3px #831869",
    fontColor: "#831869" as const,
    color: "#514384" as const,
    boxShadow: "1px 2px 1px grey",
  },
  carCatalog: {
    marginLeft: "5vw",
  }
};

export default class App extends React.Component {
  state = {
    cars: [],
  };

  componentDidMount() {
    axios.get("/cars.json").then((response) => {
      this.setState({ cars: response.data });
    });
  }

  CarCatalog = () => {
    const { cars } = this.state;
    return (
      <>
          {cars.map((car) => (
            <Col span={3} style= {styles.column}>
              <Paper style={styles.paper}>
                      <img src={`${car.picturePath}`} width="80%" style= {styles.picture} /> <br />
                      <h1>{car.brand} {car.model}</h1>
                      <CarInfo><b>${car.pricePerDay}</b>/day</CarInfo>
                      <CarInfo><b>${car.pricePerKm}</b>/km</CarInfo>
                      <Button variant="outlined" color="secondary" style= {styles.bookButton} size= "large">
                       BOOK
                        </Button>
              </Paper>
            </Col>
          ))}
      </>
    );
  };

  render() {
    const { cars } = this.state;
    return (
      <>
        <Helmet>
          <style>{'body { background-color: #fafafa; }'}</style>
        </Helmet>
        <div style={styles.header}>
          <HeaderContainer>
            <Logo src={Deezer} />
          </HeaderContainer>
        </div>
        <div style={styles.carCatalog}>
          <Row gutter={30}>
            <this.CarCatalog />
          </Row>
        </div>
      </>
    );
  }
}
