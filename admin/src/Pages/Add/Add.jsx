import React, { useState } from "react"
import './Add.css';
import { assets } from "../../assets/assets";
import axios from "axios"
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';

const Add = () => {

    const url = import.meta.env.VITE_API_URL;

    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name: "",
        description:"",
        price:"",
        category:"Beef",
        isFeatured: false,
    });

    const onChangeHandler =(event)=> {
        const name = event.target.name;
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        formData.append("isFeatured",data.isFeatured) 

        const response = await axios.post(`${url}/api/product/add`, formData);
        if(response.data.success){
            setData({
                name: "",
                description:"",
                price:"",
                category:"Beef",
                isFeatured: false,
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className="add">
            <ToastContainer />
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here"></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Beef">Beef</option>
                            <option value="Chicken">Chicken</option>
                            <option value="Pork">Pork</option>
                            <option value="Spices">Spices</option>
                            <option value="Goat meat">Goat meat</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Fish">Fish</option>
                            <option value="Gizzard">Gizzard</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="₦2000" />
                    </div>
                </div>
                <div className="add-featured">
                    <p>Mark as Featured</p>
                    <input type="checkbox" name="isFeatured" checked={data.isFeatured} onChange={onChangeHandler} />
                </div>
                <button type="submit" className="add-btn">ADD</button>
            </form>
        </div>
    )
}

export default Add;
