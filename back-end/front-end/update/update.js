
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

let url=window.location.href;
var search=new URLSearchParams(url.split("?")[1]);
var id=search.get("id");

fetch(`http://localhost:4001/api/detail/${id}`,{method: "POST"})
.then((res)=>res.json())
.then((data)=>{
    post=data.poster;
    banner=data.bg;
    document.getElementById("u-form").innerHTML=
    `
                            <div class="controls">
                                <div class="row">
                                    <div class="col-md-6 u-inp">
                                        <div class="form-group">
                                            <label for="Movie_name">Movie Name</label>
                                            <input  placeholder="Movie Name" id="name" value="${data.name}" class="r-inp" type="text">
                                        </div>
                                    </div>
                                    <div class="col-md-6 u-inp">
                                        <div class="form-group">
                                            <label for="Language">Language</label>
                                            <input  type="text" placeholder="Language" value="${data.lang}" id="lang" class="r-inp">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 u-inp">
                                        <div class="form-group">
                                            <label>Category</label>
                                            <input type="text" placeholder="Category" value="${data.cate}" id="cate" class="r-inp">
                                        </div>
                                    </div>
                                    <div class="col-md-6 u-inp">
                                        <div class="form-group">
                                            <label>Director</label>
                                            <input type="text" placeholder="Director" value="${data.dir}" id="dir" class="r-inp">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 u-inp">
                                        <div class="form-group">
                                            <label>Review</label>
                                            <input type="text" placeholder="Review" value="${data.rev}" id="rev" class="r-inp">
                                        </div>
                                    </div>
                                    <div class="col-md-4 u-inp">
                                        <div class="form-group">
                                            <label>Run Time</label>
                                            <input type="text" placeholder="Run Time" value="${data.time}" id="time" class="r-inp">
                                        </div>
                                    </div>
                                    <div class="col-md-4 u-inp">
                                        <div class="form-group">
                                            <label>Rating</label>
                                            <input type="text" placeholder="Rating"  value="${data.rate}" id="rate" class="r-inp">
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6 u-inp">
                                        <div class="form-group">
                                            <input type="file" class="r-pic" placeholder="Poster" id="poster">
                                            <div class="u-img">
                                                <img src="${post}" id="pic" alt="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 u-inp">
                                        <div class="form-group">
                                            <input type="file" class="r-pic" placeholder="Background" id="bg">
                                            <div class="u-img">
                                                <img src="${banner}" id="banner" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 u-inp">
                                        <div class="form-group">
                                            <label>Discription</label>
                                            <textarea placeholder="Type......." id="disc" class="disc-inp" cols="30" rows="10">${data.disc}</textarea>
                                        </div>
                                    </div>
                                    <div class="col-md-12 u-inp">
                                        <a href="../details/details.html?id=${data._id}"><button class="btn btn-success btn-send" id="asd"  pt-2 btn-block" >update</button></a></div>
                                </div>
                            </div>
    `;
    document.getElementById("poster").addEventListener("change",async(e)=>{
        post=document.getElementById("poster").files[0];
        post=await convertToBase64(post);
        document.getElementById("pic").src=post;
    });
    document.getElementById("bg").addEventListener("change",async(e)=>{
        banner=document.getElementById("bg").files[0];
        banner=await convertToBase64(banner);
        document.getElementById("banner").src=banner;
    });
    
document.getElementById("asd").addEventListener('click',async(e)=>{
    
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

    // console.log(name,lang,cate,dir,rev,time,disc,rate,poster,bg);
    fetch(`http://localhost:4001/api/update/${id}`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,lang,cate,dir,rev,time,disc,rate,poster,bg})
    }).then((res)=>{
        if(res.status==201){
        alert("Movie updated");
        window.location.href="../details/details.html";
    }else{
        alert("movie not updated");
    }
    }).catch((error)=>{
        console.log(error);
    })
    
})
})



function convertToBase64(file) {
    console.log("b64",file);
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