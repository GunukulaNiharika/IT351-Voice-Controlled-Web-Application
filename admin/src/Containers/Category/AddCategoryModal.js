import NewModal from '../../UI/Modal/Modal';
import { Row, Col } from 'react-bootstrap';
import FromInput from '../../UI/FormInput';


const addCategoryModal = (props) =>{

    return(
        <NewModal 
        size={"md"} 
        show={props.show} 
        handleSubmit={props.handleSubmit} 
        buttonTitle = {"ADD"}
        handleClose={props.handleClose} 
        Title={"ADD CATEGORY"}>
      <Row>
        <Col className="mt-2 col-12" >
            <FromInput
                value={props.categoryName}
                placeholder={`Category Name`}
                onChange={(e) => props.setCategoryName(e.target.value)}
                className="form-control-sm col-md-12"
            />
        </Col>
        <Col className="mt-2 col-12">
            <select
                className="form-control form-control-sm"
                value={props.parentCategoryId}
                onChange={(e) => props.setParentCategoryId(e.target.value)}>
                <option>select Parent Category</option>
                {
                  props.CategoryList(props.category.categories).map(option=>
                    <option key={option.value} value={option.value}>{option.name}</option>)
                }
            </select>
        </Col>
      </Row>
      <Row>
          <Col className="mt-2 col-12">
              <FromInput 
                className="form-control form-control-sm input-class" 
                type="file" 
                name="categoryImage" 
                onChange={props.handleCategoryImage} />
          </Col>
      </Row>
      </NewModal>
    );
}

export default addCategoryModal;