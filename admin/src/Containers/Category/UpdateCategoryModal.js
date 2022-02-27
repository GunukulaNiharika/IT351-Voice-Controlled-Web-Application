import NewModal from '../../UI/Modal/Modal';
import { Row, Col } from 'react-bootstrap';
import FromInput from '../../UI/FormInput';



const UpdateCategoryModal = (props) =>{


    const handleCategoryInput = async (key, value, index, type) => {
        if(type == 'checked'){
          const updatedCheckedArray = props.checkedArray.map((item, ind)=>index==ind ? {...item, [key] : value}: item);
          await props.setCheckedArray(updatedCheckedArray)
        }
        else if(type == 'expanded'){
          const updatedExpandedArray = props.expandedArray.map((item, ind)=>index==ind ? {...item, [key] : value}: item);
          props.setExpandedArray(updatedExpandedArray);
        }
    }

    return(
        <NewModal 
        size={"lg"} 
        show={props.show} 
        handleSubmit={props.handleSubmit} 
        buttonTitle = {"UPDATE"}
        handleClose={props.handleClose} 
        Title={"UPDATE CATEGORY"}>
            <Row>
                <Col>
                <h5>Expanded Categories</h5>
                </Col>
            </Row>
            {
                props.expandedArray.length > 0 &&
                props.expandedArray.map((item,index)=>
                <Row key={index}>
                    <Col sm={12} md={4}>
                        <FromInput
                            value={item.name}
                            placeholder={`Category Name`}
                            onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                            className="form-control-sm col-md-12"
                        />
                    </Col>
                    <Col sm={12} md={4}>
                        <select
                            className="form-control form-control-sm input-class"
                            value={item.parentId}
                            onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                            <option>select Parent Category</option>
                            {
                            props.CategoryList(props.category.categories).map(option=>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                            }
                        </select>
                    </Col>
                    <Col sm={12} md={4}>
                        <select 
                            className="form-control form-control-sm input-class"
                            value={item.type}
                            onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}>
                        <option value="">Select Type</option>
                        <option value="Store">Store</option>
                        <option value="Product">Product</option>
                        <option value="Page">Page</option>
                        </select>
                    </Col>
                </Row>
                )
            }
            <Row>
                <Col>
                <h5>Checked Categories</h5>
                </Col>
            </Row>
            {
                props.checkedArray.length > 0 &&
                props.checkedArray.map((item,index)=>
                <Row key={index}>
                    <Col sm={12} md={4}>
                        <FromInput
                            value={item.name}
                            placeholder={`Category Name`}
                            onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                            className="form-control-sm col-md-12"
                        />
                    </Col>
                    <Col sm={12} md={4}>
                        <select
                            className="form-control form-control-sm input-class"
                            value={item.parentId}
                            onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                            <option>select Parent Category</option>
                            {
                            props.CategoryList(props.category.categories).map(option=>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                            }
                        </select>
                    </Col>
                    <Col sm={12} md={4}>
                        <select  className="form-control form-control-sm input-class"
                            value={item.type}
                            onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}>
                        <option value="">Select Type</option>
                        <option value="Store">Store</option>
                        <option value="Product">Product</option>
                        <option value="Page">Page</option>
                        </select>
                    </Col>
                </Row>
                )
            }

            {/* <Row>
                <Col className="mt-2 col-12">
                    <FromInput type="file" name="categoryImage" onChange={handleCategoryImage} />
                </Col>
            </Row> */}
      </NewModal>
    );
}

export default UpdateCategoryModal;