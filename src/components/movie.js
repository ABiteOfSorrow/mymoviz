import React from 'react';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardImg, CardBody, CardText, Button, Col, ButtonGroup, Badge} from 'reactstrap';
import { faHeart, faVideo, faStar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function Movie(props) {
  
  //Moive Like Button
  const [isMovieLike, setIsMovieLike] = useState(false);

  if(isMovieLike){
    var colorLike = {cursor:'pointer', color: '#e74c3c'};
  } else {
    var colorLike = {cursor:'pointer'};
  }


  //Moive Watch Button
  const [watchMovie, setWatchMovie] = useState(0);
  const [isWatchMovie, setIsWatchMovie] = useState(false);

  const watchClick = () => {
    setWatchMovie(watchMovie+1);
    setIsWatchMovie(true)
  }


  //Moive rating Button
const [value, setValue] = useState(0);

const ratingPlus = () => {
  setValue(value+1)
  if(value >= 10){setValue(10)}
}

const ratingMinus = () => {
  setValue(value-1)
  if(value <= 0){setValue(0)}
}


  //Moive rating stars
  var tabMyRating = [];
  for(var i=0; i<10; i++){
    var color={cursor:'pointer'}
    if (i < value){
    color = {cursor:'pointer', color:'#f1c40f'}
   }
  //Moive rating stars click count
   let count = i+1
   tabMyRating.push(<FontAwesomeIcon onClick={() => setValue(count)} style={color} icon={faStar} />)
}
   

  //Moive rating stars average and voter count
  var totalNote = props.globalRating * props.globalCountRating;
      var totalVote = props.globalCountRating;
      if(value){
        totalNote += value;
        totalVote += 1
      }
  //Moive rating stars average math Round 
  var avgTotal = Math.round(totalNote / totalVote)

  var tabGlobalRating = []

  //Moive rating stars display
for(var i=0; i<10; i++){
  var color = {}
  if(i<avgTotal){
    color = {color : '#f1c40f'}
    console.log(avgTotal, value)
  }
  tabGlobalRating.push(<FontAwesomeIcon style={color} icon={faStar} />)
}



  //Moive.js content
    return(
  <Col xs="12" lg="6" xl="4">
    <Card style={{margintBottom:30}}>
    <CardImg
      alt={props.movieName}
      src={props.movieImg}
    />
    <CardBody>
      <CardText>
      <p>LIKE <FontAwesomeIcon onClick={()=>setIsMovieLike(!isMovieLike)} style={colorLike} icon={faHeart} /> <Badge color="secondary" ></Badge></p>
      <p>NOMBRE DE VUE <FontAwesomeIcon onClick={()=>watchClick()} style={{color: isWatchMovie ? '#e74c3c' : 'secondary'}} icon={faVideo} /> <Badge color="secondary" >{watchMovie}</Badge></p>
      <p>Mon Avis
       {/* {myRatings} */}
       {tabMyRating}
       <ButtonGroup size='sm'>
         <Button onClick={()=>ratingMinus()} color="secondary">-1</Button>
         <Button onClick={()=>ratingPlus()} color="secondary">+1</Button>
         </ButtonGroup>
         </p>
      <p>Moyenne
        {tabGlobalRating}
        ({totalVote})</p>
      <p>{props.movieName}</p>
      <p>{props.movieDesc}</p> 
      </CardText>
    </CardBody>
  </Card>
</Col>
  )
}





export default Movie;