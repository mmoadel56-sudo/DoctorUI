const KEY='doctor_demo_data';
const seed=[
 {id:1,name:'دکتر سارا احمدی',description:'متخصص قلب و عروق',phone_number:'09121234567',address:'تهران، خیابان ولیعصر',schedule:[
  {start:'09:00',end:'09:30',is_reserved:false},{start:'10:00',end:'10:30',is_reserved:true,reserved_by:'علی رضایی'},{start:'11:00',end:'11:30',is_reserved:false}]},
 {id:2,name:'دکتر محمد رضایی',description:'متخصص داخلی',phone_number:'09129876543',address:'تهران، میدان ونک',schedule:[
  {start:'14:00',end:'14:30',is_reserved:false},{start:'15:00',end:'15:30',is_reserved:false},{start:'16:00',end:'16:30',is_reserved:false}]},
 {id:3,name:'دکتر نازنین کریمی',description:'متخصص پوست و مو',phone_number:'09351234567',address:'تهران، سعادت‌آباد',schedule:[
  {start:'09:30',end:'10:00',is_reserved:true,reserved_by:'مریم'}, {start:'12:00',end:'12:30',is_reserved:false}]}
];
function data(){let x=localStorage.getItem(KEY);if(!x){localStorage.setItem(KEY,JSON.stringify(seed));return seed}return JSON.parse(x)}
function save(x){localStorage.setItem(KEY,JSON.stringify(x))}
function showToast(t){const e=document.getElementById('toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)}
function render(){
 const list=document.getElementById('doctorList'); if(!list)return;
 const q=(document.getElementById('search').value||'').toLowerCase();
 const filter=document.getElementById('sort').value;
 const doctors=data().filter(d=>(d.name+d.description+d.address).toLowerCase().includes(q));
 const filtered=doctors.filter(d=>filter==='available'?d.schedule.some(s=>!s.is_reserved):true);
 list.innerHTML=filtered.length?filtered.map(d=>`<article class="doctor-card">
  <div class="top"><div class="avatar">${d.name.slice(4,5)}</div><div><h3>${d.name}</h3><div class="muted">${d.description}</div></div></div>
  <p class="desc">${d.description}</p><div class="info"><span>☎ ${d.phone_number}</span><span>⌖ ${d.address}</span><span>◷ ${d.schedule.filter(s=>!s.is_reserved).length} نوبت آزاد</span></div>
  <button class="primary full" onclick="openReserve(${d.id})">مشاهده و رزرو نوبت</button></article>`).join(''):'<div class="empty">پزشکی پیدا نشد.</div>';
}
function openReserve(id){
 const d=data().find(x=>x.id===id);if(!d)return;
 document.getElementById('modalContent').innerHTML=`<span class="badge">رزرو نوبت</span><h2>${d.name}</h2><p class="muted">${d.description}</p><div class="info"><span>☎ ${d.phone_number}</span><span>⌖ ${d.address}</span></div><h3>زمان‌های موجود</h3><div class="slots">${d.schedule.map((s,i)=>`<button class="slot ${s.is_reserved?'reserved':''}" ${s.is_reserved?'disabled':''} onclick="reserve(${id},${i})">${s.start} - ${s.end}${s.is_reserved?' (رزرو شده)':''}</button>`).join('')}</div>`;
 document.getElementById('modal').classList.remove('hidden');
}
function reserve(id,i){
 const name=prompt('نام رزروکننده را وارد کنید:');if(!name||!name.trim())return;
 const all=data(),d=all.find(x=>x.id===id),s=d.schedule[i];if(s.is_reserved){showToast('این زمان قبلاً رزرو شده است');return}
 s.is_reserved=true;s.reserved_by=name.trim();save(all);closeModal();render();showToast('نوبت با موفقیت رزرو شد ✓');
}
function closeModal(){document.getElementById('modal').classList.add('hidden')}
document.addEventListener('DOMContentLoaded',()=>{document.getElementById('today').textContent=new Intl.DateTimeFormat('fa-IR',{weekday:'long',day:'numeric',month:'long'}).format(new Date());document.getElementById('search').addEventListener('input',render);document.getElementById('sort').addEventListener('change',render);render()});
