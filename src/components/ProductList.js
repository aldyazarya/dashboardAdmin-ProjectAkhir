import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';
import axios from 'axios'
import Header from './Header';
import Sidebar from './Sidebar';
import swal from '@sweetalert/with-react'


class Tables extends Component {

    constructor (props) {
        super(props);
    
    
        this.formatterIDR = new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
          })
      }
    state = {
        products: []
    }

    getProducts = () =>{
        var link = `${API_URL}/getproduct`

        axios.get(link)
        .then((x)=>{
            this.setState({
                products: x.data
            })
            console.log(x.data)
        })
        .catch()
    }

    componentDidMount(){
        this.getProducts()
    }

    deleteData = (e) =>{
        swal({
			title: "Are you sure?",
			text: "You will remove this product from the list",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
                axios.delete(`${API_URL}/deleteproduct/${e}`)
                .then((x)=>{
                    console.log(x)
                    this.getProducts()
                })
                .catch()
				swal("Successfully removed product from list!", {
					icon: "success",
				});
			} else {
				swal("This product is still on the list");
			}
		})
    }

  render() {
      
    var products = this.state.products.map((val, i)=>{
        var id = val.id
        var product_name = val.product_name
        var detail_product = val.detail_product
        var price = val.price

        var category = val.category
        var image = val.image
        
        return(
            <tr key={i}>
                <td class="text-center">{id}</td>
                <td>{product_name}</td>
                <td>{detail_product}</td>
                <td>{this.formatterIDR.format(price)}</td>
                <td class="text-center">{category}</td>
                <td><img src={`${API_URL}/imageproduct/${image}`} style={{width: "200px", height:"200px"}}/></td>
                <td class="text-center">
                    <a class="btn btn-primary" href={`/edit-product/${id}`}>Edit</a>
                    <span>  </span>
                    <button class="btn btn-danger"
                    onClick={()=>{this.deleteData(id)}}>Delete</button>
                </td>
            </tr>
        )
    })
    return (
    <div class="skin-black">
    <Header/>
    <Sidebar/>
        <div class="wrapper row-offcanvas row-offcanvas-left">
            {/* Right side column. Contains the navbar and content of the page */}
            <aside class="right-side">                
                {/* Content Header (Page header) */}
                <section class="content-header">
                    <h1>
                        Product List
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a href="#">Tables</a></li>
                        <li class="active">Product List</li>
                    </ol>
                </section>

                {/* Main content */}
                <section class="content">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="box">
                                <div class="box-header">
                                    <h3 class="box-title">List Details</h3>                                    
                                </div>{/* /.box-header */}
                                <div class="box-body table-responsive">
                                    <table id="example2" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Id Product</th>
                                                <th class="text-center">Product Name</th>
                                                <th class="text-center">detail_product</th>
                                                <th class="text-center">Price</th>

                                                <th class="text-center">Category</th>
                                                <th class="text-center">Image</th>
                                                <th class="text-center">Settings</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products}
                                        </tbody>
                                    </table>
                                </div>
                            </div>{/* /.box */}
                        </div>
                    </div>

                </section>{/* /.content */}
            </aside>{/* /.right-side */}
        </div>{/* ./wrapper */}
    </div>
    );
  }
}

export default Tables;