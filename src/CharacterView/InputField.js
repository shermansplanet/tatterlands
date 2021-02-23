import React from "react";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value, editing: false };
    this.db = app.firestore();
  }

  onConfirm = () => {
    let update = {};
    update[this.props.keyId] = this.state.value;
    this.props.docRef.update(update);
    this.setState({ editing: false });
  };

  render() {
    if (!this.state.editing) {
      return (
        <div>
          <button onClick={() => this.setState({ editing: true })}>
            {this.state.value || this.props.defaultValue}
          </button>
        </div>
      );
    }

    return (
      <div>
        <div
          style={{
            position: "fixed",
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            backgroundColor: "#fff5",
            zIndex: 1
          }}
          onClick={this.onConfirm}
        />
        <input
          style={{ position: "relative", zIndex: 2 }}
          ref={ref => ref?.focus()}
          placeholder={this.props.defaultValue}
          value={this.state.value}
          onChange={e =>
            this.setState({ value: e.target.value.replace(/[^a-z0-9 ]/gi, "") })
          }
          onKeyUp={e => {
            if (e.key === "Enter" || e.keyCode === 13) {
              this.onConfirm();
            }
          }}
        />
      </div>
    );
  }
}
