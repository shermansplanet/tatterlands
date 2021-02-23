import React from "react";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default class CharacterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.auth = app.auth();
    this.db = app.firestore();
    this.userRef = this.db.collection("characters").doc(this.props.characterId);
    this.unsubscribe = this.userRef.onSnapshot(async doc => {
      this.setState({
        characterData: doc.data(),
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <button onClick={this.props.exit}>Back</button>
        {this.state.characterData.name || "Unnamed"}
      </div>
    );
  }
}
