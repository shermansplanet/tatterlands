import React from "react";
import app from "firebase/app";
import NewUser from "./NewUser";
import Header from "./Header";
import CharacterList from "./CharacterList";
import CharacterView from "./CharacterView";
import "firebase/auth";
import "firebase/firestore";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, showCharacter: false };
    this.auth = app.auth();
    this.db = app.firestore();
    this.userRef = this.db.collection("users").doc(this.auth.currentUser.uid);
    this.unsubscribe = this.userRef.onSnapshot(async doc => {
      if (doc.exists) {
        this.setState({
          userData: doc.data(),
          newUser: false,
          loading: false
        });
      } else {
        this.setState({ loading: false, newUser: true });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  goToCharacter = id => {
    this.setState({ showCharacter: id });
  };

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (this.state.newUser) {
      return <NewUser onSubmit={data => this.userRef.set(data)} />;
    }

    let content = this.state.showCharacter ? (
      <CharacterView
        exit={() => this.setState({ showCharacter: false })}
        characterId={this.state.showCharacter}
      />
    ) : (
      <CharacterList showCharacter={this.goToCharacter} />
    );

    return (
      <div>
        <Header user={this.state.userData} />
        {content}
      </div>
    );
  }
}
