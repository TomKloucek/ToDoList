import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Nadpis extends React.Component {
  render() {
    return <h1 className="nadpis">Todo List</h1>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: JSON.parse(localStorage.getItem("items")), text: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
    };
    const updatedItems = this.state.items.concat(newItem);
    this.setState((state) => ({
      items: updatedItems,
      text: "",
    }));
    localStorage.setItem("items", JSON.stringify(updatedItems));
  }

  deleteItem(key) {
    const filteredItems = this.state.items.filter((item) => item.id !== key);
    this.setState({
      items: filteredItems,
      text: "",
    });
    localStorage.setItem("items", JSON.stringify(filteredItems));
  }

  render() {
    return (
      <div className="app">
        <Nadpis />
        <form onSubmit={this.handleSubmit} className="formular">
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.text}
          ></input>
          <button>+</button>
        </form>
        <TodoList deleteItem={this.deleteItem} items={this.state.items} />
      </div>
    );
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item) => (
          <div className="item" id={item.id}>
            <li key={item.id}>{item.text}</li>{" "}
            <button onClick={() => this.props.deleteItem(item.id)}>X</button>
          </div>
        ))}
      </ul>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
