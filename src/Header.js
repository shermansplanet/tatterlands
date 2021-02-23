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
      <div
        style={{
          display: "flex",
          backgroundColor: "#ccc",
          padding: "10px",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        Welcome, {this.props.user.name}
        <div>
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
      </div>
    );
  }
}
