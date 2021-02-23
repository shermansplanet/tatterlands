import React from "react";
import "firebase/auth";
import "firebase/firestore";
import app from "firebase/app";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="header">
        Welcome, {this.props.user.name}
        <button onClick={() => app.auth().signOut()}>Sign Out</button>
        <button
          onClick={() =>
            app
              .firestore()
              .collection("users")
              .doc(app.auth().currentUser.uid)
              .delete()
          }
        >
          Reset Player
        </button>
      </div>
    );
  }
}
