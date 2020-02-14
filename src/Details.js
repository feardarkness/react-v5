import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ThemeContext from "./ThemeContext";
import { navigate } from "@reach/router";
import Modal from "./Modal";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showModal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.adopt = this.adopt.bind(this);
  }

  // to make this work, install:
  // $ npm install -D babel-eslint @babel/core @babel/preset-env @babel/plugin-proposal-class-properties @babel/preset-react
  // state = { loading: true };

  componentDidMount() {
    pet.animal(parseInt(this.props.id)).then(({ animal }) => {
      this.setState({
        url: animal.url,
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false
      });
    }, console.error);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  adopt() {
    navigate(this.state.url);
  }

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    } else {
      const { animal, breed, location, description, name, media, showModal } = this.state;
      return (
        <div className="details">
          <Carousel media={media}></Carousel>
          <div>
            <h1>{name}</h1>
            <h2>{`${animal} - ${breed} - ${location}`}</h2>
            <ThemeContext.Consumer>
              {([themeHook]) => (
                <button style={{ backgroundColor: themeHook }} onClick={() => this.toggleModal()}>
                  Adopt {name}
                </button>
              )}
            </ThemeContext.Consumer>
            <p>{description}</p>
            {showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name}?</h1>
                  <div className="buttons">
                    <button onClick={this.adopt}>Yes</button>
                    <button onClick={this.toggleModal}>No, I&apos;m a monster</button>
                  </div>
                </div>
              </Modal>
            ) : null}
          </div>
        </div>
      );
    }
  }
}

export default Details;
