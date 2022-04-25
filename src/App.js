import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  Container,
  Row,
  PopoverHeader,
  PopoverBody,
  UncontrolledPopover,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import Movie from "./components/movie";

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [moviesCount, setMoviesCount] = useState(0);
  const [moviesWishList, setMoviesWishList] = useState([]);

  useEffect(() => {
    //Fetch data movie List for main page
    async function loadData() {
      var rawResponse1 = await fetch("/new-movies");
      var response1 = await rawResponse1.json();
      setMoviesList(response1.newMovieList.results);
      //Fetch data for wishList
      var rawResponse2 = await fetch("/wishlist-movie");
      var response2 = await rawResponse2.json();
      setMoviesWishList(response2.wishList);
      setMoviesCount(response2.wishList.length);
    }
    loadData();
  }, []);

  var handleClickAddMovie = async (title, img) => {
    setMoviesCount(moviesCount + 1);
    setMoviesWishList([...moviesWishList, { title, img }]);
    await fetch("/wishList-addMovie", {
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "title=" + title + "&&img=" + img,
    });
  };

  var handleClickDeleteMovie = async (title) => {
    if (moviesCount <= 0) {
      setMoviesCount(0);
    } else {
      await fetch("/wishList-movie/" + title, {
        method: "delete",
      });
      setMoviesCount(moviesCount - 1);
      setMoviesWishList(
        moviesWishList.filter((e) => {
          return title !== e.title;
        })
      );
    }
  };

  var movieList = moviesList.map((movie, i) => {
    var result = moviesWishList.find((e) => e.title == movie.title);
    var isSee = false;
    if (result != undefined) {
      isSee = true;
    }
    if (movie.overview.length > 80) {
      movie.overview = movie.overview.substring(0, 80) + "...";
    }
    let imgUrl = "";
    if (movie.backdrop_path == null) {
      movie.backdrop_path = "/img/generique.jpg";
    } else {
      imgUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
    }

    return (
      <Movie
        key={i}
        movieSee={isSee}
        handleClickparent={handleClickAddMovie}
        handleClickDeleteMovieParent={handleClickDeleteMovie}
        movieName={movie.title}
        movieDesc={movie.overview}
        movieImg={imgUrl}
        globalRating={movie.vote_average}
        globalCountRating={movie.vote_count}
      />
    );
  });

  var wishList = moviesWishList.map((movie, i) => {
    return (
      <ListGroupItem
        style={{ cursor: "pointer" }}
        onClick={() => handleClickDeleteMovie(movie.title)}
        key={i}
      >
        <img width="80" src={movie.img}></img> {movie.title}
      </ListGroupItem>
    );
  });

  return (
    <div style={{ backgrounColor: "#232528" }}>
      <Container>
        {/* Navigation Bar */}

        <Nav>
          <span className="navbar-brand">
            <img
              className="logo"
              alt="logo"
              src="/img/logo.png"
              width="30"
              height="30"
            />
          </span>
          <NavItem>
            <NavLink style={{ color: "white" }}>Last Realeses</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Button id="PopoverLegacy" type="button">
                {moviesCount} films
              </Button>
            </NavLink>
          </NavItem>
        </Nav>

        {/* content area */}

        <Row>{movieList}</Row>
      </Container>

      {/* wish List */}

      <UncontrolledPopover
        placement="bottom"
        target="PopoverLegacy"
        trigger="legacy"
      >
        <PopoverHeader>Wish List</PopoverHeader>
        <PopoverBody>
          <ListGroup>{wishList}</ListGroup>
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
}

export default App;
