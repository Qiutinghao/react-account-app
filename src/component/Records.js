import React, { Component } from 'react';
import Record from './Record';
import * as RecordsAPI from '../utils/RecordsAPI';
import RecordForm from './RecordForm';
import AmountBox from  './AmountBox';
import '../App.css';

class Records extends Component {
    constructor(){
        super();
        this.state={
            records:[],
            error:null,
            isLoaded:false
        }
    }
    componentWillMount(){
        RecordsAPI.getAll().then(
            (response)=>{return(
                this.setState({
                    records:response.data,
                    isLoaded:true
                })
            )}
        ).catch(
            error=>this.setState({
                error,
                isLoaded:true
            })
        )
    }
    addRecord(record){
        this.setState({
            records:[
                ...this.state.records,
                record
            ],
            error:null,
            isLoaded:true
        })
    }
    updateRecord(record,data){
        const recordIndex=this.state.records.indexOf(record);
        const newRecords=this.state.records.map((item,index)=>{
            if((index!==recordIndex)){
                return item
            }
            return{
                ...item,
                ...data
            }
        });
        this.setState({
            records:newRecords
        })
    }
    deleteRecord(record){
        const recordIndex=this.state.records.indexOf(record);
        const newRecords=this.state.records.filter((item,index)=>index!==recordIndex);
        this.setState({
            records:newRecords
        })
    }
    credits(){
        let credits=this.state.records.filter((record)=>{
            return record.amount>=0;
        });
        return credits.reduce((prev,curr)=>{
            return prev+Number.parseInt(curr.amount,0);
        },0)
    }
    debits(){
        let credits=this.state.records.filter((record)=>{
            return record.amount<0;
        });
        return credits.reduce((prev,curr)=>{
            return prev+Number.parseInt(curr.amount,0);
        },0)
    }
    balance(){
       return this.credits()+this.debits()
    }
  render() {
        const {error,isLoaded,records}=this.state;
        let recordsComponent;
        if(error){
            recordsComponent=<div>Error:{error.message}</div>
        }else if(!isLoaded){
               recordsComponent=<div>Loading....</div>
        }else{
                recordsComponent=(
                    <div>
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Tittle</th>
                                <th>amount</th>
                                <th>actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {records.map((record)=> (
                                <Record
                                    key={record.id}
                                    record={record}
                                    handleEditRecord={this.updateRecord.bind(this)}
                                    handleDelet={this.deleteRecord.bind(this)}
                                />)
                            )}
                            </tbody>
                        </table>
                    </div>
                )
        }
        return(
            <div className='container'>
                <h2 ><span className='title'>西西公主专用账本</span></h2>
                <div className='row md-3' style={{marginBottom:10}}>
                    <AmountBox text='Credit' type='success' amount={this.credits()} />
                    <AmountBox text='Debit' type='danger' amount={this.debits()} />
                    <AmountBox text='Balance' type='info' amount={this.balance()} />
                </div>
                <RecordForm  handleNewRecord={this.addRecord.bind(this)}/>
                {recordsComponent}
            </div>
        )
  }
}
export default Records;
