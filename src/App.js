
import Accueil from "./pages/accueil";
import Produits from "./pages/produits";
import Header from "./composent/header";
import Administrasion from "./pages/administrasion";
import Footer from "./composent/footer";
import Profil from "./pages/profil";
import DetailsPage from "./pages/DetailsPage";
import Panier from "./pages/panier"
import PanierForm from "./pages/formPanier";
import LoginForm from "./pages/login";
import SignupForm from "./pages/signup";


import { Routes, Route } from "react-router-dom";

function App() {
 
  const products = [
    {
      "id": 1,
      "name": "Gaming Laptop",
      "description": "High-performance gaming laptop with RTX 3070.",
      "price": 1500,
      "stock": 10,
      "category": "Laptops",
      "image": "produit1.jpg"
    },
    {
      "id": 2,
      "name": "Mechanical Keyboard",
      "description": "RGB backlit mechanical keyboard for gaming.",
      "price": 120,
      "stock": 25,
      "category": "Accessories",
      "image": "https://plus.unsplash.com/premium_photo-1671439308358-3c95189519ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "id": 3,
      "name": "Gaming Mouse",
      "description": "Wireless gaming mouse with adjustable DPI.",
      "price": 80,
      "stock": 30,
      "category": "Accessories",
      "image": "https://plus.unsplash.com/premium_photo-1671439308358-3c95189519ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "id": 4,
      "name": "Curved Gaming Monitor",
      "description": "34-inch ultra-wide curved gaming monitor with 144Hz refresh rate.",
      "price": 500,
      "stock": 15,
      "category": "Monitors",
      "image": "https://plus.unsplash.com/premium_photo-1671439308358-3c95189519ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "id": 5,
      "name": "Gaming Headset",
      "description": "7.1 surround sound gaming headset with noise cancellation.",
      "price": 150,
      "stock": 20,
      "category": "Accessories",
      "image": "https://plus.unsplash.com/premium_photo-1671439308358-3c95189519ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ]
  const special_offers =  [
    {
      "id": 6,
      "name": "Custom Gaming PC",
      "description": "Pre-built gaming PC with Intel i9, RTX 4090, and 32GB RAM.",
      "original_price": 3500,
      "discounted_price": 3200,
      "price": 3200,
      "stock": 5,
      "category": "PCs",
      "image": "produit1.jpg",
      "discount_percentage": 8.57
    },
    {
      "id": 7,
      "name": "SSD 1TB NVMe",
      "description": "Ultra-fast NVMe SSD with 1TB storage capacity.",
      "original_price": 200,
      "discounted_price": 170,
      "price": 170,
      "stock": 50,
      "category": "Storage",
      "image": "https://plus.unsplash.com/premium_photo-1671439308358-3c95189519ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "discount_percentage": 15
    },
    {
      "id": 8,
      "name": "Gaming Chair",
      "description": "Ergonomic gaming chair with adjustable armrests and lumbar support.",
      "original_price": 250,
      "discounted_price": 200,
      "price": 200,
      "stock": 12,
      "category": "Furniture",
      "image": "https://plus.unsplash.com/premium_photo-1671439308358-3c95189519ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "discount_percentage": 20
    }
  ]
 
  const carouselTab = [
    { id: 1, name: "Corsair Vengeance DDR5 32Go", price: "1 579,00 MAD", img: "https://www.myordi.ma/media/2024/12/ASUS-ROG-Zephyrus-G16-GU605-RTX%E2%84%A2-4090-90NR01Q5-M004A0-6.jpg" },
    { id: 2, name: "Corsair Vengeance  DDR5 64Go", price: "3 599,00 MAD", img: "https://multimedia.bbycastatic.ca/multimedia/products/500x500/179/17986/17986458.jpeg" },
    { id: 3, name: "Corsair Vengeance DDR5 64Go", price: "2 899,00 MAD", img: "https://bunny-wp-pullzone-cbh8ghlmbr.b-cdn.net/wp-content/uploads/2024/12/0b3a0effa4a0a261bf0a3c8d55fb435b8e757f00-600x600.jpg" },
    { id: 4, name: "Crucial DDR5 4800MHz 16GB", price: "5999,00 MAD", img: "https://uaedubai-bucket.s3.me-central-1.amazonaws.com/wp-content/uploads/2024/07/Asus-ROG-Strix-SCAR-16-UAEdubai.ae-1.jpg" },
    { id: 5, name: "Corsair Vengeance DDR5 32Go", price: "1 699,00 MAD", img: "https://assets.products-live.ao.com/Images/1e7e98b9-9807-44f0-ae51-c1847a01cf67/1280x1280/G614JZ-N4024W_Asus_Laptop_01.jpg" },
    { id: 6, name: "Crucial DDR5 4800MHz 16GB", price: "6999,00 MAD", img: "https://m.media-amazon.com/images/I/81Gj6bIRVBL.jpg" }
  ];

  
  return (
    <>
      <Header/>

      <Routes>
          <Route path="/" element={<Accueil  special_offers={ special_offers} carouselTab={carouselTab}/>} />
          <Route path="/produits" element={<Produits products={products}/>} />
          <Route path="/administrasion" element={<Administrasion />} />
          <Route path="/profile" element={<Profil />} />
          <Route path="/produits/details" element={<DetailsPage carouselTab={carouselTab}/>} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/commander" element={<PanierForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
      </Routes>
      
      <Footer />
    </>
  )
}

export default App;
