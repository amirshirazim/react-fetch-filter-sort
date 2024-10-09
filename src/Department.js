import { useEffect } from "react";
import React,{Component} from "react";
import { Variables } from "./Variable";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export class Department extends Component{
    constructor(props){
        super(props);
        this.state={
            departments:[],
            modalTitle:"",
            departmentName:"Define Department",
            departmentId:0,

            departmentIdFL:"",
            departmentNameFL:"",
            departmentsWithoutFilter:[]
        }
    }

    // FilterFn(){
    //     var DepartmentIdFilter=this.state.departmentIdFL;
    //     var DepartmentNameFilter=this.state.departmentNameFL;
        
    //     var filteredData = this.state.departmentsWithoutFilter.filter(
    //         function(el){
    //             return el.departmentId.toString().toLowerCase().includes(
    //                 DepartmentIdFilter.toString().trim().toLowerCase()
    //             ) || 
    //             el.departmentName.toString().toLowerCase().includes(
    //                 DepartmentNameFilter.toString().trim().toLowerCase())
    //     },
    //     this.setState({departments:filteredData})
    // )
    // }
    FilterFn() {
        var DepartmentIdFilter = this.state.departmentIdFL;
        var DepartmentNameFilter = this.state.departmentNameFL;
    
        var filteredData = this.state.departmentsWithoutFilter.filter(
            (el) => {
                return el.departmentId
                    .toString()
                    .toLowerCase()
                    .includes(DepartmentIdFilter.toString().trim().toLowerCase()) &&
                    el.departmentName
                    .toString()
                    .toLowerCase()
                    .includes(DepartmentNameFilter.toString().trim().toLowerCase());
            }
        );
    
        // Update the departments state after filtering
        this.setState({ departments: filteredData });
    }

    changeDeparmentIdFilter = (e) => {
        this.setState({ departmentIdFL: e.target.value }, () => {
            this.FilterFn(); // Call the filter function after state is updated
        });
    }
    
    changeDeparmentNameFilter = (e) => {
        this.setState({ departmentNameFL: e.target.value }, () => {
            this.FilterFn(); // Call the filter function after state is updated
        });
    }

    SortResualt(prop,asc){
            var sorteddata=this.state.departmentsWithoutFilter.sort(function(a,b){
                if (asc){
                        return (a[prop]>b[prop])?1:(a[prop]<b[prop])?-1:0
                }
                else{
                    return (b[prop]>a[prop])?1:(b[prop]<a[prop])?-1:0
                }
            });
            this.setState({departments:sorteddata});
    }
    refreshList()
    {
        fetch(Variables.Api_url + 'department')
        .then(Response=>Response.json()
        .then(data=>{this.setState({departments:data,departmentsWithoutFilter:data})}));
    }
    componentDidMount(){
        this.refreshList();
    }
    changeDepartmentName=(e)=>{
        //this.setState(e.departmentName,e.target.value);
        this.setState({departmentName: e.target.value});
    }
    addClick(){
        this.setState({
            modalTitle:"Add Department",
            departmentId : 0,
            departmentName :""
        })
    }
    editClick(dep){
        this.setState({
            modalTitle:"Edit Department",
            departmentId : dep.departmentId ,
            departmentName : dep.departmentName
        })
    }
    CreateClick() {
        fetch(Variables.Api_url + 'department', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"  // Fixed header key typo
            },
            body: JSON.stringify({ DepartmentName: this.state.departmentName })  // Correct placement of JSON.stringify
        })
        .then(res => res.json())  // Correctly chaining .then to the fetch
        .then(result => {
            alert(result);
            this.refreshList();
        })
        .catch(error => {
            alert("Failed");
        });
    }
    
    UpdateClick() {
        fetch(Variables.Api_url + 'department', {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"  // Fixed header key typo
            },
            body: JSON.stringify({
                departmentId: this.state.departmentId,
                departmentName: this.state.departmentName })  // Correct placement of JSON.stringify
        })
        .then(res => res.json())  // Correctly chaining .then to the fetch
        .then(result => {
            alert(result);
            this.refreshList();
        })
        .catch(error => {
            alert("Failed");
        });
    }
    DeleteClick(id) { 
        if (window.confirm("Are you sure?")){
        fetch(Variables.Api_url + 'department/' + id, {
            method: "Delete",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"  // Fixed header key typo
            }
        })
        .then(res => res.json())  // Correctly chaining .then to the fetch
        .then(result => {
            alert(result.message);
            this.refreshList();
        })
        .catch(error => {
            alert("Failed");
        });}
    }

    render (){
        const{departments,modalTitle,departmentId,departmentName}=this.state;
        return(
            <div>
                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal"
                data-bs-target="#exampleModal" onClick={()=>this.addClick()}>Add Department</button>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>
                            <div className="d-flex flex-row">
                            <input className="form-control md-2" onChange={this.changeDeparmentIdFilter} placeholder="Filter"/>
                             <button type="button" className="btn btn-light" onClick={()=>this.SortResualt('departmentId',true)}>
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-numeric-up" viewBox="0 0 16 16">
                            <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"/>
                            <path fill-rule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98"/>
                            <path d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707z"/>
                            </svg>
                             </button>
                             <button type="button" className="btn btn-light" onClick={()=>this.SortResualt('departmentId',false)}>
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-numeric-down-alt" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98"/>
                            <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"/>
                            </svg>
                             </button>
                            </div>
                            Department ID
                        </th>
                        <th>
                            <div className="d-flex flex-row">
                            <input className="form-control md-2" onChange={this.changeDeparmentNameFilter} placeholder="Filter"/>
                            <button type="button" className="btn btn-light" onClick={()=>this.SortResualt('departmentName',true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z"/>
                            <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"/>
                            </svg>
                            </button>
                            <button type="button" className="btn btn-light" onClick={()=>this.SortResualt('departmentName',false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-alpha-down-alt" viewBox="0 0 16 16">
                            <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645z"/>
                            <path fill-rule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371zm1.57-.785L11 9.688h-.047l-.652 2.156z"/>
                            <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"/>
                            </svg>
                            </button>
                            </div>
                            Department Name
                        </th>
                        <th>Options</th>
                    </tr>
                    </thead>    
                    <tbody>
                        {departments.map(dep=>
                                        <tr key={dep.departmentId}>
                                            <td>{dep.departmentId}</td>
                                            <td>{dep.departmentName}</td>
                                            <td>
                                                <button type="button" className="btn btn-light mr-1 "
                                                 data-bs-toggle="modal" data-bs-target="#exampleModal" 
                                                 onClick={()=>this.editClick(dep)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                </svg>
                                                </button>
                                                <button type="button" className="btn btn-light mr-1 "
                                                onClick={()=>this.DeleteClick(dep.departmentId)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                </svg>
                                                </button>
                                            </td>
                                        </tr>)}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                   <div className="modal-dialog modal-lg modal-dialog-centered" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.state.modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">DepartmentName</span>
                                <input type="text" className="form-control" value={departmentName}
                                 onChange={this.changeDepartmentName}/>
                            </div>
                            {departmentId==0?<button type="button" className="btn btn-primary float-start"
                                onClick={()=>this.CreateClick()}>
                                Create</button>:null}
                            {departmentId !=0?<button type="button" className="btn btn-primary float-start"
                             onClick={()=>this.UpdateClick()}>
                                    Update</button>:null}
                        </div>
                    </div>
                   </div>
                </div>
            </div>
        )
    }
}