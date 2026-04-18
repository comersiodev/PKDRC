<script>

let score=0
let current=0
let sub=0
let state="dialog"

const chat=document.getElementById("chat")
const choices=document.getElementById("choices")
const nextBtn=document.getElementById("nextBtn")
const nameEl=document.getElementById("name")

const kaiImg=document.getElementById("kaiImg")
const dashaImg=document.getElementById("dashaImg")

function applyScore(type){
if(type==="good") score+=10
else if(type==="mid") score+=5
else if(type==="bad") score-=score*0.3
else if(type==="ghost") score+=3

score=Math.max(0,Math.min(100,score))
}

const scenes = [/* JSON LU YANG KEMARIN */]

function setImg(s){
if(s.kai) kaiImg.src=s.kai
if(s.dasha) dashaImg.src=s.dasha
}

function load(){
let s=scenes[current]
if(!s) return

nameEl.innerText=s.name
setImg(s)
choices.innerHTML=""

//  DIALOG
if(state==="dialog"){
chat.innerText=s.dialog[sub]

//  STOP DISINI  LANGSUNG PINDAH STATE
if(sub===s.dialog.length-1){
if(s.choices){
state="choice"
load() //  LANGSUNG RENDER PILIHAN TANPA NEXT
return
}
}
}

//  CHOICE
if(state==="choice"){
chat.innerText=s.dialog[s.dialog.length-1]

s.choices.forEach(c=>{
let b=document.createElement("button")
b.innerText=c.text

b.onclick=()=>{
applyScore(c.type)
chat.innerText=c.reply

if(c.dasha) dashaImg.src=c.dasha

state="reply"
choices.innerHTML=""
nextBtn.style.display="block"
}

choices.appendChild(b)
})

nextBtn.style.display="none"
}

//  REPLY
if(state==="reply"){
nextBtn.style.display="block"
}
}

nextBtn.onclick=()=>{

let s=scenes[current]

if(state==="dialog"){
sub++
}

else if(state==="reply"){
current++
sub=0
state="dialog"
}

if(current>=scenes.length){
end()
return
}

load()
}

function end(){
let status=""
if(score<=30) status="TERLALU GOOD BOY LU "
else if(score<=70) status="FAKBOY ROOKIE "
else status="FAKBOY MASTERCLASS "

document.body.innerHTML=`
<div style="text-align:center;color:white;margin-top:50px;">
<h2>Skor: ${Math.round(score)}</h2>
<h2>Status: ${status}</h2>
</div>
`
}

load()

</script>