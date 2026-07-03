// Ledger hero animation
  const rows = [
    {desc:"Studio rent — Sept", tag:"Facilities", amt:"-2,400.00", cls:"neg"},
    {desc:"Client invoice #0412", tag:"Revenue", amt:"+6,800.00", cls:"pos"},
    {desc:"Adobe subscription", tag:"Software", amt:"-52.99", cls:"neg"},
    {desc:"Client invoice #0413", tag:"Revenue", amt:"+3,200.00", cls:"pos"},
    {desc:"Freelance designer", tag:"Contractors", amt:"-1,100.00", cls:"neg"},
  ];
  const rowsEl = document.getElementById('ledgerRows');
  const balEl = document.getElementById('balanceAmt');
  let running = 0;

  function playLedger(){
    rowsEl.innerHTML = "";
    running = 0;
    balEl.textContent = "$0.00";
    document.getElementById('stamp').style.animation = 'none';
    void document.getElementById('stamp').offsetWidth;
    document.getElementById('stamp').style.animation = null;

    rows.forEach((r, i) => {
      const el = document.createElement('div');
      el.className = 'lrow';
      el.style.animationDelay = (i * 0.42) + 's';
      el.innerHTML = `<span class="desc">${r.desc}</span><span class="tag">${r.tag}</span><span class="amt ${r.cls}">${r.amt}</span>`;
      rowsEl.appendChild(el);

      const value = parseFloat(r.amt.replace('+','').replace(',',''));
      setTimeout(() => {
        running += value;
        balEl.textContent = (running < 0 ? "-$" : "$") + Math.abs(running).toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2});
      }, i * 420 + 350);
    });
  }
  playLedger();
  setInterval(playLedger, 8000);

  // Scroll reveal
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); } });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));