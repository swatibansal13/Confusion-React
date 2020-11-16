import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Button, Modal, ModalBody, ModalHeader, Label, Row } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { addComment } from '../redux/ActionCreators';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

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
        this.props.addComment(this.props.dish.id, values.rating, values.yourname, values.comment);
    }

    CommentForm=()=> {
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

    RenderComments=(props)=>  {
        if(props.comments!=null) {
            return(
                <div className ="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {props.comments.map((comment)=>{    
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

    if(this.props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        )
    }

    else if(this.props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{this.props.errMess}</h4>
                </div>
            </div>
        )
    }

    else if(dish!=null) {
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
                        
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                             <CardTitle>{dish.name}</CardTitle>
                             <CardText>{dish.description}</CardText>
                         </CardBody>
                    </Card>  
                    </div> 
                    {/* {this.RenderComments(comments)} */}
                     <this.RenderComments comments={this.props.comments} addComment={this.props.addComment}
                        dishId={this.props.dish.id}/>
                    </div>
                </div>
                
                <this.CommentForm dishId={dish.id} addComment={addComment}/>
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

