//Variables
const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;


const get = (param) => document.getElementById(`${param}`);
const url = "https://api.github.com/users/";
const noresults = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const Name = get("name");
const userName = get("user-name");
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;



btnsubmit.addEventListener('click', function (){
    if(input.value !=="")

    fetchUserData(url + input.value);
});


input.addEventListener("input", function () {
  noresults.style.display = "none";
});

noresults.style.display="block";

input.addEventListener("keydown" ,function(e){
    if(e.key=="Enter"){
        if(input.value !== ""){
            fetchUserData(url + input.value);
        }
    }
},
false //  'useCapture' ko true set kiya jaye, to event capturing phase mein event listener kaam karega. 
      // Yadi false set kiya jaye, toh event bubbling phase mein kaam karega. Most cases mein,
      // hum event bubbling ka use karte hain, isliye 'false' diya jata hai.
)




// API Call
function fetchUserData(gitUrl) { // giturl comes from line no.48
  fetch(gitUrl)
    .then((response) => response.json())
    .then((data) => {
      
        RenderUserInfo(data);
    })
    .catch((error) => {
      throw error;
    });
}


function RenderUserInfo(UserInfo){
      if (UserInfo.message !== "Not Found") {
     noresults.style.display = "none";

     function checkNull(param1, param2) {
        if (param1 === "" || param1 === null) {
          param2.style.opacity = 0.5;
          param2.previousElementSibling.style.opacity = 0.5;
          return false;
        } else {
          return true;
        }
      }
    

    
        avatar.src = `${UserInfo.avatar_url}`;
        Name.innerText = UserInfo.name === null ? UserInfo.login : UserInfo.name;
        userName.innerText = `@${UserInfo.login}`;
        userName.href = `${UserInfo.html_url}`;
        datesegments = UserInfo.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
        bio.innerText = UserInfo.bio == null ? "This profile has no bio" : `${UserInfo.bio}`;
        repos.innerText = `${UserInfo.public_repos}`;
        followers.innerText = `${UserInfo.followers}`;
        following.innerText = `${UserInfo.following}`;
        user_location.innerText = checkNull(UserInfo.location, user_location) ? UserInfo.location : "Not Available";
        page.innerText = checkNull(UserInfo.blog, page) ? UserInfo.blog : "Not Available";
        page.href = checkNull(UserInfo.blog, page) ? UserInfo.blog : "#";
        twitter.innerText = checkNull(UserInfo.twitter_username, twitter) ? UserInfo.twitter_username : "Not Available";
        twitter.href = checkNull(UserInfo.twitter_username, twitter) ? `https://twitter.com/${UserInfo.twitter_username}` : "#";
        company.innerText = checkNull(UserInfo.company, company) ? UserInfo.company : "Not Available";
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");
      }
        else {
           
               noresults.style.display = "block";
    
              setTimeout( () => {
              noresults.style.display = "none";


             },1000);

               }
}

fetchUserData();



btnmode.addEventListener("click", function () {
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});
//dark mode default
const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

if (localStorage.getItem("dark-mode")) {
  darkMode = localStorage.getItem("dark-mode");
  darkModeProperties();
} else {
  localStorage.setItem("dark-mode", prefersDarkMode);
  darkMode = prefersDarkMode;
  lightModeProperties();
}


function darkModeProperties() {
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
  localStorage.setItem("dark-mode", true);
}
function lightModeProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  localStorage.setItem("dark-mode", false);
}

fetchUserData(url + "rizwan0713");