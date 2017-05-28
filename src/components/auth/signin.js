import React , { Component } from 'react'; 
import { Field , reduxForm } from 'redux-form'; 
import { connect } from 'react-redux'; 
import * as actions from '../../actions';


class Signin extends Component { 
    
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
    
    
   handleFormSubmit({ email , password }){
       
      this.props.signinUser( { email , password});
         
   } 
    
   renderAlert(){
              
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
            {this.renderAlert()}
           <button type="submit" className="btn btn-primary">Sign in</button>
       </form>
          
     )
   }
}

function mapStateToProps(state){
    
   return {
       errorMessage : state.auth.error
   }   
}



export default reduxForm({
    
    form : 'signin'

})(
    // stack up connect components 
    
    // now createPost is available in this.props
   connect(mapStateToProps, actions )(Signin)


);