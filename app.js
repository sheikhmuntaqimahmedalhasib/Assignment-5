const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

const tabs = document.querySelectorAll(".tabs button")

function setActiveTab(btn){

tabs.forEach(tab=>{
tab.classList.remove("active")
})

btn.classList.add("active")

}


async function loadIssues(btn){

setActiveTab(btn)

const res = await fetch(API)
const data = await res.json()

displayIssues(data.data)

}

loadIssues(tabs[0])



function displayIssues(issues){

const container = document.getElementById("issues-container")
const count = document.getElementById("issueCount")

container.innerHTML = ""

count.innerText = issues.length + " Issues"

issues.forEach(issue => {

const div = document.createElement("div")

div.classList.add("card")
div.classList.add(issue.status)

let icon = ""

if(issue.status === "open"){
icon = "assets/Open-Status.png"
}else{
icon = "assets/Closed-Status.png"
}

div.innerHTML = `

<div class="card-top">

<img src="${icon}" width="20">

<span class="priority ${issue.priority.toLowerCase()}">
${issue.priority}
</span>

</div>

<h4>${issue.title}</h4>

<p class="desc">${issue.description}</p>

<div class="labels">

<span class="bug">BUG</span>
<span class="help">HELP WANTED</span>

</div>

<div class="card-footer">

<p>#1 by ${issue.author}</p>

<p>${issue.createdAt}</p>

</div>

`

container.appendChild(div)

})

}



async function filterIssues(status,btn){

setActiveTab(btn)

const res = await fetch(API)
const data = await res.json()

const filtered = data.data.filter(issue => issue.status === status)

displayIssues(filtered)

}



async function searchIssue(){

const text = document.getElementById("searchText").value

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

const data = await res.json()

displayIssues(data.data)

}