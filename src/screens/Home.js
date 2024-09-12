import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/auth/foodData", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      response = await response.json();
      console.log(response);
      if (Array.isArray(response) && response.length === 2) {
        setFoodItems(response[0]);
        setFoodCat([
          {
            "CategoryName": "Biryani/Rice"
        },
        {
            "CategoryName": "Starter"
        },
        {
            "CategoryName": "Pizza"
        }
        ]);
      } else {
        console.error('Unexpected response structure:', response);
      }
    } catch (error) {
      console.error('Error loading food items:', error);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "9" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Search in here..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn text-white bg-danger" onClick={() => setSearch('')}>X</button>
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://plus.unsplash.com/premium_photo-1683619761468-b06992704398?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyfGVufDB8fDB8fHww" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://media.istockphoto.com/id/1804163101/photo/hand-holding-handcrafted-chocolate-bonbons-from-shelf-store-row-of-chocolate-bonbon-at-shop.webp?b=1&s=170667a&w=0&k=20&c=MFZtMV5LS0-f30HbMZpEZyu3osUpyP0AWQJuOFRHGhU=" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://plus.unsplash.com/premium_photo-1683619761468-b06992704398?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyfGVufDB8fDB8fHww" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {foodCat.length > 0 && foodItems.length > 0
          ? foodCat.map((data) => (
            <div className='row mb-3' key={data.id}>
              <div className='fs-3 m-3'>
                {data.CategoryName}
              </div>
              <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
              {foodItems.filter(
                (items) => items.CategoryName === data.CategoryName && items.name.toLowerCase().includes(search.toLowerCase())
              ).map(filterItems => (
                <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                  <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} />
                </div>
              ))}
            </div>
          ))
          : <div>No Data Available</div>}
      </div>
      <Footer />
    </div>
  );
}
