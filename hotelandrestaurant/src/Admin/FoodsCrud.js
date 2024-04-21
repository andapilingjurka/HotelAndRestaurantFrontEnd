import { useEffect, useState, useRef } from "react";
import axios from "axios";



function FoodsCrud() {
    const [ushqimet, setUshqimet] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(''); 
    const [selectedImage, setSelectedImage] = useState(null);



    useEffect(() => {
        Load();
      }, []);
    
      async function Load() {
        try {
          const result = await axios.get(
            "https://localhost:7264/api/Foods"
          );
          setUshqimet(result.data);
          console.log(result.data);
        } catch (error) {
          console.error(error);
        }
      }
      async function save(event) {
        event.preventDefault();
        try {
          await axios.post("https://localhost:7264/api/Foods", {
            id:id,
            name: name,
            description: description,
            image:image,
          });
          alert("Save successful!");
          setId("");
          setName("");
          setDescription("");
          setImage(""); 
          setSelectedImage(null);
        } catch (err) {
          alert(err);
        }
    }


 
  const inputFileRef = useRef(null);
  async function edit(foods) {
    setId(foods.id);
    setName(foods.name);
    setDescription(foods.description);
    setImage(foods.image); 

   
    console.log(`Update the Food`);
  }


  async function update(event) {
    event.preventDefault();
    try {
      const phone = ushqimet.find((p) => p.id === id);
      await axios.put(`https://localhost:7264/api/Foods/${id}`, {
        id: phone.id,
        name: name,
        description: description,
        image:image,
      });
      alert("The Food has been successfully edited.");
      Load();
      setId("");
      setName("");
      setDescription("");
      setImage(""); 
      inputFileRef.current.value = "";
    } catch (err) {
      console.log(`Error: ${err}`, true);
    }
  }


  async function Delete(id) {
    try {
      await axios.delete(`https://localhost:7264/api/Foods/${id}`);
      alert("The food has been successfully deleted!");
      
      Load();
    } catch (err) {
      console.error("Error while deleting food:", err);
      alert(`Error: ${err}`);
    }
  }


  return (
  <div>
  <h4 style={{ textAlign: 'center' }} className="description">Form</h4>
   <div className="col-4 col-md-2"></div>
      <form>
   <div className="form-group">
        <input type="text" id="name" name="name"placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}  />
    </div>

    <div className="form-group">
        <input type="text" id="description" name="description"placeholder="Description" value={description}onChange={(e) => setDescription(e.target.value)}  />
    </div>
  
    <input type="file"ref={inputFileRef} className="form-control" id="image"onChange={(event) => {setSelectedImage( URL.createObjectURL(event.target.files[0])); setImage("./images/" + event.target.files[0].name);}}/>
                  {selectedImage && (
    <img src={selectedImage}style={{ maxWidth: "100%",height: "auto", maxHeight: "150px", marginTop: "10px",}}alt="SelectedImagePreview" /> )}
        <div>
            <button className="btn btn-success m-4 button" onClick={save}> Save </button>
            <button className="btn btn-warning m-4 button" onClick={update}> Update </button>
          </div>
      </form>
      <div className="container mt-4">
      
       
  <h4 style={{ textAlign: 'center' }} className="description">List of Foods</h4>

    <div className="table-responsive m-3">
    <table className="table border-gray">
    <thead>
       <tr>
       <th scope="col">Id</th>
       <th scope="col">Name</th>
       <th scope="col">Description</th>
       <th scope="col">Image</th>
       <th scope="col">Options</th>
     </tr>
    </thead>
    <tbody>

        {ushqimet.map((foods) => (
        <tr key={foods.id}>
        <td>{foods.id}</td>
        <td>{foods.name}</td>
        <td>{foods.description}</td>
        <td>
        <img src={foods.image} style={{maxWidth: "100%",height: "auto",maxHeight: "150px",}}alt="Food"/>
        </td>

    <td className="d-flex align-items-center button-container ">
    <button type="button" className="btn btn-warning mx-1 button" onClick={() => edit(foods)}> Edit </button>
    <button type="button" className="btn btn-danger mx-1 button" onClick={() => Delete(foods.id)} >Delete</button>
    </td>
    </tr>
  ))}
  </tbody>
  </table>
  </div>
  </div>
  </div>  
  );
}
 
export default FoodsCrud;