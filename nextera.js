
const defaults=[
{id:1,title:"営業資料のUI改善",owner:"三浦",due:"2026-09-12",status:"progress"},
{id:2,title:"顧客一覧の項目整理",owner:"佐藤",due:"2026-09-14",status:"todo"},
{id:3,title:"月次レポート画面の確認",owner:"高橋",due:"2026-09-10",status:"done"},
{id:4,title:"通知設定の仕様確認",owner:"三浦",due:"2026-09-16",status:"progress"},
{id:5,title:"操作マニュアル初稿",owner:"鈴木",due:"2026-09-18",status:"todo"}];
let tasks=JSON.parse(localStorage.getItem("nexteraV19"))||structuredClone(defaults),filter="all";
let acts=[{text:"Workspace is ready ✦",time:"Now"}];
const esc=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const label=s=>s==="todo"?"TO DO":s==="progress"?"DOING":"DONE";
function log(x){acts.unshift({text:x,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})});acts=acts.slice(0,5)}
function render(){
 const list=filter==="all"?tasks:tasks.filter(t=>t.status===filter);
 document.getElementById("taskList").innerHTML=list.length?list.map(t=>`<div class="task ${t.status}"><div class="check">${t.status==="done"?"✓":""}</div><div class="task-title"><b>${esc(t.title)}</b><small>#NX-${String(t.id).padStart(3,"0")}</small></div><div class="owner">${esc(t.owner)}</div><div class="due">${t.due}</div><div><span class="pill ${t.status}">${label(t.status)}</span></div><select class="status-select" data-id="${t.id}"><option value="todo" ${t.status==="todo"?"selected":""}>To do</option><option value="progress" ${t.status==="progress"?"selected":""}>Doing</option><option value="done" ${t.status==="done"?"selected":""}>Done</option></select></div>`).join(""):`<div class="empty">Nothing here yet.</div>`;
 document.querySelectorAll(".status-select").forEach(x=>x.onchange=e=>{let t=tasks.find(t=>t.id==e.target.dataset.id);t.status=e.target.value;log(`${t.title} → ${label(t.status)}`);render()});
 let total=tasks.length,prog=tasks.filter(t=>t.status==="progress").length,done=tasks.filter(t=>t.status==="done").length,rate=total?Math.round(done/total*100):0;
 totalCount.textContent=total;progressCount.textContent=prog;doneCount.textContent=done;completionRate.textContent=rate+"%";progressBar.style.width=rate+"%";score.textContent=String(Math.min(100,40+rate)).padStart(2,"0");
 activityList.innerHTML=acts.map(a=>`<li>${esc(a.text)}<time>${a.time}</time></li>`).join("");localStorage.setItem("nexteraV19",JSON.stringify(tasks))
}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");filter=b.dataset.filter;render()});
const modal=document.getElementById("taskModal");openModalBtn.onclick=()=>modal.classList.add("open");closeModalBtn.onclick=()=>modal.classList.remove("open");modal.onclick=e=>{if(e.target===modal)modal.classList.remove("open")};
taskForm.onsubmit=e=>{e.preventDefault();let id=tasks.length?Math.max(...tasks.map(x=>x.id))+1:1;tasks.push({id,title:taskTitle.value.trim(),owner:taskOwner.value.trim(),due:taskDue.value,status:taskStatus.value});log(`Added: ${taskTitle.value.trim()}`);e.target.reset();modal.classList.remove("open");render()};
resetBtn.onclick=()=>{tasks=structuredClone(defaults);acts=[{text:"Demo reset ✦",time:"Now"}];render()};render();
