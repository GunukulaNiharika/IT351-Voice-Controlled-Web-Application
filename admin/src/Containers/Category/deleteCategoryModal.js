const { default: NewModal } = require("../../UI/Modal/Modal");


const DeleteCategoryModal = (props) =>{
    return(

        <NewModal 
        size={"md"} 
        show={props.show} 
        // handleSubmit={props.handleSubmit} 
        // buttonTitle = {"Delete"}
        handleClose={props.handleClose} 
        Title={"DELETE CATEGORY"}
        buttons = {[
            {
              label: "No",
              color: "warning",
              onClick: props.handleClose
            },
            {
              label: "Yes",
              color: "danger",
              onClick: props.handleSubmit
            }
          ]}>
            {/* <h5>Expanded</h5>
            {
                props.expandedArray.map((item, index) => 
                    <h6 key={index}>{item.name}</h6>
                )
            } */}
            <h5>Checked</h5>
            {
                props.checkedArray.map((item, index) =>
                    <h6 key={index}>{item.name}</h6>)
            }
        </NewModal>
    );
}

export default DeleteCategoryModal;