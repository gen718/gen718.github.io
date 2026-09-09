
const data={
 internet:{title:"INTERNET / WAN",ip:"Public / ISP",copy:"外部ネットワークとの接続点。回線終端装置を経由してルーターへ接続します。",points:["ISP uplink","Public network","WAN interface"]},
 router:{title:"ROUTER / FIREWALL",ip:"Gateway: 10.10.10.1",copy:"インターネット接続の出入口。NAT、DHCP、基本的なファイアウォール機能を担当します。",points:["WAN / LAN routing","Firewall policy","DHCP scope"]},
 switch:{title:"MANAGED SWITCH",ip:"Management: 10.10.10.2",copy:"有線端末と各ネットワーク機器を集約。VLANを使い、用途ごとに通信を分離します。",points:["VLAN 10 / 20 / 30","802.1Q trunk","Port management"]},
 pc:{title:"OFFICE PC",ip:"VLAN 10 / DHCP",copy:"社員が利用する業務端末。社内ネットワークと必要な業務サーバーへアクセスします。",points:["Staff network","DHCP client","Endpoint security"]},
 server:{title:"BUSINESS SERVER",ip:"VLAN 20 / Static IP",copy:"社内データや業務サービスを配置する想定。端末ネットワークとは分離して保護します。",points:["Server segment","Static addressing","Restricted access"]},
 wifi:{title:"WI-FI ACCESS POINT",ip:"VLAN 10 / 30",copy:"社内用SSIDとゲスト用SSIDを提供。ゲスト通信は社内LANから分離します。",points:["Staff SSID","Guest SSID","Client isolation"]}
};
const detail=document.getElementById("nodeDetail");
document.querySelectorAll(".node").forEach(btn=>{
 btn.addEventListener("click",()=>{
   document.querySelectorAll(".node").forEach(n=>n.classList.remove("active"));
   btn.classList.add("active");
   const d=data[btn.dataset.node];
   detail.innerHTML=`<p>SELECTED DEVICE</p><h3>${d.title}</h3><span class="detail-ip">${d.ip}</span><p class="detail-copy">${d.copy}</p><ul>${d.points.map(x=>`<li>${x}</li>`).join("")}</ul>`;
 });
});
document.querySelector('[data-node="router"]').classList.add("active");
