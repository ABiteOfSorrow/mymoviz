import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Col,
  ButtonGroup,
  Badge,
} from "reactstrap";
import { faHeart, faVideo, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Movie(props) {
  const [watchMovie, setWatchMovie] = useState(0);
  const [isWatchMovie, setIsWatchMovie] = useState(false);
  const [value, setValue] = useState(0);

  var colorLike = {};


  //Receive condition
  var handleClick = (name, img) => {
    if (props.movieSee == true) {
      props.handleClickDeleteMovieParent(name);
    } else {
      props.handleClickparent(name, img);
    }
  };

  //Moive Watch Button
  const watchClick = () => {
    setWatchMovie(watchMovie + 1);
    setIsWatchMovie(true);
  };

  //Moive rating Button
  const ratingPlus = () => {
    setValue(value + 1);
    if (value >= 10) {
      setValue(10);
    }
  };

  const ratingMinus = () => {
    setValue(value - 1);
    if (value <= 0) {
      setValue(0);
    }
  };

  //Moive rating stars
  var tabMyRating = [];
  for (var i = 0; i < 10; i++) {
    var color = { cursor: "pointer" };
    if (i < value) {
      color = { cursor: "pointer", color: "#f1c40f" };
    }
    //Moive rating stars click count
    let count = i + 1;
    tabMyRating.push(
      <FontAwesomeIcon
        onClick={() => setValue(count)}
        style={color}
        icon={faStar}
      />
    );
  }

  //Moive rating stars average and voter count
  var totalNote = props.globalRating * props.globalCountRating;
  var totalVote = props.globalCountRating;
  if (value) {
    totalNote += value;
    totalVote += 1;
  }
  //Moive rating stars average math Round
  var avgTotal = Math.round(totalNote / totalVote);

  var tabGlobalRating = [];

  //Moive rating stars display
  for (var i = 0; i < 10; i++) {
    var color = {};
    if (i < avgTotal) {
      color = { color: "#f1c40f" };
    }
    tabGlobalRating.push(<FontAwesomeIcon style={color} icon={faStar} />);
  }

  if (props.movieSee) {
    colorLike = { cursor: "pointer", color: "#e74c3c" };
  } else {
    colorLike = { cursor: "pointer" };
  }




  //Moive.js content
  return (
    <Col xs="12" lg="6" xl="4">
      <Card style={{ margintBottom: 30 }}>
        <CardImg alt={props.movieName} src={props.movieImg} />
        <CardBody>
        <CardTitle tag="h5">
        {props.movieName}
      </CardTitle>
          <CardText>
            <p>
              LIKE{" "}
              <FontAwesomeIcon
                onClick={() => {
                  handleClick(props.movieName, props.movieImg);
                }}
                style={colorLike}
                icon={faHeart}
              />{" "}
              <Badge color="secondary"></Badge>
            </p>
            <p>
              NOMBRE DE VUE{" "}
              <FontAwesomeIcon
                onClick={() => watchClick()}
                style={{ color: isWatchMovie ? "#e74c3c" : "secondary" }}
                icon={faVideo}
              />{" "}
              <Badge color="secondary">{watchMovie}</Badge>
            </p>
            <p>
              Mon Avis
              {/* {myRatings} */}
              {tabMyRating}
              <ButtonGroup size="sm">
                <Button onClick={() => ratingMinus()} color="secondary">
                  -1
                </Button>
                <Button onClick={() => ratingPlus()} color="secondary">
                  +1
                </Button>
              </ButtonGroup>
            </p>
            <p>
              Moyenne
              {tabGlobalRating}({totalVote})
            </p>
            <p>{props.movieDesc}</p>
          </CardText>
        </CardBody>
      </Card>
    </Col>
  );
}

export default Movie;
