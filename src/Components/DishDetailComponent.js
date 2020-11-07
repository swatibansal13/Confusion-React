import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Button, Modal, ModalBody, ModalHeader,
 Label, Row } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<=len);
const minLength = (len) => (val) => (val) && (val.length>=len);

class RenderDish extends Component {

    constructor(props) {
        super(props)

        this.state= {
            isModalOpen:false
        }

        this.toggleModalForm = this.toggleModalForm.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    toggleModalForm() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    handleSubmitForm(values) {
        console.log("Comments Submitted: " +JSON.stringify(values))
        alert("Comments Submitted: " +JSON.stringify(values))  
    }

    CommentForm=()=> {
        console.log(this.state)
        return(
    
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModalForm}>
                <ModalHeader toggle={this.toggleModalForm}>Submit Comment</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <LocalForm onSubmit={(values) => this.handleSubmitForm(values)}>
                            <Row className="form-group">
                                <Label>Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control col-12">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>

                            <Row className="form-group">
                                <Label>Your Name</Label>
                                <Control.text model=".yourname" id="yourname" name="yourname" className="form-control"
                                validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>
                                <Errors className="text-danger" model=".yourname" show="touched" messages={{
                                    required: ' Required',
                                    minLength: ' Must be greater than 2 numbers',
                                    maxLength: ' Must be less than 15 numbers'
                                }}/>
                            </Row>

                            <Row className="form-group">
                                <Label>Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment" className="form-control"/>
                            </Row>

                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </div>
                </ModalBody>
            </Modal>
    
        );
    
    }

    RenderComments(comments)  {
        if(comments!=null) {
            return(
                <div className ="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((comment)=>{    
                                return(
                                    <div>
                                        <li key={comment.id}>
                                        <p>{comment.comment}</p>
                                        <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short',
                                         day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
                                        </li>
                                    </div>
                                );
                            })
                        } 
                    </ul>
                    <Button outline onClick={this.toggleModalForm}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                </div>
            );
        }
        else{
            return (
                <div></div>
            );
        }
    }
    render() {
    const dish=this.props.dish;
    const comments=this.props.comments;

        if(dish!=null) {
            return(
                <>
                    <div className="container">
                    <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                             <CardTitle>{dish.name}</CardTitle>
                             <CardText>{dish.description}</CardText>
                         </CardBody>
                    </Card>  
                    </div> 
                    {this.RenderComments(comments)}
                    </div>
                </div>
                {this.CommentForm()}
                {/* <this.CommentForm/> */}
                </>
            );
        }

        else {
            return(
                <div></div>
            );
        }
    }
}

export default RenderDish;

// import React, {Component} from 'react';
// import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Button, Modal, ModalBody, ModalHeader,
// Form,FormGroup, Label, Input } from 'reactstrap';
// import {Link} from 'react-router-dom';

// const toggleModal= false;

// function toggleModalForm() {
//     toggleModal=true;
// }

// function handleLoginForm(event) {
//     alert("Usename: "+this.username.value + "Password: " + this.password.value + "Remember: " + this.remember.checked);
//     event.preventDefault();

// }

// function CommentForm() {
//     return(
//         <Modal toggle={toggleModalForm}>
//             <ModalHeader toggle={toggleModalForm}>Submit Comment</ModalHeader>
//             <ModalBody>
//                 <Form onSubmit={handleLoginForm}>
//                     <FormGroup>
//                         <Label>Rating</Label>
//                         <Input type="text"/>
//                     </FormGroup>
//                     <FormGroup>
//                         <Label>Your Name</Label>
//                         <Input type="text"/>
//                     </FormGroup>
//                     <FormGroup>
//                         <Label>Comment</Label>
//                         <Input type="textarea"/>
//                     </FormGroup>
//                     <Button type="submit" value="submit" color="primary">Submit</Button>
//                 </Form>
//             </ModalBody>
//         </Modal>

//     );

// }

// function RenderComments({comments})  {
//         if(comments!=null) {
//             return(
//                 <div className ="col-12 col-md-5 m-1">
//                     <h4>Comments</h4>
//                     <ul className="list-unstyled">
//                         {comments.map((comment)=>{    
//                                 return(
//                                     <div>
//                                         <li key={comment.id}>
//                                         <p>{comment.comment}</p>
//                                         <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short',
//                                          day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
//                                         </li>
//                                     </div>
//                                 );
//                             })
//                         } 
//                     </ul>
//                     <Button outline onClick={CommentForm}><span className="fa fa-sign-in fa-lg"></span>Submit Comment</Button>
//                 </div>
//             );
//         }
//         else{
//             return (
//                 <div></div>
//             );
//         }
//     }

//     function RenderDish({dish,comments}) {
//         if(dish!=null) {
//             return(
//                 <div className="container">
//                     <div className="row">
//                     <Breadcrumb>
//                         <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
//                         <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
//                     </Breadcrumb>
//                     <div className="col-12">
//                         <h3>{dish.name}</h3>
//                         <hr/>
//                     </div>
//                     <div className="col-12 col-md-5 m-1">
//                     <Card>
//                         <CardImg width="100%" src={dish.image} alt={dish.name} />
//                         <CardBody>
//                              <CardTitle>{dish.name}</CardTitle>
//                              <CardText>{dish.description}</CardText>
//                          </CardBody>
//                     </Card>  
//                     </div> 
//                     <RenderComments comments={comments}/>
//                     </div>
//                 </div>
//             );
//         }

//         else {
//             return(
//                 <div></div>
//             );
//         }
//     }

// export default RenderDish;