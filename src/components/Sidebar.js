import React, { Component } from 'react';
import { API_URL } from '../API_URL/API_URL';
import cookies from 'universal-cookie'

const cookie = new cookies()

class Sidebar extends Component {



    logOut = () => {
        cookie.remove("masihLogin")
        cookie.remove("idLogin")
    }


  render() {
    return (
      <div>
        {/* Left side column. contains the logo and sidebar */}
        <aside class="left-side sidebar-offcanvas">
            {/* sidebar: style can be found in sidebar.less */}
            <section class="sidebar">
                {/* Sidebar user panel */}
                <div class="user-panel">
                    <div class="pull-left image">
                        <img src="https://media.licdn.com/dms/image/C5103AQEeQSdpqrClBA/profile-displayphoto-shrink_200_200/0?e=1562198400&v=beta&t=rE77SuhRzq0DlOChL412Kt1YDYgeWdfe-PMR8UqZBGA" class="img-circle" alt="User Image" />
                    </div>
                    <div class="pull-left info">
                        <p>Hello, Aldy</p>

                        <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                    </div>
                </div>
                {/* sidebar menu: : style can be found in sidebar.less */}
                <ul class="sidebar-menu">
                    <li class="active">
                        <a href="/home">
                            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
                        </a>
                    </li>
                    <li class="treeview">
                        <a href="#">
                            <i class="fa fa-edit"></i> <span>Forms</span>
                            <i class="fa fa-angle-left pull-right"></i>
                        </a>
                        <ul class="treeview-menu">
                            <li><a href="/add-products"><i class="fa fa-angle-double-right"></i>Add Products</a></li>
                        </ul>
                    </li>
                    <li class="treeview">
                        <a href="#">
                            <i class="fa fa-table"></i> <span>Table Lists</span>
                            <i class="fa fa-angle-left pull-right"></i>
                        </a>
                        <ul class="treeview-menu">
                            <li><a href="/product-list"><i class="fa fa-angle-double-right"></i>Product List</a></li>

                            <li><a href="/member-list"><i class="fa fa-angle-double-right"></i>Member List</a></li>
                            <li><a href="/order-list"><i class="fa fa-angle-double-right"></i>Order List</a></li>
                        </ul>
                    </li>
                    
                    <li class="treeview">
                        
                            <li><a href="/payment-confirmation"><i class="fa fa-angle-double-right"></i>Payment Confirmation</a></li>
                        
                    </li>
                    <li class="treeview">
                        <a href="#">
                            <i className="fa fa-user"></i> <span>Account</span>
                            <i class="fa fa-angle-left pull-right"></i>
                        </a>
                        <ul class="treeview-menu">
                            <li><a href="/"><i class="fa fa-angle-double-right"></i>Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </section>
            {/* /.sidebar */}
        </aside>   
    </div>
    );
  }
}

export default Sidebar;
