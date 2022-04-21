import React from 'react';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import{Nav, NavItem, NavLink, Button, Container, Row, PopoverHeader, PopoverBody, UncontrolledPopover, ListGroup, ListGroupItem} from 'reactstrap';
import Movie from './components/movie';


function App() {

  var movieData = [
  {name: "StarWars : L'ascension de SkyWalker", img: "./img/starwars.jpg", desc: "La conclusion de la saga SkyWalker. De nouvells légendes vont naître dans cette....", note: 6, vote: 8},
  {name: "Maléfique : Le pouvoir du mal", img: "./img/maleficent.jpg", desc: "Plusieur années après avoir découvert pourquoi la plus célèbre méchante Disney avait un coeur....", note: 9, vote: 4},
  {name: "Jumanji: The Next Level", img: "./img/jumanji.jpg", desc: "L'équipe est de retour, mais le jeu a changé. Alors qu'ils retournent dans Jumanji pour secourir....", note: 7, vote: 4},
  {name: "Once Upon a Time...in Hollywood", img: "./img/once_upon.jpg", desc: "En 1969, Rick Dalton-star déclinante d'une série télévisée de zestern-et Cliff Booth....", note: 3, vote: 8},
  {name: "La Reine des neiges 2", img: "./img/frozen.jpg", desc: "Elsa, Anna, Kristoff, Olaf et Sven voyagent bien au-delà des portes d'Arendelle à la recherche de réponses....", note: 9, vote: 8},
  {name: "Terminateur: Dark Fate", img: "./img/terminator.jpg", desc: "De nos jours à Mexico. Dani Ramos, 21 ans, travaille sur une chaîne de montage dans une usine automobile....", note: 7, vote: 5},
  {name: "Badboys 3 : Return to Bad Guys", img: "./img/badboy3.jpg", desc: "Les polices sont retourner...", note: 8, vote: 5}
]

const [moviesCount, setMoviesCount] = useState(0);
const [moviesWishList, setMoviesWishList] = useState([]);


var handleClickAddMovie = (name, img) => {
  setMoviesCount(moviesCount+1);
  setMoviesWishList([...moviesWishList, {name, img}]);
}

var handleClickDeleteMovie = (name) => {
  if(moviesCount <= 0){
    setMoviesCount(0)
  } else{
  setMoviesCount(moviesCount-1);

  setMoviesWishList( moviesWishList.filter( (e) => {return name !== e.name} ) )
}}

var movieList = movieData.map((movie,i) => {
 var result = moviesWishList.find(e => e.name == movie.name)
  var isSee = false
  if(result != undefined){
    isSee = true
  }
  return(<Movie key={i} movieSee={isSee} handleClickparent={handleClickAddMovie} handleClickDeleteMovieParent={handleClickDeleteMovie} movieName={movie.name} movieDesc={movie.desc} movieImg={movie.img} globalRating={movie.note} globalCountRating={movie.vote}/>)
})

var wishList = moviesWishList.map((movie,i) => {
  console.log(moviesWishList)
  return <ListGroupItem style={{cursor:'pointer'}} onClick={() => handleClickDeleteMovie(movie.name)} key={i}><img width="80" src={movie.img}></img> {movie.name}</ListGroupItem>
})

  return (
  <div style={{backgrounColor:"#232528"}}>
  <Container>

{/* Navigation Bar */}

    <Nav>
      <span className="navbar-brand">
      <img className="logo" alt="logo" src="/img/logo.png" width="30" height="30"/>
      </span>
      <NavItem>
         <NavLink style={{color:'white'}}>Last Realeses</NavLink>
      </NavItem>
      <NavItem>
         <NavLink><Button id="PopoverLegacy" type="button">{moviesCount} films</Button></NavLink>
      </NavItem>
    </Nav>

{/* content area */}

    <Row>
      {movieList}
    </Row>
    </Container>

 {/* wish List */}

    <UncontrolledPopover
    placement="bottom"
    target="PopoverLegacy"
    trigger="legacy"
  >
    <PopoverHeader>
      Wish List
    </PopoverHeader>
    <PopoverBody>
    <ListGroup>
    {wishList}
</ListGroup>
    </PopoverBody>
  </UncontrolledPopover>
    </div>
  );
}

export default App;
