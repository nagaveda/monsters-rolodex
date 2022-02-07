import React, { Component } from "react";
import "./App.css";
import "./components/cardlist/card-list.styles.css";
import { CardList } from "./components/cardlist/card-list.component";
import { SearchBox } from "./components/searchbox/search-box.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((users) => users.json())
      .then((users) => this.setState({ monsters: users }));
  }

  handleChange(event) {
    this.setState({ searchField: event.target.value }, () => {
      console.log(this.state);
    });
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox placeholder="search" handleChange={this.handleChange} />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
