import { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import FromInput from "../UI/FormInput";
import NewModal from "../UI/Modal/Modal";
import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import createCategoryList from "../helpers/categoryList";
import { createPage } from "../actions/page_actions";

const Page = () => {
    const [ createModal, setCreateModal ] = useState(false);
    const [ title, setTitle ] = useState("");
    const [ categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    const category = useSelector(state => state.category);
    const page = useSelector(state => state.page);

    useEffect(() =>{
        console.log(category);
        setCategories(createCategoryList(category.categories));
    },[category]);

    useEffect(() => {
        if(!page.loading){
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setDesc('');
            setProducts([]);
            setBanners([]);
        }
    }, [page]);

    const handleBannerImages = (e) => {
        console.log(e);
        setBanners([...banners, e.target.files[0]]);
    }

    const handleProductImages = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]]);
    }

    const onCategoryChange = (e) => {
        const category = categories.find(category => category.value == e.target.value);
        setCategoryId(e.target.value);
        setType(category.type);
    }

    const handlePageSubmit = (e) => {
        e.preventDefault();
        if(title === "")
        {
            alert("Title is required");
            setCreateModal(false);
            return;
        }
        const form = new FormData();
        form.append("title", title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner,index) => {
            form.append('banners',banner);
        });
        products.forEach((product,index) => {
            form.append('products',product);
        });

        dispatch(createPage(form));
        // setCreateModal(false);

    }


    return(
        <Layout sidebar>
            {
                page.loading?
                <p>Loading....</p>
                :
                <>
                    <Button onClick={()=>setCreateModal(true)}>CREATE</Button>
                    <NewModal
                    show = {createModal}
                    Title = "Create New Page"
                    handleClose = {() => setCreateModal(false)}
                    handleSubmit = {handlePageSubmit}
                    buttonTitle= {"Create"}>
                        <Row>
                            <Col>
                            <select
                                className="form-control form-control-sm input-class"
                                value={categoryId}
                                onChange={onCategoryChange}>
                                <option>select Parent Category</option>
                                {
                                categories.map((option, index)=>
                                    <option key={index} value={option.value}>{option.name}</option>)
                                }
                            </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FromInput
                                value= {title}
                                className="form-control-sm col-md-12"
                                onChange = {(e) => setTitle(e.target.value)}
                                placeholder = {"Page Title"}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FromInput
                                value= {desc}
                                className="form-control-sm col-md-12"
                                onChange = {(e) => setDesc(e.target.value)}
                                placeholder = {"description"}/>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col>
                                <h6>Banners</h6>
                            </Col>
                        </Row>
                        <Row>
                            {banners.length > 0 ?
                            banners.map((banner,index) => 
                                <Row key={index}>
                                    <Col >
                                        {banner.name}
                                    </Col>
                                </Row>

                                ):null
                            }
                            <Col>
                                <input 
                                    className="form-control form-control-sm input-class" 
                                    type="file" 
                                    multiple='multiple' 
                                    name="banners" 
                                    onChange={handleBannerImages} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h6>Product Images</h6>
                            </Col>
                        </Row>
                        <Row>
                        {products.length > 0 ?
                            products.map((product,index) => 
                                <Row key={index}>
                                    <Col >
                                        {product.name}
                                    </Col>
                                </Row>

                                ):null
                            }
                            <Col>
                                <input 
                                    className="form-control form-control-sm input-class" 
                                    type="file" 
                                    multiple='multiple' 
                                    name="productImages" 
                                    onChange={handleProductImages} />
                            </Col>
                        </Row>
                    </NewModal>
                </>
            }
            
        </Layout>
    );
}

export default Page;