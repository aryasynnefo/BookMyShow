
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
let post,banner;
document.getElementById("poster").addEventListener("change",async(e)=>{
    post=document.getElementById("poster").files[0];
    post=await convertToBase64(post);
});
document.getElementById("bg").addEventListener("change",async(e)=>{
    banner=document.getElementById("bg").files[0];
    banner=await convertToBase64(banner);
});

document.getElementById("asd").addEventListener('submit',async (e)=>{
    e.preventDefault();
    const name=document.getElementById("name").value;
    const lang=document.getElementById("lang").value;
    const cate=document.getElementById("cate").value;
    const dir=document.getElementById("dir").value;
    const rev=document.getElementById("rev").value;
    const time=document.getElementById("time").value;
    const disc=document.getElementById("disc").value;
    const rate=document.getElementById("rate").value;
    const poster=post;
    const bg=banner;
    console.log(name,lang,cate,dir,rev,time,disc,rate,poster,bg);
    fetch("http://localhost:4001/api/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,lang,cate,dir,rev,time,disc,rate,poster,bg})
    }).then((res)=>{
        if(res.status==201)
        {
            alert("movie added");
            window.location.href="../index/index.html"
        }
        else
        {
            alert("Movie not added");
        }
    })
    .catch((error)=>{
        alert(error);
    })
});


function convertToBase64(file) {
    // console.log("b64",file);
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}