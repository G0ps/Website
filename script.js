import {GoogleGenerativeAI} from "https://esm.run/@google/generative-ai";
let save_api_btn = document.getElementById("save-api-key");
save_api_btn.addEventListener("click" , ()=>{
    saveapikey();
});
function saveapikey()
{
    let key = document.getElementById("api-key").value;
    localStorage.setItem("key1" , key);
    alert("done");
    console.log(localStorage.getItem("key1"));
}
let outlet = document.getElementById("summary");
//api key is working fine
const try_button = document.getElementById("try-now");
try_button.addEventListener("click" , ()=>{
    document.getElementById("text-input").scrollIntoView({behavior : "smooth"});
});
//
async function outputcall(prompt , btn)
{
    let prompts = [
        `Give me a 'short summary' from '${prompt}'`,
        `Give me a 'point by point notation' from without bold notation '${prompt}'`,
        `Give me a 'detailed summary' from '${prompt}'`
    ];
    const key = localStorage.getItem("key1");
    const genAI = new GoogleGenerativeAI(`${key}`);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompts[btn]);
    outlet.innerText = result.response.text();
}
let short_btn = document.getElementById("short-btn");
let point_by_point_btn = document.getElementById("point-by-point-btn");
let detailed_btn = document.getElementById("detailed-btn");

short_btn.addEventListener("click" , ()=>{
    outputcall(document.getElementById("paragraph-to-summarise").value , 0);
});
point_by_point_btn.addEventListener("click" , ()=>{
    outputcall(document.getElementById("paragraph-to-summarise").value, 1);
});
detailed_btn.addEventListener("click" , ()=>{
    outputcall(document.getElementById("paragraph-to-summarise").value , 2);
});