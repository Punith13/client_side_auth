import React , { Component } from 'react'; 
import { Field,  reduxForm } from 'redux-form';
import { connect } from 'react-redux'; 
import * as actions from '../../actions'; 

class Signup extends Component{
    
    renderField(field){
        
        // complete destructuring -> meta = field.meta ; 
        // touched = field.meta.touched 
        // error = field.meta.error 
        
     const { meta : { touched , error } } = field; 
    
     const className = `form-group ${ touched &&  error ? 'has-danger' : ''}`;
        
        return(
            <div className = {className}>
                <label>{field.label}</label>
                <input className="form-control"
                 type={field.type}   
                 {...field.input} 
                 /> 
                <div className="text-help">
                    { touched ?  error : ''}
                </div>
                
            </div>
        );
    }
    
    renderAlert(){
            
           return (
               
            <div className="alert alert-danger">
               <strong>Oops!</strong> {this.props.errorMessage}
            </div> 
               
         )
                 
    }
    
    handleFormSubmit({ email , password }){
       
       this.props.signupUser( { email , password});
         
   }
    
  renderAlert(){
     
       console.log("in RenderAlert" , this.props.errorMessage);
       
       if(this.props.errorMessage){
           
           return (
               
            <div className="alert alert-danger">
               <strong>Oops!</strong> {this.props.errorMessage}
            </div> 
               
         )
           
       }
   }
    
    render(){
    
     const { handleSubmit } = this.props; 
       
      return(
          
         <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) } >
               <Field
                    label="Email"
                    name="email"
                    type="text"
                    component={this.renderField}
                /> 
                <Field
                    label="Password"
                    name="password"
                    type="password"
                    component={this.renderField}
                /> 
              <Field
                    label="Confirm Password"
                    name="passwordConfirm"
                    type="password"
                    component={this.renderField}
                />  
        {this.renderAlert()}
           <button type="submit" className="btn btn-primary">Sign Up</button>
       </form>
          
     )
        
    }
    
}

function validate(values){
            
    const errors = {}; 
        
    if(!values.email){
        
        errors.email = "Enter a valid email address"; 
    }
        
    if(!values.password){
        errors.password = "Enter password"; 
    }
    
    if(values.password != values.passwordConfirm){
        errors.passwordConfirm = "Passwords must match";
    }
    
    
    return errors; 
    
}

function mapStateToProps(state){
    
   return {
       errorMessage : state.auth.error
   }  

}

export default reduxForm({
    
    validate , 
    
    form : 'signup'
    
})(
    connect( mapStateToProps , actions)(Signup)
    
);