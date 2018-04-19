import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';

class RecordForm extends Component{
    constructor(){
        super();
        this.state={
            date:'',
            title:'',
            amount:''
        };
    }
    handleChange(e){
        // let name,obj;
        // name=e.target.name;
        // obj={};
        // obj[''+ name]=e.target.value;
        // this.setState(obj)
        this.setState({
            date:this.refs.date.value,
            title:this.refs.title.value,
            amount:this.refs.amount.value
        })
    }
    valid(){
        return this.state.title && this.state.date && this.state.amount
    }
    handleSubmit(e){
        e.preventDefault();
        const data={
            date:this.state.date,
            title:this.state.title,
            amount:Number.parseInt(this.state.amount,0)
        };
        RecordsAPI.create(data).then(
            response=>{
                this.props.handleNewRecord(response.data);
                this.setState({
                    date:'',
                    title:'',
                    amount:''
                })
            }
        ).catch(
            error=>console.log(error.message)
        )
    }
    render(){
        return(
            <form className='form-line' onSubmit={this.handleSubmit.bind(this)}>
                <div className='form-row mb-1'>
                    <div className='col'>
                        <input
                            type="text"
                            className='form-control'
                            ref='date'
                            placeholder='Date'
                            value={this.state.date}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div className='col'>
                        <input
                            type="text"
                            className='form-control'
                            ref='title'
                            placeholder='Title'
                            value={this.state.title}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div className='col'>
                        <input
                            type="text"
                            className='form-control'
                            ref='amount'
                            placeholder='Amount'
                            value={this.state.amount}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <button type='submit' disabled={!this.valid()} className='btn btn-primary'>Create Record</button>
                </div>
            </form>
        )
    }
}

export default RecordForm;