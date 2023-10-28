import { Button } from "react-bootstrap";
import { PetWithOwner } from "./types";
import { useNavigate } from "react-router-dom";

export function Pet({ pet }: { pet: PetWithOwner }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex justify-content-between p-1 my-2">
        <p>
          <span className="fw-bold">{pet.name}</span>
          {"("}
          {pet.owner.name}
          {")"}
        </p>
        <Button
          variant="primary"
          onClick={() => navigate(`/cats/${pet.id}`, { state: pet })}
        >
          View Details
        </Button>
      </div>
    </>
  );
}
