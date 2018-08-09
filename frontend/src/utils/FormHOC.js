import React from 'react';
import * as auth from '~/src/auth/authCalls';

const FormHOC = PassedComponent => {
  class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        fields: {},
        field_errors: {},
        field_touched: {},
      };
      this.onChangeHandler = this.onChangeHandler.bind(this);
      this.resetFields = this.resetFields.bind(this);
      this.setValue = this.setValue.bind(this);
    }

    onChangeHandler = event => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      let fields = this.state.fields;
      let field_touched = this.state.field_touched;
      let field_errors = this.state.field_errors;
      field_touched[name] = true;
      fields[name] = value;
      this.setState({
        fields: fields,
        field_touched: field_touched,
      });

      if (target.required) {
        if (value.length <= 0) {
          field_errors[name] = 'Este campo es requerido';
          this.setState({
            field_errors: field_errors,
          });
        } else {
          if (field_errors[name]) {
            delete field_errors[name];
          }
          this.setState({field_errors: field_errors});
        }
      }

      if (target.getAttribute('equalto')) {
        let equalto = target.getAttribute('equalto');
        if (value != this.state.fields[equalto]) {
	      console.log(name, value, "eaqual",this.state.fields[equalto])
          field_errors[name] = 'Este campo es diferente a ' + equalto;
          this.setState({
            field_errors: field_errors,
          });
        } else {
          if (field_errors[name]) {
            delete field_errors[name];
          }
          this.setState({field_errors: field_errors});
        }
      }
      if (target.min) {
        if (value.length < target.min) {
          field_errors[name] = 'Enter at least ' + target.min + ' characters';
          this.setState({
            field_errors: field_errors,
          });
        } else {
          if (field_errors[name]) {
            delete field_errors[name];
          }
          this.setState({field_errors: field_errors});
        }
      }
      if (target.type == 'email') {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          field_errors[name] = 'Invalid email';
          this.setState({
            field_errors: field_errors,
          });
        } else {
          if (field_errors[name]) {
            delete field_errors[name];
          }
          this.setState({field_errors: field_errors});
        }
      }
    };
    resetFields = () => {
      this.setState({
        fields: {},
      });
    };

    setValue = (name, value) => {
      this.setState({[name]: value});
    };
    render = () => {
      return (
        <PassedComponent
          {...this.props}
          onChangeHandler={this.onChangeHandler}
          fields={this.state.fields}
          resetFields={this.resetFields}
          setValue={this.setValue}
          errors={this.state.field_errors}
          touches={this.state.field_touched}
        />
      );
    };
  }
  return Form;
};

export default FormHOC;
