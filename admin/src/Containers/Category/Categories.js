import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { 
  get_categories, 
  addCategory, 
  updateCategories,
  deleteCategories as deleteCategoriesAction } from '../../actions/category_actions';
import { Row, Col, Button, Card } from 'react-bootstrap';
import {BiAddToQueue} from 'react-icons/bi';
import {  IoIosCheckboxOutline, IoIosSquareOutline, IoIosCheckbox, IoIosArrowDown, IoIosArrowForward} from 'react-icons/io';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckboxTree from 'react-checkbox-tree';

import AddCategoryModal from './AddCategoryModal';
import UpdateCategoryModal from './UpdateCategoryModal';
import DeleteCategoryModal from './deleteCategoryModal';
import createCategoryList from '../../helpers/categoryList';
/**
* @author
* @function Category
**/

const Category = (props) => {


  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [addCategoryModal, setaddCategoryModal] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  const category=useSelector(state=>state.category);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(get_categories())
  },[]);

  useEffect(() => {
    if(!category.loading){
      setaddCategoryModal(false);

    }
}, [category.loading]);


const handleAddCategorySubmit = () => {
  if(categoryName==""){
    alert("categoryName is required");
    return
  }
  const form= new FormData();
  form.append('name',categoryName);
  if(parentCategoryId!="")
  form.append('parentId',parentCategoryId);
  form.append('categoryImage',categoryImage);
  dispatch(addCategory(form));
  setCategoryImage('');
  setCategoryName('');
  setaddCategoryModal(false)
};

const handleUpdateCategorySubmit = () =>{
  console.log(expandedArray);
  console.log(checkedArray);
  const form = new FormData();
  expandedArray.forEach((item,index) => {
    form.append('_id', item.value);
    form.append('name', item.name);
    form.append('parentId', item.parentId? item.parentId : "");
    form.append('type',item.type);
  });
  checkedArray.forEach((item,index) => {
    form.append('_id', item.value);
    form.append('name', item.name);
    form.append('parentId', item.parentId? item.parentId : "");
    form.append('type',item.type);
  });
  dispatch(updateCategories(form))
  setUpdateCategoryModal(false);
}

const handledeleteCategorySubmit = () =>{
  const checkedIdArray = checkedArray.map((item, index) => ({_id: item.value}))
  const expandedIdArray = expandedArray.map((item, index) => ({_id: item.value}))
  const idArray = [...checkedIdArray, 
    // ...expandedIdArray
  ];

  setDeleteCategoryModal(false);
  dispatch(deleteCategoriesAction(idArray));
}

const handleAddCategoryModal = () => {
  if(addCategoryModal){
  setaddCategoryModal(false);
  }
  else{
    setaddCategoryModal(true);
  }
};

const handleUpdateModalShow = () =>{
  if(updateCategoryModal){
    setUpdateCategoryModal(false);
  }
  else{
    setUpdateCategoryModal(true);
  }
}

const handleDeleteModalShow = () =>{
  if(deleteCategoryModal){
    setDeleteCategoryModal(false);
  }
  else{
    setDeleteCategoryModal(true);
  }
}

const handleCategoryImage=(e)=>{
  setCategoryImage(e.target.files[0]);
}

const deleteCategory = () => {
  updatedArrays();
  setDeleteCategoryModal(true);
}

const updateCategory = () => {
  updatedArrays();
  setUpdateCategoryModal(true);
  // console.log({checked,expanded,categories,checkedArray,expandedArray});
}

const updatedArrays = () =>{
  const categories = createCategoryList(category.categories);
  const checkedArray = []; const expandedArray = [];
  checked.length>0 && checked.forEach((categoryId, index)=>{
    const category = categories.find((category,index) => categoryId == category.value )
    category && checkedArray.push(category);
  })
  expanded.length>0 && expanded.forEach((categoryId, index)=>{
    const category = categories.find((category,index) => categoryId == category.value )
    category && expandedArray.push(category);
  })
  setCheckedArray(checkedArray);
  setExpandedArray(expandedArray);
  console.log(checkedArray);
  console.log(expandedArray);
}

const renderCategories =( categories) =>{
  let mycategories=[];
  for(let category of categories){
    mycategories.push(
      {
        label: category.name,
        value: category._id,
        children: category.children.length>0 && renderCategories(category.children)
      }
    );
  }
  return mycategories;
}




  return(
    <Layout sidebar>
      <Row>
      <div className="card-center">

        <Card className='card mt-5' style={{ width: '25rem' }}>
          <Card.Header>
            <Row>
              <Col md={8}>
              CATEGORIES
              </Col>
              <Col md={4}>
              <Button className="btn btn-md btn-light" onClick={handleAddCategoryModal} ><BiAddToQueue/></Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
          <CheckboxTree
          nodes={renderCategories(category.categories)}
          checked={checked}
          expanded={expanded}
          onCheck={checked => setChecked(checked)}
          onExpand={expanded => setExpanded(expanded)}
          icons={{
            check: <IoIosCheckbox/>,
            uncheck: <IoIosSquareOutline/>,
            halfCheck: <IoIosCheckboxOutline/>,
            expandClose: <IoIosArrowForward/>,
            expandOpen: <IoIosArrowDown/>,
          }}
        />
          </Card.Body>

          <Card.Footer >
          <Button className="btn btn-md btn-dark m-3" onClick={deleteCategory}>Delete</Button>
          <Button className="btn btn-md btn-dark m-3" onClick={updateCategory}>Update</Button>
          </Card.Footer>
        </Card>
        </div>
      </Row>
      
      <AddCategoryModal 
        show={addCategoryModal} 
        handleSubmit={handleAddCategorySubmit} 
        handleClose={handleAddCategoryModal}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={setParentCategoryId}
        CategoryList={createCategoryList}
        category={category}
        handleCategoryImage={handleCategoryImage}/>
      
      <UpdateCategoryModal 
        show={updateCategoryModal} 
        handleSubmit={handleUpdateCategorySubmit} 
        handleClose={handleUpdateModalShow}
        expandedArray={expandedArray}
        setExpandedArray={setExpandedArray}
        checkedArray={checkedArray}
        setCheckedArray={setCheckedArray}
        CategoryList={createCategoryList}
        category={category}/>

        <DeleteCategoryModal
          show={deleteCategoryModal}
          handleSubmit={handledeleteCategorySubmit}
          handleClose={handleDeleteModalShow}
          expandedArray={expandedArray}
          checkedArray={checkedArray}
          />
    </Layout>
   )

 }

export default Category