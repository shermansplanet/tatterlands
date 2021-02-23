import React from "react";
import "firebase/auth";
import Login from "./Login";
import Game from "./Game";
import app from "firebase/app";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    const firebaseConfig = {
      apiKey: "AIzaSyBl_fhPUPKEi-t5EVeaGSfXG2OPJow-yDY",
      authDomain: "tatterlands.firebaseapp.com",
      databaseURL: "https://tatterlands-default-rtdb.firebaseio.com",
      projectId: "tatterlands",
      storageBucket: "tatterlands.appspot.com",
      messagingSenderId: "880721927970",
      appId: "1:880721927970:web:ac50b52a47f8fc2757cf7b"
    };
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
    this.state = {
      authUser: null,
      loading: true
    };
    this.auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        this.setState({ authUser, loading: false });
      } else {
        this.setState({ authUser: null, loading: false });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return "Loading...";
    }
    if (this.state.authUser !== null) {
      return <Game />;
    }
    return <Login />;
  }
}
