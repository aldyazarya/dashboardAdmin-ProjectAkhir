import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import swal from '@sweetalert/with-react'


class Form extends Component {
    state = {
        // id_product: '',
        product_name: '',
        detail_product: '',
        price: '',
        category: '',
        image_product: '',
        categoryValue: '',
    }

    onChange1(event){
        this.setState({
            categoryValue: event.target.value,
     })
    }

    setImage = (e) => {
        switch(e.target.name){
          case 'image_product': 
          this.setState({
            image_product: e.target.files[0],
          })
          break;
          default:
        }
      }
    
    data = (e) => {
        var product_name = this.refs.product_name.value;
        var detail_product= this.refs.detail_product.value;
        var price= this.refs.price.value;
        var category= this.refs.category.value;
        
        
        this.setState({
            product_name: product_name,
            detail_product: detail_product,
            price: price,
            category: category,
        })

        swal({
            title: "Added to list!",
            text: "You just added this product to the product list",
            icon: "success",
            button: "OK",
        }).then((x)=>{
            window.location.reload()
        })
    }
    
    postData = async (e) => {
        try{
            e.preventDefault()
        let addproduct = new FormData();
        // addproduct.append('id_product', this.state.id_product);
        addproduct.append('product_name', this.state.product_name);
        addproduct.append('detail_product', this.state.detail_product);
        addproduct.append('price', this.state.price);
        addproduct.append('category', this.state.category);
        addproduct.append('image_product', this.state.image_product);
        
        var url = `${API_URL}/product`

        await axios.post(url, addproduct 
            // { category: this.state.category}
        )
        .then((x)=>{
            console.log(x);
        })
        } catch(e) {
            console.log();
            
        }
        
    }

    
  render() {
      console.log(this.state.category);
      
    return (
    <div class="skin-black">
    
    <Sidebar/>
        <div class="wrapper row-offcanvas row-offcanvas-left">
        {/* Right side column. Contains the navbar and content of the page */}
            <aside class="right-side">
                {/* Content Header (Page header) */}
                <section class="content-header">
                    <h1>
                        Add Products
                        {/* <small>Preview</small> */}
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a href="#">Forms</a></li>
                        <li class="active">Add Products</li>
                    </ol>
                </section>

                {/* Main content */}
                <section class="content">
                    <div class="row">
                        {/* left column */}
                        <div class="col-md-6">
                            {/* general form elements */}
                            <div class="box box-primary">
                                <div class="box-header">
                                    <h3 class="box-title">Input product</h3>
                                </div>{/* /.box-header */}
                                {/* form start */}
                                <form role="form" onSubmit={this.postData}>
                                    <div class="box-body">
                                        <div class="form-group">
                                            <label for="productname">Product Name</label>
                                            <input type="text" class="form-control" placeholder="Product Name" ref="product_name"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="detail_product">Detail Product</label>
                                            <input type="text" class="form-control" placeholder="Detail Product" ref="detail_product"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="price">Price</label>
                                            <input type="number" class="form-control" placeholder="Price" ref="price"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="category">Category</label>
                                            <select type="option" class="form-control" ref="category">
                                                <option>Analog Camera</option>
                                                <option>Roll Film & Accessories</option>
                                                <option>Digital Camera</option>
                                                <option>Lenses & Accessories</option>
                                                <option>Video Camera</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputpicture">Image</label>
                                            <input name="image_product" ref="image_product" type="file" accept="image/*" onChange={this.setImage}/>
                                            {/* <p class="help-block">Example block-level help text here.</p> */}
                                        </div>
                                        {/* <div class="checkbox">
                                            <label>
                                                <input type="checkbox"/> Check me out
                                            </label>
                                        </div> */}
                                    </div>{/* /.box-body */}

                                    <div class="box-footer">
                                        <button type="submit" class="btn btn-primary" onClick={()=>{this.data(this.refs)}}>Submit</button>
                                    </div>
                                </form>
                            </div>{/* /.box */}
                        </div>{/*/.col (right) */}
                    </div>   {/* /.row */}
                </section>{/* /.content */}
            </aside>{/* /.right-side */}
        </div>{/* ./wrapper */}
    </div>
    );
  }
}

export default Form;