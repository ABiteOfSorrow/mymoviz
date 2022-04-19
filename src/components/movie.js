import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardImg, CardBody, CardText, Button, Col, ButtonGroup, Badge} from 'reactstrap';
import { faHeart, faVideo, faStar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Movie(props) {

var tabGlobalRating = [];
for(var i=0; i<10; i++){
  var color = {}
  if(i<props.globalRating){
    color = {color : '#f1c40f'}
  }
  tabGlobalRating.push(<FontAwesomeIcon style={color} icon={faStar} />)
}

    return(
  <Col xs="12" lg="6" xl="4">
    <Card style={{margintBottom:30}}>
    <CardImg
      alt={props.movieName}
      src={props.movieImg}
      width="100"
    />
    <CardBody>
      <CardText>
      <p>LIKE <FontAwesomeIcon style={{cursor:'pointer'}} icon={faHeart} /></p>
      <p>NOMBRE DE VUE <FontAwesomeIcon icon={faVideo} /> <Badge color="secondary">2</Badge></p>
      <p>Mon Avis
      <FontAwesomeIcon icon={faStar}/> 
      <FontAwesomeIcon icon={faStar}/> 
      <FontAwesomeIcon icon={faStar}/> 
      <FontAwesomeIcon icon={faStar}/> 
      <FontAwesomeIcon icon={faStar}/> 
      <FontAwesomeIcon icon={faStar}/> 
      <FontAwesomeIcon icon={faStar}/> 
      <FontAwesomeIcon icon={faStar}/> 
      <FontAwesomeIcon icon={faStar}/> 
      <FontAwesomeIcon icon={faStar}/> 
      
       <ButtonGroup size='sm'>
         <Button color="secondary">-</Button>
         <Button color="secondary">+</Button>
         </ButtonGroup>
         </p>
      <p>Moyenne
        {tabGlobalRating}
        ({props.globalCountRating})</p>
      <p>{props.movieName}</p>
      <p>{props.movieDesc}</p> 
      </CardText>
    </CardBody>
  </Card>
</Col>
  )
}

export default Movie;