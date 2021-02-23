import React from "react";

export default class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      name: ""
    };
  }

  submitData = () => {
    if (this.state.name.length < 3) {
      this.setState({ error: "name must be at least three characters" });
      return;
    }
    this.props.onSubmit({ name: this.state.name });
  };

  render() {
    return (
      <div className="centered">
        <form
          className="login"
          onSubmit={e => {
            e.preventDefault();
            this.submitData();
          }}
        >
          <input
            placeholder="name"
            value={this.state.name}
            onChange={e =>
              this.setState({
                error: "",
                name: e.target.value.replace(/[^a-z0-9 ]/gi, "")
              })
            }
          />
          {this.state.error == "" ? null : (
            <div className="errorText">{this.state.error}</div>
          )}
          <div style={{ height: "8px" }} />
          <button
            disabled={this.state.clicked}
            className="actionButton"
            style={{ alignSelf: "center" }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
