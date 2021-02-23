import React from "react";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import InputField from "./InputField";

export default class CharacterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.auth = app.auth();
    this.db = app.firestore();
    this.characterRef = this.db
      .collection("characters")
      .doc(this.props.characterId);
    this.unsubscribe = this.characterRef.onSnapshot(async doc => {
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
        <InputField
          keyId="name"
          docRef={this.characterRef}
          value={this.state.characterData.name}
          defaultValue="Name"
        />
      </div>
    );
  }
}
