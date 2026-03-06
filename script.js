let currentUser = "";

function login(){

let name = document.getElementById("name").value.trim();
let phone = document.getElementById("phone").value.trim();

if(name === "" || phone === ""){
alert("Please enter Name and Phone Number");
return;
}

currentUser = name;

document.getElementById("displayUser").innerText = name;

document.getElementById("loginPage").classList.add("hidden");
document.getElementById("dashboard").classList.remove("hidden");
}

function logout(){
location.reload();
}

function hideAll(){
document.getElementById("dashboard").classList.add("hidden");
document.getElementById("submitIdea").classList.add("hidden");
document.getElementById("ideasPage").classList.add("hidden");
document.getElementById("leaderboardPage").classList.add("hidden");
document.getElementById("categoryIdeas").classList.add("hidden");
}

function goBack(){
hideAll();
document.getElementById("dashboard").classList.remove("hidden");
}

function showSubmit(){
hideAll();
document.getElementById("submitIdea").classList.remove("hidden");
}

function showIdeas(){
hideAll();
document.getElementById("ideasPage").classList.remove("hidden");
loadIdeas();
}

function showLeaderboard(){
hideAll();
document.getElementById("leaderboardPage").classList.remove("hidden");
loadLeaderboard();
}

/* CATEGORY IDEAS */

function showCategoryIdeas(category){

hideAll();
document.getElementById("categoryIdeas").classList.remove("hidden");

let ideas = {
technology:[
"AI Resume Builder for Students",
"App to detect fake news automatically",
"Smart parking finder app",
"Automation tool for small businesses",
"AI chatbot for customer service",
"Code debugging AI assistant",
"Personal productivity tracking app",
"Voice controlled home automation",
"Cybersecurity awareness training platform",
"Remote team collaboration AI tool"
],

healthcare:[
"Online doctor consultation platform",
"Medicine reminder mobile app",
"Mental health chat support platform",
"Affordable fitness tracking app",
"AI disease prediction system",
"Hospital appointment booking system",
"Online physiotherapy guidance app",
"Health record digital storage",
"Emergency ambulance finder",
"Diet planning app with AI"
],

education:[
"AI study planner for students",
"Skill learning micro courses platform",
"Online doubt solving platform",
"Exam preparation tracking system",
"Virtual lab simulations",
"Student productivity tracker",
"Language learning chatbot",
"Online project collaboration platform",
"Internship finder platform",
"Career guidance AI assistant"
],

ecommerce:[
"Local grocery delivery app",
"Second-hand products marketplace",
"Student book exchange platform",
"Local farmer online market",
"Subscription based grocery delivery",
"Eco-friendly product marketplace",
"Hyperlocal delivery platform",
"Handmade crafts online store",
"Neighborhood shopping app",
"Small business online marketplace"
]
};

let list = "";

ideas[category].forEach(function(idea){
list += "<div class='idea-card'><p>"+idea+"</p></div>";
});

document.getElementById("categoryIdeaList").innerHTML = list;

}

/* IDEA SUBMISSION */

function submitIdea(){

let title = document.getElementById("ideaTitle").value.trim();
let desc = document.getElementById("ideaDescription").value.trim();

if(title=="" || desc==""){
alert("Fill all fields");
return;
}

let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

ideas.push({
title:title,
description:desc,
user:currentUser,
likes:0,
dislikes:0
});

localStorage.setItem("ideas", JSON.stringify(ideas));

alert("Idea Submitted Successfully");

goBack();
}

/* LOAD IDEAS */

function loadIdeas(){

let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

let list = "";

ideas.forEach((idea,index)=>{

list += "<div class='idea-card'>";
list += "<h3>"+idea.title+"</h3>";
list += "<p>"+idea.description+"</p>";
list += "<strong>By:</strong> "+idea.user+"<br>";
list += "<strong>Likes:</strong> "+idea.likes+" | ";
list += "<strong>Dislikes:</strong> "+idea.dislikes;

list += "<div class='vote-buttons'>";
list += "<button onclick='likeIdea("+index+")'>Like</button>";
list += "<button onclick='dislikeIdea("+index+")'>Dislike</button>";
list += "</div>";

list += "</div>";

});

document.getElementById("ideasList").innerHTML = list;

}

/* LIKE */

function likeIdea(index){

let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

ideas[index].likes += 1;

localStorage.setItem("ideas", JSON.stringify(ideas));

loadIdeas();

}

/* DISLIKE */

function dislikeIdea(index){

let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

ideas[index].dislikes += 1;

localStorage.setItem("ideas", JSON.stringify(ideas));

loadIdeas();

}

/* LEADERBOARD */

function loadLeaderboard(){

let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

ideas.sort((a,b)=> (b.likes - b.dislikes) - (a.likes - a.dislikes));

let list = "";

ideas.forEach((idea,index)=>{

let score = idea.likes - idea.dislikes;

let className = index==0 ? "idea-card top-idea" : "idea-card";

list += "<div class='"+className+"'>";

if(index==0){
list += "<h3>TOP IDEA</h3>";
}

list += "<h3>"+idea.title+"</h3>";
list += "<p>"+idea.description+"</p>";
list += "By: "+idea.user+"<br>";
list += "Score: "+score+" (Likes: "+idea.likes+" | Dislikes: "+idea.dislikes+")";

list += "</div>";

});

document.getElementById("leaderboardList").innerHTML = list;

}