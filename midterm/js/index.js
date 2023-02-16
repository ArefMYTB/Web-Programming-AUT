const blog_url = document.querySelector('.detail');
const git_name = document.querySelector('.name');
const git_location = document.querySelector('.detail2');
const git_bio = document.querySelector('.bio-text');
const git_img = document.querySelector('.img');
const nameInput = document.querySelector('#userNameInput');
const error_message = document.querySelector('.error_access')
const errorDiv = document.querySelector(".error_handling");


function submit(){
    let username = nameInput.value;
    // check if the usernamge exists in local storage
    let obj = JSON.parse(window.localStorage.getItem(username.toLowerCase()));
    // console.log(obj);
    if(obj != null){
        console.log("Exist in local storage")
        showResult(obj)
    }else{
        fetch("https://api.github.com/users/" + String(username))
                .then(res => res.json())
                .then(data =>{
                    if(data.id !== undefined){
                        // show user info and save them in local storage
                        showResult(data)
                        const userData = {
                            name: data.name,
                            blog: data.blog,
                            location: data.location,
                            bio: data.bio,
                            avatar_url: data.avatar_url ////////////////////////
                        };
                        window.localStorage.setItem(username.toLowerCase(), JSON.stringify(userData));
                        
                    }else{ // error of user not found
                        git_img.hidden = false
                        git_img.src = "image/sample.png"
                        git_bio.innerHTML = ""
                        git_name.innerHTML = ""
                        git_location.innerHTML = ""
                        blog_url.innerHTML = ""
                        errorDiv.hidden = false;
                        error_message.innerHTML = "<span>" + "User Not Found" + "</span>";
                    }
                })
    }
}

// show user information
function showResult(data){
        errorDiv.hidden = true;
        git_name.innerHTML = "<span>" + data.name + "</span>";
        if(data.blog !== null){
            blog_url.innerHTML = "<span>" + data.blog + "</span>";
        }else{
            blog_url.innerHTML = ""
        }
        if(data.location !== null){
            git_location.innerHTML = "<span>" + data.location + "</span>"
            // errorDiv.hidden = true;
        }else{
            git_location.innerHTML = ""
            // errorDiv.hidden = false;
            // error_message.innerHTML = "<span>" + "User did not declared their location." + "</span>";
        }
        if(data.bio !== null){
            git_bio.innerHTML = data.bio
        }else{
            git_bio.innerHTML = ""
        }
        if(data.avatar_url !== null){
            git_img.hidden = false
            git_img.src = data.avatar_url;
        }else{
            git_img.hidden = false
            git_img.src = "image/sample.png"
            errorDiv.hidden = false;
            error_message.innerHTML = "<span>" + "User does not have any image profile." + "</span>";
        }
        // let value = JSON.stringify({name: data.name, blog: data.blog, location: data.location, img: data.avatar_url, bio: data.bio})
        // setCookie(username, value) 
            
}

function setCookie(name, value, daysToLive){
    const date = new Date();
    date.setTime(date.getTime() + (daysToLive*24*60*60*1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/;`;
}

function deleteCookie(name){
    setCookie(name, null, null)
}

function getCookie(n){

    let cookies = document.cookie.split(';')
    let isNew = true
    cookies.forEach((c)=>{
        // console.log(c)
        if(c.startsWith(n)){
            let subc = c.split(",")
            let blog_sub = subc[1] 
            console.log("blog: " + blog_sub.substring(8, blog_sub.length-1))
            let name_sub = subc[0]
            console.log("name: " + name_sub.substring(n.length+10, name_sub.length-1))
            let location_sub = subc[2]
            console.log("location: " + location_sub.substring(11, location_sub.length))
            // tehran , iran ×××
            console.log(subc)
            isNew = false
        }
    })
    return isNew


}

submit_button.addEventListener('click', submit);