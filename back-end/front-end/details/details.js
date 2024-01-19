
const key = localStorage.key(0);
const value = JSON.parse(localStorage.getItem(key));
console.log(value);

let tag=document.getElementById("logout");
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

async function detailsPage()
{
    let url=window.location.href;
    var urlParams=new URLSearchParams(url.split("?")[1]);
    var id=urlParams.get("id");
    fetch(`http://localhost:4001/api/detail/${id}`,{method:"POST"})
    .then((res)=>res.json())
    .then((data)=>{
        let r="",d="";
        r=`
        <img src="${data.bg}" alt="">
    <div class="bg-body">
        <div class="movie-details">
            <div class="movie-poster">
                <img src="${data.poster}" alt="">
            </div>
            <div class="m-details">
                <h1>${data.name}</h1>
                <h2 class="star-box">
                <span>
                    ${data.rate}
                </span>
                <span class="material-symbols-outlined star">
                    star
                </span>
                </h2>
                <div class="rating">
                    <div class="rate">
                        <h4>Add Your Rating & Review</h4>
                    </div>
                    <div class="r-btn">
                        <button>Rate</button>
                    </div>
                </div>
                <div class="lang">
                    <h5>2D</h5>
                    <h5>${data.lang}</h5>
                </div>
                <div class="d-btn">
                    <a href="../index/index.html"><button onclick="deleteMovie('${id}')">Delete</button></a>
                    <a href="../update/update.html?id=${data._id}"><button>Update Movie</button></a>
                </div>
            </div>
        </div>
    </div>
        `;
    d=`<h4>Description</h4>
    <h5>${data.disc}</h5>`;
        document.getElementById("detail").innerHTML=r;
        document.getElementById("disc-out").innerHTML=d;
    })
    .catch((error)=>{console.log(error);})
}
detailsPage();

async function deleteMovie(id)
{
    fetch(`http://localhost:4001/api/delete/${id}`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
    }).then(()=>{
        alert("Deleted");
    }).catch((error)=>{
        console.log(error);
    })
}