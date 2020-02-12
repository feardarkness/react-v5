import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropdown from "./useDropdown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);

  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  const [pets, setPets] = useState([]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    setPets(animals || []);
  }

  // after rendering, useEffect is called asap but not immediately
  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(
      ({ breeds }) => {
        const breedStrings = breeds.map(({ name }) => name);
        setBreeds(breedStrings);
      },
      error => console.error(error)
    );
  }, [animal, setBreeds, setBreed]);
  // this hook will run when animal, setBReeds or setBreed updates. To run only once at the beginning, just pass an empty array.

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            onChange={e => setLocation(e.target.value)}
            value={location}
            placeholder="Location"
          />
        </label>
        <AnimalDropdown></AnimalDropdown>
        <BreedDropdown></BreedDropdown>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
