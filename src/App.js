const App = () => {
  return React.createElement(
    "div",
    {
      id: 'something'
    },
    React.createElement("h1", {}, "Adopt Me")
  );
};

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root')
);