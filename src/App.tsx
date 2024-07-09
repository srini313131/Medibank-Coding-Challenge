import { Pets } from "./Pets";
import { Accordion, Card, Spinner } from "react-bootstrap";
import { GenderEnum } from "./types";
import { UseFetch } from "./useFetch";
import { useRef } from 'react' 

const URL =
  "https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json";
function App() {
  const { data: cats, status, error } = UseFetch(URL);
  const catsWithMaleOwners = cats.filter(
    (cat) => cat.owner.gender === GenderEnum.male
  );
  const catsWithFemaleOwners = cats.filter(
    (cat) => cat.owner.gender === GenderEnum.female
  );
const scrollRef = useRef<HTMLInputElement>(null) ; 

const handleLeftScroll =()=>{ 

scrollRef?.current?.scrollBy({ 

top: 0, 

left: -100, 

behavior: "smooth", 

}) 

} 

const handleRightScroll =()=>{ 

scrollRef?.current?.scrollBy({ 

top: 0, 

left: 100, 

behavior: "smooth", 

}) 

} 
  return (
    <>
      {status !== "error" && (
        <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{GenderEnum.male}</Accordion.Header>
            <Accordion.Body>
              <Pets pets={catsWithMaleOwners} title={"Title"} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>{GenderEnum.female}</Accordion.Header>
            <Accordion.Body>
              <Pets pets={catsWithFemaleOwners} title={"Title"} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
      {status === "error" && (
        <Card>
          <Card.Header className="text-bg-danger">
            There's been an error
          </Card.Header>
          <Card.Body>
            <Card.Text>{JSON.stringify(error)}</Card.Text>
          </Card.Body>
        </Card>
      )}

      {status === "loading" && (
        <div style={{ position: "absolute", top: "50%", left: "40%" }}>
          {[1, 2, 3, 4, 5].map((val) => (
            <Spinner animation="grow" variant="dark" key={val} />
          ))}
        </div>
      )}
      <button onClick={handleLeftScroll}>left</button> <button onClick={handleRightScroll}>right</button> 

<div ref={scrollRef} className="scroll-container" style={{width:'400px', height:'300px', backgroundColor:'red', overflowX:'scroll', display:'flex', padding:'12px'}}> 

 

<div style={{width:'150px', height:'300px',flexShrink:'0', backgroundColor:'blue', color:'black'}}>1</div> 

<div style={{width:'150px', height:'300px', flexShrink:'0',backgroundColor:'green', color:'black'}}>2</div> 

<div style={{width:'150px', height:'300px', flexShrink:'0',backgroundColor:'yellow', color:'black'}}>3</div> 

<div style={{width:'150px', height:'300px', flexShrink:'0',backgroundColor:'violet', color:'black'}}>4</div> 

<div style={{width:'150px', height:'300px', flexShrink:'0',backgroundColor:'pink', color:'black'}}>5</div> 

</div> 
    </>
  );
}

export default App;
