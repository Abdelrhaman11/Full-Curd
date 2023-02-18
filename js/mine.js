var title=document.getElementById('title');
var price=document.getElementById('price');
var taxes=document.getElementById('taxes');
var ads=document.getElementById('ads');
var discount=document.getElementById('discount');
var total=document.getElementById('total');
var count=document.getElementById('count');
var category=document.getElementById('category');
var submit=document.getElementById('submit');
var mood='create';
var tmp;

function getTotal(){

if(price.value !='')
 {
    var result=(+price.value + +taxes.value + +ads.value - +discount.value);
    total.innerHTML=result;
    total.style.background='#040';
 }
 else{
    total.innerHTML='';
    total.style.background='#a00d02';
 }

}

var datalist;

if(localStorage.getItem('product') === null)
{
    datalist=[];
}
else{
    var datalist=JSON.parse(localStorage.getItem('product'))
    showData();

}



submit.onclick=function()
{
    var list ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(mood === 'create')
    {
        if(list.count>1)
        {
            for(var i=0 ;i<list.count;i++)
            {
                datalist.push(list);
    
            }
        }
        else{
            datalist.push(list);
    
        }
    }
    else{
        datalist[tmp]=list;
        mood='create';
        submit.innerHTML='create';
        count.style.display='block';
    }
    
    localStorage.setItem('product',JSON.stringify(datalist))
    showData();
    clear();


}

function clear(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}


function showData(){

    getTotal();



    var table='';
    for(var i=0;i<datalist.length;i++)
    {
        table +=`
        <tr>
        <td>${i}</td>
        <td>${datalist[i].title}</td>
        <td>${datalist[i].price}</td>
        <td>${datalist[i].taxes}</td>
        <td>${datalist[i].ads}</td>
        <td>${datalist[i].discount}</td>
        <td>${datalist[i].total}</td>
        <td>${datalist[i].category}</td>
        <td><button onclick="updataData(${i})" id="updata">updata</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr> `
    }
    document.getElementById('tbody').innerHTML= table;
    var btnDelete=document.getElementById('deleteAll')
    if(datalist.length>0)
    {
        btnDelete.innerHTML=`
        <button onclick="deleteAll()">delete All ${datalist.length}</button>
        `
    }
    else
    {
        btnDelete.innerHTML='';
    }
}



function deleteData(index){

    datalist.splice(index,1);
    localStorage.setItem('product',JSON.stringify(datalist));
    showData()

}

function deleteAll(){
    localStorage.clear();
    datalist.splice(0);
    showData();
}



function updataData(i)
{

title.value=datalist[i].title;
price.value=datalist[i].price;
taxes.value=datalist[i].taxes;
ads.value=datalist[i].ads;
discount.value=datalist[i].discount;
getTotal();
count.style.display='none';
category.value=datalist[i].category;
submit.innerHTML='Updata'
mood='udata'
tmp=i;
scroll({
    top:0,
    behavior:"smooth",
})
}






var searchMood='title';
function getSearchMood(id)
{
    var search =document.getElementById('search');

    if(id == 'searchTitle')
    {

        searchMood='title';
        search.placeholder='Search By Title';

    }
    else{

        searchMood='category';
        search.placeholder='Search By Category';

    }
    search.focus();

}





function searchData(){
    var Search=document.getElementById('search');
    var table='';
    if(searchMood=='title')
    {
        for(var i=0;i<datalist.length;i++)
        {
        if(datalist[i].title.toLowerCase().includes(search.value))
        {
    
        table +=`
        <tr>
        <td>${i}</td>
        <td>${datalist[i].title}</td>
        <td>${datalist[i].price}</td>
        <td>${datalist[i].taxes}</td>
        <td>${datalist[i].ads}</td>
        <td>${datalist[i].discount}</td>
        <td>${datalist[i].total}</td>
        <td>${datalist[i].category}</td>
        <td><button onclick="updataData(${i})" id="updata">updata</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr> `
        }
    }
    
    }
    else{
        for(var i=0;i<datalist.length;i++)
        {
        if(datalist[i].category.toLowerCase().includes(search.value))
        {
    
        table +=`
        <tr>
        <td>${i}</td>
        <td>${datalist[i].title}</td>
        <td>${datalist[i].price}</td>
        <td>${datalist[i].taxes}</td>
        <td>${datalist[i].ads}</td>
        <td>${datalist[i].discount}</td>
        <td>${datalist[i].total}</td>
        <td>${datalist[i].category}</td>
        <td><button onclick="updataData(${i})" id="updata">updata</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr> `
        }
    }
    }
    document.getElementById('tbody').innerHTML= table;



}

