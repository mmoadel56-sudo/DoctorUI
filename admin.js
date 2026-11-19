const KEY='doctor_demo_data';
function data(){return JSON.parse(localStorage.getItem(KEY)||'[]')}
function save(x){localStorage.setItem(KEY,JSON.stringify(x))}
function toast(t){const e=document.getElementById('toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)}
function initials(n){return n?.slice(0,1)||'؟'}
function render(){
 const all=data(),q=(document.getElementById('adminSearch').value||'').toLowerCase();
 const rows=all.filter(d=>(d.name+d.description+d.address).toLowerCase().includes(q));
 document.getElementById('doctorCount').textContent=all.length;
 document.getElementById('reservedCount').textContent=all.reduce((a,d)=>a+d.schedule.filter(s=>s.is_reserved).length,0);
 document.getElementById('freeCount').textContent=all.reduce((a,d)=>a+d.schedule.filter(s=>!s.is_reserved).length,0);
 document.getElementById('adminTable').innerHTML=rows.map(d=>`<tr><td><b>${d.name}</b></td><td>${d.description||'—'}</td><td>${d.phone_number||'—'}</td><td>${d.address}</td><td><span class="status ${d.schedule.some(s=>!s.is_reserved)?'ok':'busy'}">${d.schedule.some(s=>!s.is_reserved)?'نوبت آزاد':'تکمیل'}</span></td><td><div class="actions"><button class="secondary" onclick="editDoctor(${d.id})">ویرایش</button><button class="danger" onclick="deleteDoctor(${d.id})">حذف</button></div></td></tr>`).join('')||'<tr><td colspan="6" class="empty">پزشکی ثبت نشده است.</td></tr>';
}
function openCreate(){document.getElementById('doctorForm').reset();document.getElementById('doctorId').value='';document.getElementById('formTitle').textContent='افزودن پزشک';document.getElementById('doctorModal').classList.remove('hidden')}
function closeDoctorModal(){document.getElementById('doctorModal').classList.add('hidden')}
function editDoctor(id){
 const d=data().find(x=>x.id===id);if(!d)return;
 document.getElementById('doctorId').value=id;document.getElementById('name').value=d.name;document.getElementById('description').value=d.description;document.getElementById('phone').value=d.phone_number;document.getElementById('address').value=d.address;document.getElementById('schedule').value=d.schedule.map(s=>`${s.start}-${s.end}`).join(', ');document.getElementById('formTitle').textContent='ویرایش پزشک';document.getElementById('doctorModal').classList.remove('hidden');
}
function deleteDoctor(id){if(!confirm('این پزشک حذف شود؟'))return;save(data().filter(d=>d.id!==id));render();toast('پزشک حذف شد')}
document.getElementById('doctorForm').addEventListener('submit',e=>{
 e.preventDefault();const all=data(),id=Number(document.getElementById('doctorId').value),old=all.find(d=>d.id===id);
 const slots=document.getElementById('schedule').value.split(',').map(x=>x.trim()).filter(Boolean).map(x=>{const [start,end]=x.split('-').map(v=>v.trim());return {start,end,is_reserved:false}});
 const d={id:id||Date.now(),name:document.getElementById('name').value.trim(),description:document.getElementById('description').value.trim(),phone_number:document.getElementById('phone').value.trim(),address:document.getElementById('address').value.trim(),schedule:slots.length?slots:(old?.schedule||[])};
 if(id){const i=all.findIndex(x=>x.id===id);all[i]=d}else all.push(d);save(all);closeDoctorModal();render();toast('اطلاعات ذخیره شد ✓');
});
document.getElementById('adminSearch').addEventListener('input',render);render();
