// import axios from '../config/axios'
import cookies from 'universal-cookie'
import swal from 'sweetalert'
import axios from 'axios'
import {API_URL} from '../API_URL/API_URL'

const cookie = new cookies()


export const onLoginClick = (username, password) => {
    return async (dispatch) => {
        try {
            console.log("berfungsi");
            
            const res = await axios.post(`${API_URL}/loginadmins`, {username, password})
            console.log(res);

            if(res.data.length !== 1) {
                return dispatch({
                    type: 'ERROR_LOGIN',
                    payload: {
                        error: swal({
                            title: "Your Account Does Not Exist!",
                            text: "Please contact IT support",
                            icon: "warning",
                            button: "OK"
                        })
                    }
                })
            }

            cookie.set('usernameLogin', res.data[0].username, {path:'/dashboard'})
            cookie.set('idLogin', res.data[0].id, {path:'/dashboard'})

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    id: res.data[0].id,
                    username: res.data[0].username
                }
            })
            
        } catch (e) {
            console.log(e);
            
        }
    }
}

export const onLogout = () => {
    cookie.remove('usernameLogin')
    cookie.remove('idLogin')

    return {
        type: 'LOGOUT'
    }
}

export const keepLogin = (username, id) => {
    if (username === undefined || id === undefined) {
        return {
            type: 'KEEP_LOGIN',
            payload: {
                id: "",
                username: ""
            }
        }
    }

    return {
        type: "KEEP_LOGIN",
        payload: {
            id,
            username
        }
    }
}

// export const onSubmitProduct = (id,product_name, detail_product, price, category_name, subcategory_name) => {
//     return dispatch => {
//         axios.post(`${API_URL}/product`, {
//             product_name, detail_product,price, category_name, subcategory_name
//         }).then (res => {
//             if(product_name === '' || detail_product === '' || price === '' || category_name === '' || subcategory_name === '') {
//                 swal({
//                     text: "Please input all data!",
//                     icon: "warning",
//                     dangerMode: true
//                 })
//             }
//             else {
//                 swal({
//                     title: "Your Product Has Been Added",
//                     text: "",
//                     icon: "success",
//                     button: "OK",
//                 })

//                 // console.log();
                
//             }
//         })
//     }
// }

export const onSubmitProduct = (product_name, detail_product, price, category_name, subcategory_name, image_product) => {
    return async () => {
        try {
            const res2 = await axios.get(`${API_URL}/getproduct`)
            console.log(res2.data[0]);
            
        } catch (e) {
            console.log(e);
            
        }
        try {
            const formData = new FormData()

            formData.append('product_name', product_name)
            formData.append('detail_product', detail_product)
            formData.append('price', price)
            formData.append('category_name', category_name)
            formData.append('subcategory_name', subcategory_name)
            formData.append('image_product', image_product)


            const res = await axios.post(`${API_URL}/product`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res);
            
            
        
            
        } catch (e) {
            console.log(e);
            
        }
    }
}

export const getProduct = () => {
    return async () => {
        try {

            const res2 = axios.get(`${API_URL}/getproduct`)
            console.log(res2);
            






        } catch (e) {
            console.log(e);
            
        }
    }
}