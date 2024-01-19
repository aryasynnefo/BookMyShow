
const key = localStorage.key(0);
const value = JSON.parse(localStorage.getItem(key));
console.log(value);

let tag=document.getElementById("logout");
let reg=document.getElementById("reg");
reg.style.display = "none";
tag.style.display = "none";
if(value!==null)
{
    function getData()
    {
        fetch("http://localhost:4001/api/home",{
            headers:{"Authorization":`Bearer ${value}`}
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            const {msg}=data;
            document.getElementById("acc").innerHTML=`Hey \n ${msg}`;
            document.getElementById("acc").href="#";
            let acc=document.getElementById("acc");
            acc.style.cssText = `
            color:#ef233c;
            font-weight: bold;
            `;
            tag.style.display = "inline";
            reg.style.display = "inline";
            tag.addEventListener("click",()=>{
                // localStorage.removeItem('key');
                localStorage.clear();
                location.reload();
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    getData();
}



function listData()
{
    let r="",p="";
    fetch("http://localhost:4001/api/get")
    .then((res)=>res.json())
    .then((data)=>{
        data.map((dt)=>{
                r+=`
                <a href="../details/details.html?id=${dt._id}" class="d-link">
                    <div class="items">
                    <img src="${dt.poster}" alt="">
                    <div class="details">
                        <h4 class="m-name">${dt.name}</h4>
                        <h5 class="m-cate">${dt.cate}</h5>
                    </div>
                    </div>
                </a>
            `;
            // if(dt.rate>=9)
            // {
            //     p+=`
            //     <a href="../details/details.html?id=${dt._id}" class="d-link">
            //             <div class="items">
            //             <img src="${dt.poster}" alt="">
            //             <div class="details">
            //                 <h4 class="r-name">${dt.name}</h4>
            //                 <h5 class="r-name">${dt.cate}</h5>
            //             </div>
            //             </div>
            //     </a>
            //     `;
            // }
        })
        document.getElementById("list").innerHTML=r;
        // document.getElementById("list-2").innerHTML=p;
    }).catch((error)=>
    {
        console.log(error);
    })
}
listData();
async function search()
{
    let s="";
    let inp=(document.getElementById("s-inp")).value;
    inp=inp.toUpperCase();
    // inp=inp.toUpperCase();
    // console.log(inp.length);
    fetch("http://localhost:4001/api/get")
    .then((res)=>res.json())
    .then((data)=>{
        data.filter((dt)=>{
            let name=(dt.name).toUpperCase();
            if(name.indexOf(inp)>-1)
                {
                    console.log(name);
                    s+=`
                        <a href="../details/details.html?id=${dt._id}" class="d-link">
                            <div class="items">
                            <img src="${dt.poster}" alt="">
                            <div class="details">
                                <h4 class="m-name">${dt.name}</h4>
                                <h5 class="m-cate">${dt.cate}</h5>
                            </div>
                            </div>
                        </a>
                    `
                }
        })
        document.getElementById("list-1").innerHTML=s;
    }).catch((error)=>
    {
        console.log(error);
    })
}
