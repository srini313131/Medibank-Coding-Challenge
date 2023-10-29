import { Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { PetWithOwner } from "./types";

export function PetDetail() {
  const { state }: { state: PetWithOwner } = useLocation();
  const friends = (state?.owner.pets || []).filter(
    (pet) => pet.name !== state.name
  );
  const navigate = useNavigate();
  return (
    <>
      <Card>
        <Card.Header>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Back
          </Button>
        </Card.Header>
        <Card.Body>
          <Card.Title>{state?.name}</Card.Title>
          <Card.Text className="d-flex">
            <span className="label">Type:</span>
            <span className="badge rounded-pill text-bg-info ms-1">
              {state?.type}
            </span>
          </Card.Text>
          <Card.Text className="d-flex">
            <span className="label">Owner:</span>
            <span className="badge rounded-pill text-bg-primary ms-1">
              {state?.owner.name}
            </span>
          </Card.Text>
          <Card.Text className="d-flex" as={"div"}>
            <span className="label">Co-pets:</span>
            <div className="d-flex flex-wrap">
              {friends.length > 0 &&
                friends.map((pet) => (
                  <span
                    key={pet.name}
                    className={
                      pet.type === "Dog"
                        ? "badge rounded-pill text-bg-danger mx-1"
                        : "badge rounded-pill text-bg-success mx-1"
                    }
                  >
                    {pet.name} {"("}
                    {pet.type}
                    {")"}
                  </span>
                ))}
              {!friends.length && (
                <span className="badge rounded-pill text-bg-secondary mx-1">
                  None
                </span>
              )}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
