import React from "react";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default class CharacterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, deleting: false };
    this.auth = app.auth();
    this.db = app.firestore();
    this.refresh();
  }

  refresh = () => {
    this.db
      .collection("characters")
      .where("player", "==", this.auth.currentUser.uid)
      .get()
      .then(querySnapshot => {
        let characters = [];
        querySnapshot.forEach(doc => {
          characters.push({ ...doc.data(), id: doc.id });
        });
        this.setState({
          loading: false,
          deleting: false,
          characters
        });
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      });
  };

  makeNewCharacter = async () => {
    let ref = await this.db.collection("characters").add({
      player: this.auth.currentUser.uid,
      name: ""
    });
    this.props.showCharacter(ref.id);
  };

  deleteCharacter = async () => {
    await this.db
      .collection("characters")
      .doc(this.state.deleting.id)
      .delete();
    this.refresh();
  };

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (this.state.deleting) {
      return (
        <div>
          <div>Are you sure you want to delete {this.state.deleting.name}?</div>
          <button onClick={() => this.setState({ deleting: false })}>No</button>
          <button onClick={this.deleteCharacter}>Yes</button>
        </div>
      );
    }

    return (
      <div>
        <div>Your Characters:</div>
        {this.state.characters.map((c, i) => (
          <div key={i}>
            <button onClick={() => this.props.showCharacter(c.id)}>
              {c.name || "Unnamed"}
            </button>
            <button onClick={() => this.setState({ deleting: c })}>x</button>
          </div>
        ))}
        <button onClick={this.makeNewCharacter}>New Character</button>
      </div>
    );
  }
}
