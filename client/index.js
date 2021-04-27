
document.addEventListener ('DOMContentLoaded',function(){
    reloadTable();

});
function reloadTable(){
    hideEditFields();
    fetch('http://localhost:5000/getAll')
    .then (response=>response.json())//convert the response to json
    .then(data => loadHTMLTable(data['data']));//this is where we get the data back in json format
    
}

function hideEditFields(){
    const updatename= document.querySelector('#update-row');
    updatename.hidden= true;

}

document.querySelector('table.tbldb tbody').addEventListener('click',function(event){
    if(event.target.className==="delete-row-btn"){
        deleteRowById(event.target.dataset.id);
    }if(event.target.className==="edit-row-btn"){
        handleEditRow(event.target.dataset.id);
        selectRowEdit(event.target.dataset.id);
    }
});

function selectRowEdit(id){
    fetch('http://localhost:5000/getSelected/'+id)
    .then (response=>response.json())//convert the response to json
    .then(data => populateEditFields(data['data']));//this is where we get the data back in json format


    
}
function populateEditFields(data){
    console.log(data);
    let tableHtml="";
    data.forEach(function({id, name, qty, amount}){

        document.querySelector('#update-name-input').value=`${name}`;
        document.querySelector('#update-qty-input').value=`${qty}`;
        document.querySelector('#update-amnt-input').value=`${amount}`;

    });

}

const updateBtn   = document.querySelector('#update-row-btn');
const searchBtn =  document.querySelector('#search-btn');

searchBtn.onclick=function(){
    const searchValue=document.querySelector('#search-input').value;
    console.log("searchValue: " +searchValue);

    fetch('http://localhost:5000/search/'+searchValue)
    .then (response=>response.json())//convert the response to json
    .then(data => loadHTMLTable(data['data']));//this is where we get the data back in json format

}
function deleteRowById(id){
    fetch('http://localhost:5000/delete/'+id,{
        method: 'DELETE'
    })
    .then(response => response.json())
    .then (data =>{
        if(data.success){
            reloadTable();
        }
    });
    
}



function handleEditRow(id){
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden= false;
    document.querySelector('#update-row-btn').dataset.id = id;

    


}

updateBtn.onclick = function(){
    

  /*  let UpdatedData = {
        id: document.querySelector('#update-row-btn').dataset.id,
        itemname: document.querySelector('#update-name-input').value,
        qty :  document.querySelector('#update-qty-input').value,
        amt : document.querySelector('#update-amnt-input').value
    };
    document.querySelector('#update-name-input').value="";
    document.querySelector('#update-qty-input').value="";
    document.querySelector('#update-amnt-input').value="";
    */
    fetch('http://localhost:5000/update',{
        method: 'PATCH',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            id: document.querySelector('#update-row-btn').dataset.id,
            itemname: document.querySelector('#update-name-input').value,
            qty :  document.querySelector('#update-qty-input').value,
            amt : document.querySelector('#update-amnt-input').value
        })
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.success){
            reloadTable();
        }
    });

}
const addBtn = document.querySelector('#additem-btn');

addBtn.onclick = function(){
    //const nameInput = document.querySelector('#name-input');
    let nameInput = {
        itemname: document.querySelector('#name-input').value,
        qty :  document.querySelector('#qty-input').value,
        amt : document.querySelector('#amnt-input').value
    };
    document.querySelector('#name-input').value="";
    document.querySelector('#qty-input').value="";
    document.querySelector('#amnt-input').value="";
    //const name = nameInput.value;
    //nameInput.value="";

    fetch('http://localhost:5000/insert', {
        headers:{
            'Content-type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify(nameInput)
    })
    .then(response=>response.json())
    .then(data=> reloadTable());
   
}

function loadHTMLTable(data){
    const table = document.querySelector('table.tbldb tbody');


    if ( data.length === 0 ){
        table.innerHTML="<tr><td class='no-data' colspan='6'>No Data</td></tr>";
        return;
    }
    console.log(data);
    let tableHtml="";
    data.forEach(function({id, name, qty, amount}){
        tableHtml+=`<tr>`;
        tableHtml+=`<td>${id}</td>`;
        tableHtml+=`<td>${name}</td>`;
        tableHtml+=`<td>${qty}</td>`;
        tableHtml+=`<td>${amount}</td>`;
        tableHtml+=`<td><button class = "delete-row-btn" data-id=${id}>Delete</td>`;
        tableHtml+=`<td><button class = "edit-row-btn" data-id=${id}>Edit</td>`;
        tableHtml+=`</tr>`;

    });
    table.innerHTML =tableHtml;
}