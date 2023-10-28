import { Pet } from "./pet";
import { PetWithOwner } from "./types";

export function Pets({ pets }: { title: string; pets: PetWithOwner[] }) {
  return (
    <>
      <div>
        {pets.map((pet) => (
          <Pet pet={pet} key={pet.id} />
        ))}
      </div>
    </>
  );
}
