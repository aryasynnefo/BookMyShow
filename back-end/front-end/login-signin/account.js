
function signUp() {
    let element = document.getElementById("container_SignIn");
    element.classList.add("myStyle");
}

function signIn() {
    let element = document.getElementById("container_SignIn");
    element.classList.remove("myStyle");
}



document.getElementById("s-btn").addEventListener("click",()=>{
    const User_ID=document.getElementById("user-name").value;
    const Pwd=document.getElementById("password").value;
    console.log(User_ID,Pwd);
    fetch("http://localhost:4001/api/adduser/",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({User_ID,Pwd})
    }).then((res)=>{
        if(res.status==201)
        {
            alert("successfully registered");
            signIn();
        }else
        {
            alert("not registered");
        }
    }).catch((error)=>{
        alert("server side error")
    })
})




document.getElementById("l-btn").addEventListener("click",()=>{
    const User_ID=document.getElementById("username").value;
    const Pwd=document.getElementById("pwd").value;
        console.log(User_ID,Pwd);
        fetch("http://localhost:4001/api/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({User_ID,Pwd})
        }).then(async(res)=>{
            const data=await res.json();
            //token
            console.log(data.token);
            const token=data.token;
            localStorage.setItem("token",JSON.stringify(token))
            if(res.status==200)
            {
                window.location.href="../index.html";
                alert("successfully registered");
            }else if(res.status==404)
            {
                if(User_ID=="" || Pwd==""){
                    alert("fields are embty")
                }else
                alert("user name or password error");
            }
        }).catch((error)=>{
            alert("server side error")
        })
    })