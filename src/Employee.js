import { useEffect } from "react";
import React,{Component} from "react";
import { Variables } from "./Variable";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export class Employee extends Component{
    constructor(props){
        super(props);
        this.state={
            departments:[],
            employees:[],
            modalTitle:"",
            employeeName:"Define employee",
            employeeId:0,
            department:"",
            DateofJoining: "",
            Photofilename: "anonymous.png",
            PhotoPath: Variables.Photo_url
        }
    }
    
    refreshList()
    {
        fetch(Variables.Api_url + 'employee')
        .then(response=>response.json()
        .then(data=>{this.setState({employees:data})}));

        fetch(Variables.Api_url + 'department')
        .then(response=>response.json()
        .then(data=>{this.setState({departments:data})}));
    }
    componentDidMount(){
        this.refreshList();
    }
    changeEmployeeName=(e)=>{
        this.setState({employeeName: e.target.value});
    }

    changeDepartmentName=(e)=>{
        this.setState({department: e.target.value});
    }
    changeDateofJoining=(e)=>{
        this.setState({DateofJoining: e.target.value});
    }

    changePhoto=(e)=>{
        this.setState({Photofilename: e.target.value.split('\\').pop()});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Employee",
            employeeId : 0,
            employeeName :"",
            department:"",
            DateofJoining: "",
            Photofilename: "anonymous.png"
        })
    }
    editClick(emp){
        this.setState({
            modalTitle:"Edit Employee",
            employeeId : emp.employeeId,
            employeeName : emp.employeeName,
            department: emp.departmentName,
            DateofJoining: emp.dateOfJoining.split('T')[0],
            Photofilename: emp.PhotoFileNAme
        })
    }
    CreateClick() {
        fetch(Variables.Api_url + 'employee', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"  
            },
            body: JSON.stringify({
                employeeId : this.state.employeeId,
                employeeName : this.state.employeeName,
                DepartmentName: this.state.department,
                DateofJoining: this.state.DateofJoining,
                Photofilename: this.state.Photofilename
             })  
        })
        .then(res => res.json())  
        .then(result => {
            alert(result.message);
            this.refreshList();
        })
        .catch(error => {
            alert("Failed");
        });
    }
    
    UpdateClick() {
        fetch(Variables.Api_url + 'employee', {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"  
            },
            body: JSON.stringify({
                employeeId : this.state.employeeId,
                employeeName : this.state.employeeName,
                DepartmentName: this.state.department,
                DateofJoining: this.state.DateofJoining,
                Photofilename: this.state.Photofilename
             })  
        })
        .then(res => res.json())  
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
            fetch(Variables.Api_url + 'employee/' + id, {
                method: "DELETE",  
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json" 
                }
            })
            .then(res => res.json())
            .then(result => {
                alert(result);
                this.refreshList();
            })
            .catch(error => {
                alert("Failed");
            });
        }
    }
    

    ImageUpload=(e)=>{
        if (e.target.files.lenght>0){
        const formData = new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name)

        this.setState({Photofilename: e.target.files[0].name});

        fetch(Variables.Api_url+"employee/savefile",{
            method:"post",
           body:formData
        })
        .then(res=>res.json())
        .then(data=>{console.log(data)});
        //.then(data=>{this.setState({Photofilename:data})});
        console.log(this.state.PhotoPath+ this.state.Photofilename);
    }
    }

    render (){
        const{
            departments,
            employees,
            employeeId,
            employeeName,
            modalTitle,
            department,
            DateofJoining,
            Photofilename,
            PhotoPath
            }=this.state;
        return(
            <div>
                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal"
                data-bs-target="#exampleModal" onClick={()=>this.addClick()}>Add Employee</button>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>Date of Joining</th>
                        <th>Options</th>
                    </tr>
                    </thead>    
                    <tbody>
                        {employees.map(emp=>
                                        <tr key={emp.employeeId}>
                                            <td>{emp.employeeId}</td>
                                            <td>{emp.employeeName}</td>
                                            <td>{emp.departmentName}</td>
                                            <td>{emp.dateOfJoining.split('T')[0]}</td>
                                            <td>
                                                <button type="button" className="btn btn-light mr-1 "
                                                 data-bs-toggle="modal" data-bs-target="#exampleModal" 
                                                 onClick={()=>this.editClick(emp)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                </svg>
                                                </button>
                                                <button type="button" className="btn btn-light mr-1 "
                                                onClick={()=>this.DeleteClick(emp.employeeId)}>
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
                        <div className="d-flex flex-row bd-highlight mb-3">
                          <div className="col">
                          <div className="p-2 w-80">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Employee Name</span>
                                    <input type="text" className="form-control" value={employeeName}
                                    onChange={this.changeEmployeeName}/>
                                </div>
                           </div>

                        <div className="p-2 w-80">
                           <div className="input-group mb-3">
                               <span className="input-group-text">Department</span>
                               <select className="form-select" value={this.state.department} onChange={this.changeDepartmentName}>
                                   {departments.map(dep =>
                                       <option key={dep.departmentId} value={dep.departmentName}>
                                           {dep.departmentName}
                                       </option>
                                   )}
                               </select>
                           </div>
                       </div>
                       

                           <div className="p-2 w-80">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Date Of Joining</span>
                                    <input type="date"  className="form-control" value={this.state.DateofJoining}
                                    onChange={this.changeDateofJoining}/>
                                </div>
                           </div>
                           </div>

                         
                           <div className="p-2 w-50 bd-50">
                                <img width="250px" height="250px" alt="Employee" src={this.state.PhotoPath+ this.state.Photofilename} />
                                <input className="m-2" type="file" onChange={this.ImageUpload}/>
                            </div> 
                            </div>

                            {employeeId==0?<button type="button" className="btn btn-primary float-start"
                                onClick={()=>this.CreateClick()}>
                                Create</button>:null}
                            {employeeId !=0?<button type="button" className="btn btn-primary float-start"
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